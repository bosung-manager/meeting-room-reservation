import { MeetingRoom } from "@/types";
import { IRoomRepository } from "../interfaces";
import { client } from "../../sanity/client";

export class SanityRoomRepository implements IRoomRepository {
  // Helper to parse Sanity doc to MeetingRoom
  private mapDocumentToRoom(doc: any): MeetingRoom {
    return {
      id: doc?._id || "",
      name: doc?.name || "Unnamed Room",
      active: doc?.active ?? true,
      image: doc?.imageUrl || null, 
    };
  }

  async getAll(): Promise<MeetingRoom[]> {
    try {
      // image field가 asset reference일 경우 URL을 가져오기 위한 쿼리
      const query = `*[_type == "meetingRoom" && active == true] | order(_createdAt desc) {
        _id,
        name,
        active,
        "imageUrl": image.asset->url,
        _createdAt,
        _updatedAt
      }`;
      const docs = await client.fetch(query);
      
      if (!Array.isArray(docs)) {
        console.error("Sanity fetch returned non-array:", docs);
        return [];
      }
      
      return docs.map(this.mapDocumentToRoom);
    } catch (error) {
      console.error("Failed to fetch rooms from Sanity:", error);
      // Return empty array instead of crashing to allow page load
      return [];
    }
  }

  async getById(id: string): Promise<MeetingRoom | null> {
    try {
      const query = `*[_type == "meetingRoom" && _id == $id][0] {
        _id,
        name,
        active,
        "imageUrl": image.asset->url,
        _createdAt,
        _updatedAt
      }`;
      const doc = await client.fetch(query, { id });
      return doc ? this.mapDocumentToRoom(doc) : null;
    } catch (error) {
      console.error(`Failed to fetch room ${id}:`, error);
      return null;
    }
  }

  async create(room: Omit<MeetingRoom, "id">): Promise<MeetingRoom> {
    let imageAssetId = null;

    // 만약 이미지가 Base64 포맷이라면 Sanity Asset으로 업로드 시도
    if (room.image && room.image.startsWith("data:image")) {
      try {
        // Base64 to Buffer/Blob logic needs fetch or buffer
        // Browser env vs Node env check might be needed, but this runs on server actions/API routes (Node)
        const base64Data = room.image.split(",")[1];
        const buffer = Buffer.from(base64Data, "base64");
        
        const asset = await client.assets.upload("image", buffer, {
          filename: `room-${Date.now()}`,
        });
        imageAssetId = asset._id;
      } catch (e) {
        console.error("Failed to upload image to Sanity:", e);
        // 실패 시 이미지는 무시하거나 에러 처리
      }
    }

    const doc = {
      _type: "meetingRoom",
      name: room.name,
      active: true,
      image: imageAssetId ? { _type: "image", asset: { _type: "reference", _ref: imageAssetId } } : undefined,
    };

    const created = await client.create(doc);
    
    // Return complete object (need to re-fetch or construct)
    // Constructing for speed
    return {
      id: created._id,
      name: room.name,
      active: true,
      image: room.image, // Return original input for immediate UI feedback, though actual stored is asset
    };
  }

  async delete(id: string): Promise<boolean> {
    // Soft delete by setting active = false, or Hard delete?
    // Interface implies "delete", but existing logic used soft delete (active=false).
    // Let's stick to Soft Delete for safety, or Hard Delete if Sanity prefers.
    // Given the 'active' field exists, I'll update it to false.
    try {
      await client.patch(id).set({ active: false }).commit();
      return true;
    } catch (e) {
      console.error("Delete failed", e);
      return false;
    }
  }
}

import { defineField, defineType } from "sanity";

const meetingRoom = defineType({
  name: "meetingRoom",
  title: "Meeting Room",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});

const reservation = defineType({
  name: "reservation",
  title: "Reservation",
  type: "document",
  fields: [
    defineField({
      name: "roomId",
      title: "Room ID",
      type: "string",
    }),
    defineField({
      name: "startTime",
      title: "Start Time",
      type: "datetime",
    }),
    defineField({
      name: "endTime",
      title: "End Time",
      type: "datetime",
    }),
    defineField({
      name: "userName",
      title: "User Name",
      type: "string",
    }),
    defineField({
      name: "userPhone",
      title: "User Phone",
      type: "string",
    }),
    defineField({
      name: "agenda",
      title: "Agenda",
      type: "string",
    }),
    defineField({
      name: "attendees",
      title: "Attendees",
      type: "string",
    }),
    defineField({
      name: "groupId",
      title: "Group ID",
      type: "string",
    }),
  ],
});

export const schemaTypes = [meetingRoom, reservation];

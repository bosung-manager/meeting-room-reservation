import { createClient } from "next-sanity";

// Hardcoded for build stability
export const projectId = "18wsqsix";
export const dataset = "production";
export const apiVersion = "2024-01-29";
export const token = process.env.SANITY_API_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // 실시간 데이터가 중요하므로 CDN 사용 안 함
  token, // 쓰기 작업을 위해 토큰 필요
});

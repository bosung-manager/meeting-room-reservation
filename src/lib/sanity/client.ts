import { createClient } from "next-sanity";

// Hardcoded for build stability
export const projectId = "18wsqsix";
export const dataset = "production";
export const apiVersion = "2024-01-29";
// Hardcoding token to ensure no environment variable issues
export const token = "skIUpJLAwU75f1OK8pZCDCXE4CJgl6qPKzgrQ4qh8VgbUS8MjjzQ6QH4ytt2y1F944ljbv6MFtKbnTgjbv9EKjkCWnqZnw2dINMtRSBQuxrLnra78CxioACLJsfEFXLTlY9tbQlbteCGuITA3NaaKbSCVlpZO8w7lYVurelXFF6IXl0fy8K3Go";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // 실시간 데이터가 중요하므로 CDN 사용 안 함
  token, // 쓰기 작업을 위해 토큰 필요
});

import { createClient } from "next-sanity";

// Hardcoded for build stability
export const projectId = "18wsqsix";
export const dataset = "production";
export const apiVersion = "2024-01-29";
// Hardcoding token to ensure no environment variable issues
export const token = "sksFCzrM9L4jDccAiM6sMI7liHFj87VP4k1D0qMpu6QHJQi64dWdFfJGsZvKsn6jtVKzZLHeUq6VdQUfVFLbdgQmiFZN5cbObmf0gORuTMdTIGH7g3vbdampjhE5UzAPjtKDOeSqThDqBqByO4xYkvr0qv0gxQx8l1AZYLQd4Lm7Hprpbxtr";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // 실시간 데이터가 중요하므로 CDN 사용 안 함
  token, // 쓰기 작업을 위해 토큰 필요
});

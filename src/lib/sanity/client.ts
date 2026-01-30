import { createClient } from "next-sanity";

// Hardcoded for build stability
export const projectId = "18wsqsix";
export const dataset = "production";
export const apiVersion = "2024-01-29";
// Hardcoding token to ensure no environment variable issues
export const token = "skyghp77sayYCnQYz5lo2KSg6OWT9rZmgp6zbnM6DQpQrEcU6qxKcvLz9mmn5ydlB0Eej5w8oPIL3tZuwIOchXrS4Wuugnqa45A7RjkBw7aFl0DsgHf25pDVMrpvj0EJGPUXSj1kT3EvQE3gIWDkHrsAojx8Td98KE5jVS0N5q1b3CUaAWCl";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // 실시간 데이터가 중요하므로 CDN 사용 안 함
  token, // 쓰기 작업을 위해 토큰 필요
});

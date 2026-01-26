import { NextResponse } from "next/server";

export function withErrorHandling(handler: Function) {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error: any) {
      console.error("API Error:", error);
      return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: error.status || 500 }
      );
    }
  };
}

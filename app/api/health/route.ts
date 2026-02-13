import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'DAKIA Wiki Bot API is running',
    timestamp: new Date().toISOString(),
  });
}

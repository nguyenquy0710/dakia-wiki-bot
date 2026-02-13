import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Implement database query
  return NextResponse.json({
    success: true,
    data: [],
    message: 'Articles API endpoint',
  });
}

export async function POST() {
  // TODO: Implement create article
  return NextResponse.json({
    success: true,
    message: 'Article created',
  });
}

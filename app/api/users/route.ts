import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Implement database query
  return NextResponse.json({
    success: true,
    data: [],
    message: 'Users API endpoint',
  });
}

export async function POST() {
  // TODO: Implement create user
  return NextResponse.json({
    success: true,
    message: 'User created',
  });
}

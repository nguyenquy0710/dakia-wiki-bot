import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Implement database query
  return NextResponse.json({
    success: true,
    data: [],
    message: 'Categories API endpoint',
  });
}

export async function POST() {
  // TODO: Implement create category
  return NextResponse.json({
    success: true,
    message: 'Category created',
  });
}

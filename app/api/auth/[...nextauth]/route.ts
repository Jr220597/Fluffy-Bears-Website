import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Auth not configured' }, { status: 404 });
}

export async function POST() {
  return NextResponse.json({ message: 'Auth not configured' }, { status: 404 });
}
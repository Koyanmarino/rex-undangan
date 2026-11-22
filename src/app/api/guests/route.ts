import { NextResponse } from 'next/server';
import { DEFAULT_INVITATION } from '@/data/initialInvitation';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: DEFAULT_INVITATION.guests,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Guest / RSVP successfully processed',
      data: body,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}

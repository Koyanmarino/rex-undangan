import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { plan, amount, invitationSlug } = await request.json();

    const orderId = `ORDER-${invitationSlug}-${Date.now()}`;
    
    // In production with real Midtrans credentials:
    // const snap = new midtransClient.Snap({
    //   isProduction: false,
    //   serverKey: process.env.MIDTRANS_SERVER_KEY,
    //   clientKey: process.env.MIDTRANS_CLIENT_KEY
    // });
    // const transaction = await snap.createTransaction({ ... });

    return NextResponse.json({
      success: true,
      orderId,
      grossAmount: amount,
      snapToken: `SNAP-TOKEN-SIMULATED-${orderId}`,
      redirectUrl: `https://app.sandbox.midtrans.com/snap/v2/vtweb/simulated`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

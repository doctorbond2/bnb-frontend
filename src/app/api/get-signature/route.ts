import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST() {
  try {
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Cloudinary API credentials are missing' },
        { status: 500 }
      );
    }
    console.log('test');
    const signature = crypto
      .createHash('sha1')
      .update(`timestamp=${timestamp}${apiSecret}`)
      .digest('hex');

    return NextResponse.json({
      signature,
      timestamp,
      apiKey,
    });
  } catch (err) {
    console.error('Error getting signature:', err);
    return NextResponse.json(
      { error: 'Failed to get signature' },
      { status: 500 }
    );
  }
}

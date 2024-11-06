import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { publicIds } = body;

  if (!Array.isArray(publicIds) || publicIds.length === 0) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  try {
    const results = await Promise.all(
      publicIds.map(async (id: string) => {
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload/${id}`;

        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            Authorization:
              'Basic ' +
              Buffer.from(`${apiKey}:${apiSecret}`).toString('base64'),
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to delete image with ID ${id}`);
        }

        return await response.json();
      })
    );

    return NextResponse.json({
      message: 'Images deleted successfully',
      results,
    });
  } catch (error) {
    console.error('Error deleting images:', error);
    return NextResponse.json(
      { error: 'Failed to delete images' },
      { status: 500 }
    );
  }
}

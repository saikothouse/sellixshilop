import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { cart } = await req.json();

  try {
    const response = await axios.post('https://dev.sellix.io/orders', {
      products: cart.map((product: any) => ({
        id: product.id,
        quantity: 1, // Assuming 1 for simplicity, adjust as needed
      })),
    }, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SELLIX_API_KEY}`,
      },
    });

    return NextResponse.json({ url: response.data.data.url });
  } catch (error) {
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 });
  }
}

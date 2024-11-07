import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface Product {
  id: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const { cart }: { cart: Product[] } = await req.json();

  try {
    const response = await axios.post('https://dev.sellix.io/orders', {
      products: cart.map((product: Product) => ({
        id: product.id,
        quantity: product.quantity, // Assuming 1 for simplicity, adjust as needed
      })),
    }, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SELLIX_API_KEY}`,
      },
    });

    return NextResponse.json({ url: response.data.data.url });
  } catch (error) {
    console.error('Error placing order:', error);
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 });
  }
}

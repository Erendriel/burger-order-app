import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const response = await fetch('https://burgerhub00.github.io/data/products.json');
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        const products = data.products;

        return new NextResponse(
            JSON.stringify(products),
            { status: 200 }
        );

    } catch (err) {
        console.error(err);
        return new NextResponse(
            JSON.stringify({ message: 'Something went wrong' }),
            { status: 500 }
        );
    }
};

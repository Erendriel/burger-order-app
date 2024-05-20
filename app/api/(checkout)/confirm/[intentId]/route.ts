import { prisma } from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server";

export const PUT = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const intentId = searchParams.get("intentId");

  if (!intentId) {
    return new NextResponse(
      JSON.stringify({ message: "Intent ID is required" }),
      { status: 400 }
    );
  }

  try {
    await prisma.order.update({
      where: {
        intent_id: intentId,
      },
      data: { status: "Being prepared!" },
    });
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

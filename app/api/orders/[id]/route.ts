import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/utils/sendEmail";

// CHANGE THE STATUS OF AN ORDER
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const body = await req.json();
    const updatedOrder = await prisma.order.update({
      where: { id: id },
      data: { status: body },
      include: { user: true }, // Incluir el usuario en la consulta
    });

    if (!updatedOrder.user) {
      throw new Error("User not found");
    }

    // Personalizar el cuerpo del mensaje
    const emailText = `Your order status has been updated to: ${body}`;
    const emailHtml = `
      <h1>Order Status Updated</h1>
      <p>Dear ${updatedOrder.user.name ?? 'Customer'},</p>
      <p>Your order with ID <strong>${updatedOrder.id}</strong> has been updated to: <strong>${body}</strong>.</p>
      <p>Thank you for shopping with us!</p>
      <p>Best regards,</p>
      <p>Your Company</p>
    `;

    // Enviar el correo electrónico
    await sendEmail(
      updatedOrder.user.email ?? '', // Usar una cadena vacía si el email es null
      "Order Status Updated",
      emailText,
      emailHtml
    );

    return new NextResponse(
      JSON.stringify({ message: "Order has been updated!" }),
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

import { prisma } from '@/lib/prisma';
import { transporter } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const contact =
      await prisma.contact.create({
        data: {
          name: body.name,
          age: body.age,
          phone: body.phone,
          message: body.message,
        },
      });

    await transporter.sendMail({
      from: process.env.MAIL_USER,

      to: process.env.ADMIN_EMAIL,

      subject:
        'Khách hàng mới đăng ký',

      html: `
        <h2>Thông tin khách hàng</h2>

        <p><b>Họ tên:</b> ${body.name}</p>

        <p><b>Tuổi:</b> ${body.age}</p>

        <p><b>SĐT:</b> ${body.phone}</p>

        <p><b>Nội dung:</b></p>

        <p>${body.message}</p>
      `,
    });

    return Response.json(contact);
  } catch (err) {
    console.error(err);

    return Response.json(
      { error: 'Submit failed' },
      { status: 500 }
    );
  }
}
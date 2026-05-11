import { prisma } from '@/lib/prisma';
import { getTransporter } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate basic input (tránh crash production)
    if (!body.name || !body.phone) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save DB
    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        age: body.age || null,
        phone: body.phone,
        message: body.message || '',
      },
    });

    const transporter = getTransporter();

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'Khách hàng mới đăng ký',
      html: `
        <h2>Thông tin khách hàng</h2>

        <p><b>Họ tên:</b> ${body.name}</p>
        <p><b>Tuổi:</b> ${body.age || ''}</p>
        <p><b>SĐT:</b> ${body.phone}</p>
        <p><b>Nội dung:</b></p>
        <p>${body.message || ''}</p>
      `,
    });

    return Response.json({
      success: true,
      data: contact,
    });
  } catch (err) {
    console.error('CONTACT API ERROR:', err);

    return Response.json(
      { success: false, error: 'Submit failed' },
      { status: 500 }
    );
  }
}
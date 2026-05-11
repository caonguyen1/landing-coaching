'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function CTA() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: '',
    age: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch('/api/contact', {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        toast.error('Gửi thất bại');
        return;
      }

      toast.success('Đăng ký thành công');
      setForm({
        name: '',
        age: '',
        phone: '',
        message: '',
      });
    } catch (err) {
      console.error(err);
      toast.error('Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="relative h-[80lvh] w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="/bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Purple Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-800/50  to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-between px-2">
        
        {/* LEFT CONTENT */}
        <div className="md:w-[60%] text-white">
          <h1 className="text-[40px] font-bold leading-[1.05]">
            Bạn đã chịu đựng đủ rồi.
            Đừng để nỗi đau kéo dài
            thêm nữa.
          </h1>

          <div className="mt-10 flex items-center gap-4 text-[20px] font-medium">
            <span className="text-yellow-400">👉</span>
            <p>Tham gia tư vấn cùng chuyên gia</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-[40%] rounded-[15px] bg-white p-4 shadow-xl md:p-6">
          <h2 className="mb-4 text-[20px] font-extrabold leading-tight text-black">
            Đăng ký tham gia ngay hôm nay
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="text"
              placeholder="Họ tên"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="h-[50px] w-full rounded-2xl bg-primary-50 p-3 text-[16px] outline-none"
            />

            <input
              type="text"
              placeholder="Tuổi"
              value={form.age}
              onChange={(e) =>
                setForm({
                  ...form,
                  age: e.target.value,
                })
              }
              className="h-[50px] w-full rounded-2xl bg-primary-50 p-3 text-[16px] outline-none"
            />

            <input
              type="text"
              placeholder="Số điện thoại Zalo"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="h-[50px] w-full rounded-2xl bg-primary-50 p-3 text-[16px] outline-none"
            />

            <textarea
              placeholder="Vấn đề cần hỗ trợ"
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
              className="min-h-[120px] w-full rounded-2xl bg-primary-50 p-3 text-[16px] outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="h-[50px] w-full cursor-pointer rounded-full bg-gradient-to-r from-primary-600 to-primary-400 text-[16px] font-bold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {loading
                ? 'Đang gửi...'
                : 'Tham gia'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import MotionItem from '../motion/MotionItem';

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

<section className="relative min-h-[80vh] w-full overflow-hidden md:pt-10">

  {/* Background */}
  <img
    src="/bg.jpg"
    alt=""
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-primary-800/60 to-transparent md:from-primary-800/50" />

  {/* Content */}
  <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-between gap-8 px-4 py-10 md:flex-row md:py-0">

    {/* LEFT */}
    <MotionItem
      variant="left"
      className="w-full text-center text-white md:w-[60%] md:text-left"
    >

      {/* TITLE */}
      <MotionItem
        variant="fade"
        delay={0.15}
      >
        <h1 className="text-[28px] font-bold leading-[1.1] md:text-[35px] md:leading-[1.3]">
          Bạn đã chịu đựng đủ rồi.
          <br />
          Đừng để nỗi đau kéo dài thêm nữa.
        </h1>
      </MotionItem>

      {/* SUB */}
      <MotionItem
        variant="fade"
        delay={0.35}
      >
        <div className="mt-6 flex items-center justify-center gap-3 text-[16px] font-medium md:mt-10 md:justify-start md:gap-4 md:text-[20px]">

          <span className="animate-pulse text-yellow-400">
            👉
          </span>

          <p>
            Tham gia tư vấn cùng chuyên gia
          </p>

        </div>
      </MotionItem>

    </MotionItem>

    {/* FORM */}
    <MotionItem
      variant="right"
      delay={0.2}
      className="w-full md:w-[40%]"
    >

      <div className="rounded-[20px] bg-white p-4 shadow-2xl md:p-6">

        {/* TITLE */}
        <MotionItem
          variant="fade"
          delay={0.3}
        >
          <h2 className="mb-4 text-center text-[18px] font-extrabold leading-tight text-black md:text-left md:text-[20px]">
            Đăng ký tham gia ngay hôm nay
          </h2>
        </MotionItem>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 md:space-y-5"
        >

          {/* NAME */}
          <MotionItem
            variant="fade"
            delay={0.4}
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
              className="h-[48px] w-full rounded-2xl bg-primary-50 p-3 text-[15px] outline-none transition duration-300 focus:ring-2 focus:ring-primary-300 md:h-[50px] md:text-[16px]"
            />
          </MotionItem>

          {/* AGE */}
          <MotionItem
            variant="fade"
            delay={0.5}
          >
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
              className="h-[48px] w-full rounded-2xl bg-primary-50 p-3 text-[15px] outline-none transition duration-300 focus:ring-2 focus:ring-primary-300 md:h-[50px] md:text-[16px]"
            />
          </MotionItem>

          {/* PHONE */}
          <MotionItem
            variant="fade"
            delay={0.6}
          >
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
              className="h-[48px] w-full rounded-2xl bg-primary-50 p-3 text-[15px] outline-none transition duration-300 focus:ring-2 focus:ring-primary-300 md:h-[50px] md:text-[16px]"
            />
          </MotionItem>

          {/* MESSAGE */}
          <MotionItem
            variant="fade"
            delay={0.7}
          >
            <textarea
              placeholder="Vấn đề cần hỗ trợ"
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
              className="min-h-[110px] w-full rounded-2xl bg-primary-50 p-3 text-[15px] outline-none transition duration-300 focus:ring-2 focus:ring-primary-300 md:min-h-[120px] md:text-[16px]"
            />
          </MotionItem>

          {/* BUTTON */}
          <MotionItem
            variant="scale"
            delay={0.8}
          >
            <button
              type="submit"
              disabled={loading}
              className="h-[48px] w-full cursor-pointer rounded-full bg-gradient-to-r from-primary-600 to-primary-400 text-[15px] font-bold text-white transition duration-300 hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] disabled:opacity-50 md:h-[50px] md:text-[16px]"
            >
              {loading
                ? 'Đang gửi...'
                : 'Tham gia'}
            </button>
          </MotionItem>

        </form>

      </div>
    </MotionItem>

  </div>
</section>
  );
}
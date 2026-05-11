'use client';

import { useEffect, useState } from 'react';
import Panel from '@/components/admin/Panel';
import Editor from '@/components/admin/Editor';
import ImageUpload from '@/components/admin/ImageUpload';
import { toast } from 'sonner';

type FormType = {
  logo: string;
  phone: string;
  email: string;
  website: string;
  facebook: string;
  youtube: string;
  title: string;
  meta: string;
  content: string;
};

export default function SettingsPage() {
  const [form, setForm] = useState<FormType>({
    logo: '',
    phone: '',
    email: '',
    website: '',
    facebook: '',
    youtube: '',
    title: '',
    meta: '',
    content: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 👉 load data
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();

        if (data) {
          setForm((prev) => ({
            ...prev,
            ...data,
          }));
        }
      } catch (err) {
        console.error(err);
        toast.error('❌ Không load được dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // 👉 input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 👉 upload logo
  const handleUploadLogo = async (file: File) => {
    try {
      toast.info('Đang upload logo...');

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error('Upload thất bại');

      setForm((prev) => ({
        ...prev,
        logo: data.url,
      }));

      toast.success('✅ Upload logo thành công');
    } catch (err) {
      console.error(err);
      toast.error('❌ Upload logo thất bại');
    }
  };

  // 👉 submit
  const handleSubmit = async () => {
    try {
      setSaving(true);

      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || 'Lưu thất bại');
      }

      toast.success('Lưu thành công!');
    } catch (err: any) {
      console.error(err);
      toast.error('❌ ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Đang tải dữ liệu...
      </div>
    );
  }
  return (
    <Panel
      title="Settings"
      footer={
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-purple-600 text-white px-5 py-2 rounded disabled:opacity-50"
        >
          {saving ? 'Đang lưu...' : 'Lưu'}
        </button>
      }
    >
      <div className="space-y-4 max-w-2xl m-auto">


        <div className="">

            {/* LOGO */}
            <ImageUpload
              label="Logo"
              value={form.logo}
              onUpload={handleUploadLogo}
            />

            {/* PHONE */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                SĐT
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            {/* EMAIL */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            {/* WEBSITE */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                Website
              </label>
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            {/* FACEBOOK */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                Facebook
              </label>
              <input
                name="facebook"
                value={form.facebook}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            {/* YOUTUBE */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                YouTube
              </label>
              <input
                name="youtube"
                value={form.youtube}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            {/* TITLE */}
            <div className="col-span-2 mb-2">
              <label className="block text-sm font-medium mb-1">
                Title (SEO)
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="col-span-2 mb-2">
              <label className="block text-sm font-medium mb-1">
                Content Footer
              </label>
              <Editor
                  value={form.content || ''}
                  onChange={(val) =>
                    setForm((prev) => ({
                      ...prev,
                      content: val,
                    }))
                  }
                />
            </div>

            {/* META */}
            <div className="col-span-2 mb-2">
              <label className="block text-sm font-medium mb-1">
                Meta description
              </label>
              <textarea
                name="meta"
                value={form.meta}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                rows={3}
              />
            </div>

          </div>
      </div>
    </Panel>
  );
}
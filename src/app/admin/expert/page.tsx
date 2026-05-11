'use client';

import { useEffect, useState } from 'react';

import Editor from '@/components/admin/Editor';
import ImageUpload from '@/components/admin/ImageUpload';
import Panel from '@/components/admin/Panel';

import { toast } from 'sonner';

interface ExpertForm {
  name: string;
  title: string;
  description: string;
  quote: string;
  image: string;
}

const defaultForm: ExpertForm = {
  name: '',
  title: '',
  description: '',
  quote: '',
  image: '',
};

export default function ExpertSectionAdminPage() {
  const [form, setForm] =
    useState<ExpertForm>(defaultForm);

  const [loading, setLoading] =
    useState(false);

  const [fetching, setFetching] =
    useState(false);

  // FETCH
  const fetchData = async () => {
    try {
      setFetching(true);

      const res = await fetch(
        '/api/admin/expert'
      );

      const data = await res.json();

      if (data) {
        setForm({
          name: data.name || '',
          title: data.title || '',
          description:
            data.description || '',
          quote: data.quote || '',
          image: data.image || '',
        });
      }
    } catch (err) {
      console.log(err);

      toast.error(
        'Không thể tải dữ liệu'
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // INPUT
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  // EDITOR
  const handleEditorChange = (
    field: keyof ExpertForm,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // IMAGE
  const handleUploadImage = async (
    file: File
  ) => {
    try {
      const formData = new FormData();

      formData.append(
        'file',
        file
      );

      const res = await fetch(
        '/api/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        toast.error(
          'Upload thất bại'
        );

        return;
      }

      setForm((prev) => ({
        ...prev,
        image: data.url,
      }));

      toast.success(
        'Upload thành công'
      );
    } catch (err) {
      console.log(err);

      toast.error(
        'Không thể upload'
      );
    }
  };

  // SAVE
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        '/api/admin/expert',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        toast.error(
          'Không thể lưu'
        );

        return;
      }

      toast.success(
        'Lưu thành công'
      );

      fetchData();
    } catch (err) {
      console.log(err);

      toast.error(
        'Có lỗi xảy ra'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Panel title="Giới thiệu chuyên gia">
      {fetching ? (
        <div className="py-20 text-center">
          Loading...
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* IMAGE */}
          <ImageUpload
            label="Hình ảnh"
            value={form.image}
            onUpload={
              handleUploadImage
            }
          />

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Tiêu đề nhỏ
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={
                handleChange
              }
              placeholder="Nhập tên..."
              className="
                w-full
                border border-gray-300
                rounded-xl
                px-4 py-3
                focus:outline-none
                focus:ring-2
                focus:ring-primary
              "
            />
          </div>

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Tên chuyên gia
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={
                handleChange
              }
              placeholder="Nhập chức danh..."
              className="
                w-full
                border border-gray-300
                rounded-xl
                px-4 py-3
                focus:outline-none
                focus:ring-2
                focus:ring-primary
              "
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>

            <Editor
              value={
                form.description
              }
              onChange={(val) =>
                handleEditorChange(
                  'description',
                  val
                )
              }
            />
          </div>

          {/* QUOTE */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Quote
            </label>

            <Editor
              value={form.quote}
              onChange={(val) =>
                handleEditorChange(
                  'quote',
                  val
                )
              }
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="
                bg-primary-600
                hover:bg-primary-700
                text-white
                px-8 py-3
                rounded-xl
                font-medium
                transition
                disabled:opacity-50
              "
            >
              {loading
                ? 'Saving...'
                : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </Panel>
  );
}
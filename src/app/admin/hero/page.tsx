'use client';

import Editor from '@/components/admin/Editor';
import Panel from '@/components/admin/Panel';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type HeroForm = {
  title: string;
  bullets: string[];
  content1: string;
};

const defaultForm: HeroForm = {
  title: '',
  bullets: [''],
  content1: '',
};

export default function AdminHeroPage() {
  const [form, setForm] =
    useState<HeroForm>(defaultForm);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  // FETCH
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/hero');

      const data = await res.json();

      if (data) {
        setForm({
          title: data.title || '',

          bullets:
            data.bullets?.length > 0
              ? data.bullets
              : [''],

          content1:
            data.content1 || '',
        });
      }
    } catch (err) {
      console.log(err);

      toast.error(
        'Không thể tải dữ liệu'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // INPUT
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // BULLET CHANGE
  const handleBulletChange = (
    index: number,
    value: string
  ) => {
    const updated = [
      ...form.bullets,
    ];

    updated[index] = value;

    setForm({
      ...form,
      bullets: updated,
    });
  };

  // ADD BULLET
  const handleAddBullet = () => {
    setForm({
      ...form,
      bullets: [
        ...form.bullets,
        '',
      ],
    });
  };

  // DELETE BULLET
  const handleDeleteBullet = (
    index: number
  ) => {
    const updated =
      form.bullets.filter(
        (_, i) => i !== index
      );

    setForm({
      ...form,
      bullets:
        updated.length > 0
          ? updated
          : [''],
    });
  };

  // SUBMIT
  const handleSubmit = async () => {
    try {
      setSaving(true);

      const payload = {
        ...form,

        bullets:
          form.bullets.filter(
            (item) =>
              item.trim() !== ''
          ),
      };

      const res = await fetch(
        '/api/hero',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(
            payload
          ),
        }
      );

      if (!res.ok) {
        throw new Error(
          'Save failed'
        );
      }

      toast.success(
        'Lưu thành công'
      );
    } catch (err) {
      console.log(err);

      toast.error(
        'Không thể lưu'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        className="
          p-10
          text-center
          text-gray-500
        "
      >
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <Panel
      title="Quản lý Hero Banner"
      footer={
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="
            bg-primary-600
            hover:bg-primary-700
            text-white
            px-6 py-3
            rounded-xl
            font-medium
            transition
            disabled:opacity-50
          "
        >
          {saving
            ? 'Đang lưu...'
            : 'Lưu thay đổi'}
        </button>
      }
    >
      <div className="max-w-3xl mx-auto space-y-5">
        {/* TITLE */}
        <div>
          <label
            className="
              block
              text-sm
              font-medium
              mb-1
            "
          >
            Tiêu đề
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Nhập tiêu đề..."
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

        {/* BULLETS */}
        <div>
          <div
            className="
              flex
              items-center
              justify-between
              mb-2
            "
          >
            <label
              className="
                text-sm
                font-medium
              "
            >
              Bullet List
            </label>

            <button
              type="button"
              onClick={
                handleAddBullet
              }
              className="
                bg-primary-600
                hover:bg-primary-700
                text-white
                px-4 py-2
                rounded-lg
                text-sm
                transition
              "
            >
              + Add Bullet
            </button>
          </div>

          <div className="space-y-3">
            {form.bullets.map(
              (
                bullet,
                index
              ) => (
                <div
                  key={index}
                  className="
                    flex
                    gap-2
                  "
                >
                  <input
                    value={bullet}
                    onChange={(e) =>
                      handleBulletChange(
                        index,
                        e.target.value
                      )
                    }
                    placeholder={`Bullet ${
                      index + 1
                    }`}
                    className="
                      flex-1
                      border border-gray-300
                      rounded-xl
                      px-4 py-3
                      focus:outline-none
                      focus:ring-2
                      focus:ring-primary
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteBullet(
                        index
                      )
                    }
                    className="
                      px-4
                      rounded-xl
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      transition
                    "
                  >
                    Delete
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div>
          <label
            className="
              block
              text-sm
              font-medium
              mb-2
            "
          >
            Nội dung
          </label>

          <Editor
            value={form.content1}
            onChange={(val) =>
              setForm((prev) => ({
                ...prev,
                content1: val,
              }))
            }
          />
        </div>
      </div>
    </Panel>
  );
}
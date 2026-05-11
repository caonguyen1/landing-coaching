'use client';

import { useEffect, useState } from 'react';
import Panel from '@/components/admin/Panel';
import Editor from '@/components/admin/Editor';
import { toast } from 'sonner';

export default function ServicesPage() {
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);

  // 👉 load data
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/services');
        const data = await res.json();
        setForm(data || {});
      } catch (err) {
        console.error(err);
        toast.error('❌ Không load được dữ liệu');
      }
    };

    load();
  }, []);

  // 👉 input change (text)
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 👉 editor change
  const handleEditorChange = (key: string, value: string) => {
    setForm((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 👉 submit
  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Lưu thất bại');

      toast.success('✅ Lưu thành công');
    } catch (err: any) {
      console.error(err);
      toast.error('❌ ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="space-y-6">


        {/* ===== MAIN SERVICE ===== */}
        <Panel title='Dịch vụ chính'>
          {/* Content 1 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Tiêu đề
            </label>
            <Editor
              value={form.mainDesc1 || ''}
              onChange={(val) =>
                handleEditorChange('mainDesc1', val)
              }
            />
          </div>

          {/* Content 2 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Nội dung 2
            </label>
            <Editor
              value={form.mainDesc2 || ''}
              onChange={(val) =>
                handleEditorChange('mainDesc2', val)
              }
            />
          </div>

          {/* Content 3 */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nội dung 3
            </label>
            <Editor
              value={form.mainDesc3 || ''}
              onChange={(val) =>
                handleEditorChange('mainDesc3', val)
              }
            />
          </div>
        </Panel>

        {/* ===== 3 SERVICES ===== */}
        {[1, 2, 3].map((i) => (
          <Panel
            key={i}
            title={`Dịch vụ ${i}`}
          >

            {/* Title */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Tiêu đề
              </label>
              <input
                name={`item${i}Title`}
                value={form[`item${i}Title`] || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Nhập tiêu đề"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Mô tả
              </label>
              <Editor
                value={form[`item${i}Desc`] || ''}
                onChange={(val) =>
                  handleEditorChange(
                    `item${i}Desc`,
                    val
                  )
                }
              />
            </div>
          </Panel>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-gray-300 text-center">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-purple-600 text-white px-5 py-2 rounded disabled:opacity-50"
        >
          {saving ? 'Đang lưu...' : 'Lưu'}
        </button>
      </div>
    </div>
  );
}
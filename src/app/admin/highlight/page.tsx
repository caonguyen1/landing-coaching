'use client';

import { useEffect, useState } from 'react';
import Panel from '@/components/admin/Panel';
import Editor from '@/components/admin/Editor';

export default function HighlightPage() {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/admin/highlight');
      const data = await res.json();
      if (data?.content) setContent(data.content);
    };

    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    await fetch('/api/admin/highlight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    setSaving(false);
  };

  return (
    <Panel
      title="Điểm khác biệt"
      footer={
        <button
          onClick={handleSave}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          {saving ? 'Đang lưu...' : 'Lưu'}
        </button>
      }
    >
      <Editor value={content} onChange={setContent} />
    </Panel>
  );
}
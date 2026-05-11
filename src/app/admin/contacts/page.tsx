// src/app/admin/contacts/page.tsx

'use client';

import Panel from '@/components/admin/Panel';
import AdminTable from '@/components/admin/Table';
import { useEffect, useState } from 'react';

type Contact = {
  id: string;
  name: string;
  age: number;
  phone: string;
  message: string;
  createdAt: string;
};

export default function AdminContacts() {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        '/api/admin/contacts'
      );

      const json = await res.json();

      setData(json);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Panel title='Khách hàng liên hệ'>
      <AdminTable
        data={data}
        loading={loading}
        columns={[
          {
            title: 'Tên',
            key: 'name',
            render: (item) => (
              <div className="font-medium">
                {item.name}
              </div>
            ),
          },

          {
            title: 'Tuổi',
            key: 'age',
            className: 'text-center',
          },

          {
            title: 'SĐT',
            key: 'phone',
            render: (item) => (
              <a
                href={`tel:${item.phone}`}
                className="
                  text-primary-600
                  hover:underline
                "
              >
                {item.phone}
              </a>
            ),
          },

          {
            title: 'Nội dung',
            key: 'message',
            render: (item) => (
              <div className="max-w-[400px] whitespace-pre-wrap line-clamp-3">
                {item.message}
              </div>
            ),
          },

          {
            title: 'Ngày',
            key: 'createdAt',
            render: (item) => (
              <div className="text-gray-500 text-sm whitespace-nowrap">
                {new Date(
                  item.createdAt
                ).toLocaleString('vi-VN')}
              </div>
            ),
          },
        ]}
      />
    </Panel>
  );
}
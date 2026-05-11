'use client';

import React from 'react';
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
} from 'react-icons/hi';

type ActionType =
  | 'view'
  | 'edit'
  | 'delete'
  | 'custom';

interface ActionItem {
  type?: ActionType;
  icon?: React.ReactNode;
  onClick: () => void;
  className?: string;
}

interface Column<T> {
  title: string;
  key: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  actions?: (row: T) => ActionItem[];
}

const actionConfig = {
  view: {
    icon: <HiOutlineEye size={18} />,
    className:
      'bg-green-50 text-green-600 hover:bg-green-100',
  },

  edit: {
    icon: <HiOutlinePencil size={18} />,
    className:
      'bg-blue-50 text-blue-600 hover:bg-blue-100',
  },

  delete: {
    icon: <HiOutlineTrash size={18} />,
    className:
      'bg-red-50 text-red-600 hover:bg-red-100',
  },

  custom: {
    icon: null,
    className:
      'bg-gray-100 text-gray-700 hover:bg-gray-200',
  },
};

export default function AdminTable<
  T extends { id: string }
>({
  columns,
  data,
  loading,
  actions,
}: AdminTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`
                    px-4 py-3
                    text-left
                    font-semibold
                    text-gray-700
                    whitespace-nowrap
                    ${col.className || ''}
                  `}
                >
                  {col.title}
                </th>
              ))}

              {actions && (
                <th className="px-4 py-3 text-center font-semibold text-gray-700">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`
                  border-b border-gray-100
                  hover:bg-gray-50 transition
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}
                `}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`
                      px-4 py-3 align-middle
                      ${col.className || ''}
                    `}
                  >
                    {col.render
                      ? col.render(row)
                      : (row as any)[col.key]}
                  </td>
                ))}

                {actions && (
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      {actions(row).map((action, i) => {
                        const config =
                          actionConfig[
                            action.type || 'custom'
                          ];

                        return (
                          <button
                            key={i}
                            onClick={action.onClick}
                            className={`
                              w-9 h-9 rounded-lg
                              flex items-center justify-center
                              transition
                              ${config.className}
                              ${action.className || ''}
                            `}
                          >
                            {action.icon || config.icon}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                )}
              </tr>
            ))}

            {!loading && data.length === 0 && (
              <tr>
                <td
                  colSpan={
                    actions
                      ? columns.length + 1
                      : columns.length
                  }
                  className="py-10 text-center text-gray-400"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="p-5 text-center text-gray-500">
          Loading...
        </div>
      )}
    </div>
  );
}
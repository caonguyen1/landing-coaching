'use client';

import { useEffect, useState } from 'react';

import ImageUpload from '@/components/admin/ImageUpload';
import AdminTable from '@/components/admin/Table';
import AdminModal from '@/components/admin/Modal';
import Panel from '@/components/admin/Panel';

import { toast } from 'sonner';

type Testimonial = {
  id: string;
  name: string;
  content: string;
  avatar?: string;
  position?: string;
  isActive: boolean;
};

const defaultForm = {
  name: '',
  content: '',
  avatar: '',
  position: '',
};

export default function AdminTestimonials() {
  const [data, setData] = useState<
    Testimonial[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState(defaultForm);

  const [openCreate, setOpenCreate] =
    useState(false);

  const [openEdit, setOpenEdit] =
    useState(false);

  const [selectedItem, setSelectedItem] =
    useState<Testimonial | null>(null);

  // =========================
  // FETCH
  // =========================

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        '/api/admin/testimonials'
      );

      const json = await res.json();

      setData(json);
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

  // =========================
  // CREATE
  // =========================

  const handleCreate = async () => {
    try {
      const res = await fetch(
        '/api/admin/testimonials',
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
        toast.error('Không thể tạo');
        return;
      }

      toast.success(
        'Tạo thành công'
      );

      setForm(defaultForm);

      setOpenCreate(false);

      fetchData();
    } catch (err) {
      console.log(err);

      toast.error(
        'Có lỗi xảy ra'
      );
    }
  };

  // =========================
  // UPDATE
  // =========================

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      const res = await fetch(
        `/api/admin/testimonials/${selectedItem.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            name:
              selectedItem.name,
            content:
              selectedItem.content,
            avatar:
              selectedItem.avatar,
            position:
              selectedItem.position,
            isActive:
              selectedItem.isActive,
          }),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        toast.error(
          json?.error ||
            'Không thể cập nhật'
        );

        return;
      }

      toast.success(
        'Cập nhật thành công'
      );

      setOpenEdit(false);

      setSelectedItem(null);

      fetchData();
    } catch (err) {
      console.log(err);

      toast.error(
        'Có lỗi xảy ra'
      );
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (
    id: string
  ) => {
    const ok = confirm(
      'Bạn có chắc muốn xoá testimonial này không?'
    );

    if (!ok) return;

    try {
      const res = await fetch(
        `/api/admin/testimonials/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!res.ok) {
        toast.error(
          'Không thể xoá'
        );

        return;
      }

      toast.success(
        'Xoá thành công'
      );

      fetchData();
    } catch (err) {
      console.log(err);

      toast.error(
        'Có lỗi xảy ra'
      );
    }
  };

  // =========================
  // UPLOAD
  // =========================

  const uploadImage = async (
    file: File,
    callback: (url: string) => void
  ) => {
    try {
      const formData = new FormData();

      formData.append('file', file);

      const res = await fetch(
        '/api/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          'Upload thất bại'
        );

        return;
      }

      callback(data.url);

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

  return (
    <Panel
      title="Phản hồi khách hàng"
      right={
        <button
          onClick={() =>
            setOpenCreate(true)
          }
          className="
            bg-primary-600
            hover:bg-primary-700
            text-white
            px-4 py-2
            rounded-xl
            transition
          "
        >
          + Add Feedback
        </button>
      }
    >
      {/* TABLE */}

      <AdminTable
        data={data}
        loading={loading}
        columns={[
          {
            title: 'Avatar',
            key: 'avatar',

            render: (item) => (
              <img
                src={
                  item.avatar ||
                  '/images/default-avatar.png'
                }
                className="
                  w-12
                  h-12
                  rounded-full
                  object-cover
                  border
                "
              />
            ),
          },

          {
            title: 'Name',
            key: 'name',

            render: (item) => (
              <div>
                <p className="font-semibold">
                  {item.name}
                </p>

                <p className="text-sm text-gray-500">
                  {item.position ||
                    '-'}
                </p>
              </div>
            ),
          },

          {
            title: 'Content',
            key: 'content',

            render: (item) => (
              <p className="line-clamp-2 max-w-md">
                {item.content}
              </p>
            ),
          },

          {
            title: 'Status',
            key: 'isActive',

            render: (item) => (
              <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-medium
                  ${
                    item.isActive
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }
                `}
              >
                {item.isActive
                  ? 'Active'
                  : 'Hidden'}
              </span>
            ),
          },
        ]}
        actions={(item) => [
          {
            type: 'edit',

            onClick: () => {
              setSelectedItem(item);

              setOpenEdit(true);
            },
          },

          {
            type: 'delete',

            onClick: () =>
              handleDelete(item.id),
          },
        ]}
      />

      {/* ========================= */}
      {/* CREATE MODAL */}
      {/* ========================= */}

      <AdminModal
        open={openCreate}
        onClose={() =>
          setOpenCreate(false)
        }
        title="Add Feedback"
      >
        <div className="space-y-4">
          <ImageUpload
            label="Avatar"
            value={form.avatar}
            onUpload={(file) =>
              uploadImage(
                file,
                (url) => {
                  setForm((prev) => ({
                    ...prev,
                    avatar: url,
                  }));
                }
              )
            }
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Name
            </label>

            <input
              placeholder="Enter name..."
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name:
                    e.target.value,
                }))
              }
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

          <div>
            <label className="block text-sm font-medium mb-1">
              Content
            </label>

            <textarea
              placeholder="Enter content..."
              value={form.content}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  content:
                    e.target.value,
                }))
              }
              rows={4}
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

          <button
            onClick={handleCreate}
            className="
              w-full
              bg-primary-600
              hover:bg-primary-700
              text-white
              py-3
              rounded-xl
              transition
            "
          >
            Add Feedback
          </button>
        </div>
      </AdminModal>

      {/* ========================= */}
      {/* EDIT MODAL */}
      {/* ========================= */}

      <AdminModal
        open={openEdit}
        onClose={() =>
          setOpenEdit(false)
        }
        title="Edit Feedback"
      >
        {selectedItem && (
          <div className="space-y-4">
            <ImageUpload
              label="Avatar"
              value={
                selectedItem.avatar
              }
              onUpload={(file) =>
                uploadImage(
                  file,
                  (url) => {
                    setSelectedItem(
                      (prev) =>
                        prev
                          ? {
                              ...prev,
                              avatar:
                                url,
                            }
                          : null
                    );
                  }
                )
              }
            />

            <div>
              <label className="block text-sm font-medium mb-1">
                Name
              </label>

              <input
                placeholder="Enter name..."
                value={
                  selectedItem.name
                }
                onChange={(e) =>
                  setSelectedItem(
                    (prev) =>
                      prev
                        ? {
                            ...prev,
                            name:
                              e.target
                                .value,
                          }
                        : null
                  )
                }
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

            <div>
              <label className="block text-sm font-medium mb-1">
                Content
              </label>

              <textarea
                placeholder="Enter content..."
                value={
                  selectedItem.content
                }
                onChange={(e) =>
                  setSelectedItem(
                    (prev) =>
                      prev
                        ? {
                            ...prev,
                            content:
                              e.target
                                .value,
                          }
                        : null
                  )
                }
                rows={4}
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

            <div>
              <label className="block text-sm font-medium mb-2">
                Status
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={
                    selectedItem.isActive
                  }
                  onChange={(e) =>
                    setSelectedItem(
                      (prev) =>
                        prev
                          ? {
                              ...prev,
                              isActive:
                                e.target
                                  .checked,
                            }
                          : null
                    )
                  }
                />

                <span>
                  Active
                </span>
              </label>
            </div>

            <button
              onClick={
                handleUpdate
              }
              className="
                w-full
                bg-primary-600
                hover:bg-primary-700
                text-white
                py-3
                rounded-xl
                transition
              "
            >
              Save Changes
            </button>
          </div>
        )}
      </AdminModal>
    </Panel>
  );
}
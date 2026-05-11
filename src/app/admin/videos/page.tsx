'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  toast,
} from 'sonner';

import Panel from '@/components/admin/Panel';
import AdminTable from '@/components/admin/Table';
import AdminModal from '@/components/admin/Modal';
import ImageUpload from '@/components/admin/ImageUpload';

type Video = {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  image?: string;
  isActive: boolean;
};

const defaultForm = {
  title: '',
  youtubeId: '',
  image: '',
};

export default function AdminVideos() {
  const [videos, setVideos] =
    useState<Video[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState(defaultForm);

  const [openCreate, setOpenCreate] =
    useState(false);

  const [openEdit, setOpenEdit] =
    useState(false);

  const [selectedVideo, setSelectedVideo] =
    useState<Video | null>(null);

  // =========================
  // FETCH
  // =========================

  const fetchVideos = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        '/api/admin/videos'
      );

      const data =
        await res.json();

      setVideos(data);
    } catch (err) {
      console.log(err);

      toast.error(
        'Không thể tải videos'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // =========================
  // CREATE
  // =========================

  const handleCreate = async () => {
    try {
      if (
        !form.title ||
        !form.youtubeId
      ) {
        toast.error(
          'Vui lòng nhập đầy đủ dữ liệu'
        );

        return;
      }

      const res = await fetch(
        '/api/admin/videos',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(
            form
          ),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        toast.error(
          data?.error ||
            'Không thể tạo video'
        );

        return;
      }

      toast.success(
        'Tạo video thành công'
      );

      setForm(defaultForm);

      setOpenCreate(false);

      fetchVideos();
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
    if (!selectedVideo) return;

    try {
      const res = await fetch(
        `/api/admin/videos/${selectedVideo.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            title:
              selectedVideo.title,

            youtubeId:
              selectedVideo.youtubeId,

            image:
              selectedVideo.image,

            isActive:
              selectedVideo.isActive,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        toast.error(
          data?.error ||
            'Không thể cập nhật'
        );

        return;
      }

      toast.success(
        'Cập nhật thành công'
      );

      setOpenEdit(false);

      setSelectedVideo(null);

      fetchVideos();
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
      'Bạn có chắc muốn xoá video này không?'
    );

    if (!ok) return;

    try {
      const res = await fetch(
        `/api/admin/videos/${id}`,
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

      fetchVideos();
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
    callback: (
      url: string
    ) => void
  ) => {
    try {
      const formData =
        new FormData();

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
    <>
      <Panel
        title="Danh sách video"
        right={
          <button
            onClick={() =>
              setOpenCreate(
                true
              )
            }
            className="
              bg-primary-600
              hover:bg-primary-700
              text-white
              px-4 py-2
              rounded-xl
              font-medium
              transition
            "
          >
            + Add Video
          </button>
        }
      >
        {/* TABLE */}

        <AdminTable
          data={videos}
          loading={loading}
          columns={[
            {
              title:
                'Thumbnail',

              key: 'thumbnail',

              render: (item) => (
                <img
                  src={
                    item.image ||
                    item.thumbnail
                  }
                  className="
                    w-28
                    h-16
                    object-cover
                    rounded-lg
                    border
                  "
                />
              ),
            },

            {
              title: 'Title',

              key: 'title',

              render: (item) => (
                <div className="font-medium">
                  {item.title}
                </div>
              ),
            },

            {
              title:
                'YouTube ID',

              key: 'youtubeId',

              render: (item) => (
                <div className="font-mono text-sm">
                  {
                    item.youtubeId
                  }
                </div>
              ),
            },

            {
              title: 'Status',

              key: 'isActive',

              className:
                'text-center',

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
                setSelectedVideo(
                  item
                );

                setOpenEdit(
                  true
                );
              },
            },

            {
              type: 'delete',

              onClick: () =>
                handleDelete(
                  item.id
                ),
            },
          ]}
        />
      </Panel>

      {/* ========================= */}
      {/* CREATE MODAL */}
      {/* ========================= */}

      <AdminModal
        open={openCreate}
        onClose={() =>
          setOpenCreate(false)
        }
        title="Add Video"
      >
        <div className="space-y-4">
          <ImageUpload
            label="Video Image"
            value={form.image}
            onUpload={(file) =>
              uploadImage(
                file,
                (url) => {
                  setForm(
                    (
                      prev
                    ) => ({
                      ...prev,
                      image:
                        url,
                    })
                  );
                }
              )
            }
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Title
            </label>

            <input
              placeholder="Enter title..."
              value={form.title}
              onChange={(e) =>
                setForm(
                  (
                    prev
                  ) => ({
                    ...prev,
                    title:
                      e
                        .target
                        .value,
                  })
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
              YouTube ID
            </label>

            <input
              placeholder="Enter YouTube ID..."
              value={
                form.youtubeId
              }
              onChange={(e) =>
                setForm(
                  (
                    prev
                  ) => ({
                    ...prev,
                    youtubeId:
                      e
                        .target
                        .value,
                  })
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

          <button
            onClick={
              handleCreate
            }
            className="
              w-full
              bg-primary-600
              hover:bg-primary-700
              text-white
              py-3
              rounded-xl
              font-medium
              transition
            "
          >
            Add Video
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
        title="Edit Video"
      >
        {selectedVideo && (
          <div className="space-y-4">
            <ImageUpload
              label="Video Image"
              value={
                selectedVideo.image
              }
              onUpload={(file) =>
                uploadImage(
                  file,
                  (url) => {
                    setSelectedVideo(
                      (
                        prev
                      ) =>
                        prev
                          ? {
                              ...prev,
                              image:
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
                Title
              </label>

              <input
                placeholder="Enter title..."
                value={
                  selectedVideo.title
                }
                onChange={(e) =>
                  setSelectedVideo(
                    (
                      prev
                    ) =>
                      prev
                        ? {
                            ...prev,
                            title:
                              e
                                .target
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
                YouTube ID
              </label>

              <input
                placeholder="Enter YouTube ID..."
                value={
                  selectedVideo.youtubeId
                }
                onChange={(e) =>
                  setSelectedVideo(
                    (
                      prev
                    ) =>
                      prev
                        ? {
                            ...prev,
                            youtubeId:
                              e
                                .target
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
              <label className="block text-sm font-medium mb-2">
                Status
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={
                    selectedVideo.isActive
                  }
                  onChange={(e) =>
                    setSelectedVideo(
                      (
                        prev
                      ) =>
                        prev
                          ? {
                              ...prev,
                              isActive:
                                e
                                  .target
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
                font-medium
                transition
              "
            >
              Save Changes
            </button>
          </div>
        )}
      </AdminModal>
    </>
  );
}
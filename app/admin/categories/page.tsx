'use client';

import { FC, useState, useEffect, useCallback } from 'react';
import { IWikiCategory } from '@/types/models';

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  parentId: string;
  order: number;
  isPublished: boolean;
  status: 'active' | 'inactive';
  thumbnailUrl: string;
  metaDescription: string;
}

const AdminCategoriesPage: FC = () => {
  const [categories, setCategories] = useState<IWikiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
    icon: '📁',
    color: '#2563EB',
    parentId: '',
    order: 0,
    isPublished: true,
    status: 'active',
    thumbnailUrl: '',
    metaDescription: '',
  });

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/categories?search=${searchQuery}`);
      const data = await response.json();
      
      if (response.ok) {
        setCategories(data.data || []);
        setError('');
      } else {
        setError(data.error || 'Không thể tải danh sách danh mục');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tải danh sách danh mục');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'd')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove Vietnamese accents
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'name') {
      setFormData({
        ...formData,
        name: value,
        slug: generateSlug(value),
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Open modal for create
  const handleCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      icon: '📁',
      color: '#2563EB',
      parentId: '',
      order: 0,
      isPublished: true,
      status: 'active',
      thumbnailUrl: '',
      metaDescription: '',
    });
    setShowModal(true);
  };

  // Open modal for edit
  const handleEdit = (category: IWikiCategory) => {
    setEditingId(category._id.toString());
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon || '📁',
      color: category.color || '#2563EB',
      parentId: category.parentId?.toString() || '',
      order: category.order,
      isPublished: category.isPublished,
      status: category.status || 'active',
      thumbnailUrl: category.thumbnailUrl || '',
      metaDescription: category.metaDescription || '',
    });
    setShowModal(true);
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId 
        ? `/api/categories/${editingId}` 
        : '/api/categories';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setShowModal(false);
        fetchCategories();
        alert(data.message || 'Thành công');
      } else {
        alert(data.error || 'Có lỗi xảy ra');
      }
    } catch (err) {
      alert('Có lỗi xảy ra khi lưu danh mục');
    }
  };

  // Delete category
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc muốn xóa danh mục "${name}"?`)) {
      return;
    }
    
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        fetchCategories();
        alert(data.message || 'Xóa thành công');
      } else {
        alert(data.error || 'Không thể xóa danh mục');
      }
    } catch (err) {
      alert('Có lỗi xảy ra khi xóa danh mục');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Quản lý Danh mục</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          ➕ Tạo danh mục mới
        </button>
      </div>

      {/* Search */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Tìm kiếm danh mục..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      {!loading && (
        <div className="row g-4">
          {categories.length === 0 ? (
            <div className="col-12">
              <div className="text-center py-5 text-muted">
                <h4>Chưa có danh mục nào</h4>
                <p>Nhấn "Tạo danh mục mới" để bắt đầu</p>
              </div>
            </div>
          ) : (
            categories.map((category) => (
              <div key={category._id.toString()} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      {/* Icon or Thumbnail */}
                      {category.thumbnailUrl ? (
                        <img 
                          src={category.thumbnailUrl}
                          alt={category.name}
                          className="me-3"
                          style={{ 
                            width: '60px',
                            height: '60px',
                            borderRadius: '12px',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <div 
                          className="me-3 d-flex align-items-center justify-content-center"
                          style={{ 
                            fontSize: '2rem',
                            width: '60px',
                            height: '60px',
                            borderRadius: '12px',
                            backgroundColor: `${category.color}15`,
                          }}
                        >
                          {category.icon}
                        </div>
                      )}
                      <div className="flex-grow-1">
                        <h5 className="mb-0">{category.name}</h5>
                        <small className="text-muted">{category.slug}</small>
                        {category.parentId && (
                          <div>
                            <small className="text-primary">
                              📂 {typeof category.parentId === 'object' && category.parentId !== null && 'name' in category.parentId 
                                ? (category.parentId as any).name 
                                : 'Parent Category'}
                            </small>
                          </div>
                        )}
                      </div>
                      <div className="d-flex flex-column gap-1">
                        {category.status === 'active' ? (
                          <span className="badge bg-success">Active</span>
                        ) : (
                          <span className="badge bg-secondary">Inactive</span>
                        )}
                        {!category.isPublished && (
                          <span className="badge bg-warning">Nháp</span>
                        )}
                      </div>
                    </div>
                    <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>
                      {category.description}
                    </p>
                    {category.metaDescription && (
                      <p className="text-muted small mb-2" style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
                        SEO: {category.metaDescription.substring(0, 60)}...
                      </p>
                    )}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="text-muted small">
                        <span>📊 Số bài: {category.articleCount || 0}</span>
                        <span className="ms-3">📋 Thứ tự: {category.order}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                        <div>Tạo: {new Date(category.createdAt).toLocaleDateString('vi-VN')}</div>
                        <div>Sửa: {new Date(category.updatedAt).toLocaleDateString('vi-VN')}</div>
                      </div>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-primary"
                          onClick={() => handleEdit(category)}
                        >
                          Sửa
                        </button>
                        <button 
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(category._id.toString(), category.name)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal - Enhanced Design */}
      {showModal && (
        <div 
          className="modal show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowModal(false)}
        >
          <div 
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content rounded-3 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold" style={{ color: '#0F172A' }}>
                  {editingId ? '✏️ Chỉnh sửa danh mục' : '➕ Tạo danh mục mới'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  {/* Basic Information Section */}
                  <div className="mb-4">
                    <h6 className="fw-semibold mb-3" style={{ color: '#2563EB' }}>
                      📝 Thông tin cơ bản
                    </h6>
                    <div className="mb-3">
                      <label className="form-label fw-medium">
                        Tên danh mục <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ví dụ: Công nghệ AI"
                        required
                      />
                      <small className="text-muted">Tên hiển thị của danh mục</small>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label fw-medium">
                        Slug <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        placeholder="cong-nghe-ai"
                        required
                      />
                      <small className="text-muted">
                        URL thân thiện (tự động sinh từ tên danh mục)
                      </small>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label fw-medium">
                        Mô tả <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Mô tả chi tiết về danh mục..."
                        required
                      />
                      <small className="text-muted">Mô tả sẽ hiển thị trên trang danh mục</small>
                    </div>
                  </div>

                  {/* SEO & Categorization Section */}
                  <div className="mb-4 pb-3 border-bottom">
                    <h6 className="fw-semibold mb-3" style={{ color: '#2563EB' }}>
                      🎯 SEO & Phân loại
                    </h6>
                    <div className="mb-3">
                      <label className="form-label fw-medium">
                        Meta Description (SEO)
                      </label>
                      <textarea
                        className="form-control"
                        name="metaDescription"
                        value={formData.metaDescription}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="Mô tả ngắn gọn để tối ưu SEO (150-160 ký tự)"
                        maxLength={160}
                      />
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">Tối ưu cho công cụ tìm kiếm</small>
                        <small className={formData.metaDescription.length > 160 ? 'text-danger' : 'text-muted'}>
                          {formData.metaDescription.length}/160 ký tự
                        </small>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-medium">
                        Danh mục cha
                      </label>
                      <select
                        className="form-select"
                        name="parentId"
                        value={formData.parentId}
                        onChange={handleInputChange}
                      >
                        <option value="">-- Không có (Danh mục gốc) --</option>
                        {categories
                          .filter(cat => cat._id.toString() !== editingId)
                          .map(cat => (
                            <option key={cat._id.toString()} value={cat._id.toString()}>
                              {cat.name}
                            </option>
                          ))}
                      </select>
                      <small className="text-muted">Chọn danh mục cha để tạo cấu trúc phân cấp</small>
                    </div>
                  </div>

                  {/* Visual Design Section */}
                  <div className="mb-4 pb-3 border-bottom">
                    <h6 className="fw-semibold mb-3" style={{ color: '#2563EB' }}>
                      🎨 Thiết kế & Hình ảnh
                    </h6>
                    
                    <div className="mb-3">
                      <label className="form-label fw-medium">Thumbnail URL</label>
                      <input
                        type="url"
                        className="form-control"
                        name="thumbnailUrl"
                        value={formData.thumbnailUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.png"
                      />
                      <small className="text-muted">Hình ảnh đại diện cho danh mục</small>
                      {formData.thumbnailUrl && (
                        <div className="mt-2 p-2 bg-light rounded">
                          <small className="text-muted d-block mb-1">Preview:</small>
                          <img 
                            src={formData.thumbnailUrl} 
                            alt="Thumbnail preview" 
                            style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '8px' }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-medium">Icon (Emoji)</label>
                        <div className="d-flex align-items-center gap-2">
                          <input
                            type="text"
                            className="form-control"
                            name="icon"
                            value={formData.icon}
                            onChange={handleInputChange}
                            placeholder="📁"
                            maxLength={2}
                          />
                          {formData.icon && (
                            <div 
                              className="d-flex align-items-center justify-content-center"
                              style={{ 
                                fontSize: '2rem',
                                width: '50px',
                                height: '50px',
                                borderRadius: '8px',
                                backgroundColor: formData.color || '#2563EB'
                              }}
                            >
                              {formData.icon}
                            </div>
                          )}
                        </div>
                        <small className="text-muted">Icon emoji để hiển thị</small>
                      </div>
                      
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-medium">Màu sắc</label>
                        <div className="d-flex align-items-center gap-2">
                          <input
                            type="color"
                            className="form-control form-control-color"
                            name="color"
                            value={formData.color}
                            onChange={handleInputChange}
                            style={{ width: '60px', height: '38px' }}
                          />
                          <input
                            type="text"
                            className="form-control"
                            value={formData.color}
                            onChange={(e) => handleInputChange({ target: { name: 'color', value: e.target.value } } as any)}
                            placeholder="#2563EB"
                          />
                        </div>
                        <small className="text-muted">Màu chủ đạo của danh mục</small>
                      </div>
                    </div>
                  </div>

                  {/* Settings Section */}
                  <div className="mb-3">
                    <h6 className="fw-semibold mb-3" style={{ color: '#2563EB' }}>
                      ⚙️ Cài đặt
                    </h6>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-medium">Thứ tự hiển thị</label>
                        <input
                          type="number"
                          className="form-control"
                          name="order"
                          value={formData.order}
                          onChange={handleInputChange}
                          placeholder="0"
                        />
                        <small className="text-muted">Số thứ tự sắp xếp (nhỏ hơn = trước)</small>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-medium">Trạng thái</label>
                        <select
                          className="form-select"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="active">✅ Active (Hoạt động)</option>
                          <option value="inactive">⏸️ Inactive (Tạm ẩn)</option>
                        </select>
                        <small className="text-muted">Trạng thái hiển thị danh mục</small>
                      </div>
                    </div>
                    
                    <div className="form-check form-switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="isPublished"
                        id="isPublished"
                        checked={formData.isPublished}
                        onChange={handleInputChange}
                        role="switch"
                      />
                      <label className="form-check-label fw-medium" htmlFor="isPublished">
                        📢 Xuất bản danh mục
                      </label>
                    </div>
                  </div>

                  {editingId && (
                    <div className="alert alert-info d-flex align-items-start" role="alert">
                      <div className="me-2" style={{ fontSize: '1.2rem' }}>ℹ️</div>
                      <div>
                        <strong>Thông tin:</strong>
                        <ul className="mb-0 mt-1">
                          <li>Số bài viết được tự động cập nhật khi có bài mới</li>
                          <li>Thay đổi slug có thể ảnh hưởng đến SEO</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button 
                    type="button" 
                    className="btn btn-secondary rounded-pill px-4"
                    onClick={() => setShowModal(false)}
                  >
                    ❌ Hủy
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary rounded-pill px-4"
                    style={{ backgroundColor: '#2563EB' }}
                  >
                    {editingId ? '💾 Cập nhật' : '✨ Tạo mới'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategoriesPage;

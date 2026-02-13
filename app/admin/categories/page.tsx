'use client';

import { FC, useState, useEffect, useCallback } from 'react';
import { IWikiCategory } from '@/types/models';

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  isPublished: boolean;
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
    order: 0,
    isPublished: true,
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      order: 0,
      isPublished: true,
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
      order: category.order,
      isPublished: category.isPublished,
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
                      <div className="flex-grow-1">
                        <h5 className="mb-0">{category.name}</h5>
                        <small className="text-muted">{category.slug}</small>
                      </div>
                      {!category.isPublished && (
                        <span className="badge bg-secondary">Nháp</span>
                      )}
                    </div>
                    <p className="text-muted mb-3">
                      {category.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-muted small">
                        <span>Thứ tự: {category.order}</span>
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

      {/* Modal */}
      {showModal && (
        <div 
          className="modal show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowModal(false)}
        >
          <div 
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingId ? 'Chỉnh sửa danh mục' : 'Tạo danh mục mới'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Tên danh mục *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Slug *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Mô tả *</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Icon (Emoji)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="icon"
                        value={formData.icon}
                        onChange={handleInputChange}
                        placeholder="📁"
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Màu sắc</label>
                      <input
                        type="color"
                        className="form-control form-control-color"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Thứ tự hiển thị</label>
                    <input
                      type="number"
                      className="form-control"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="isPublished"
                      id="isPublished"
                      checked={formData.isPublished}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="isPublished">
                      Xuất bản
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingId ? 'Cập nhật' : 'Tạo mới'}
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

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import WikiCategory from '@/models/WikiCategory';
import { isValidObjectId } from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'ID không hợp lệ' },
        { status: 400 }
      );
    }
    
    const category = await WikiCategory.findById(id).lean();
    
    if (!category) {
      return NextResponse.json(
        { error: 'Không tìm thấy danh mục' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ data: category });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Không thể tải thông tin danh mục' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'ID không hợp lệ' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: 'Tên danh mục không được để trống' },
        { status: 400 }
      );
    }
    
    if (!body.slug) {
      return NextResponse.json(
        { error: 'Slug không được để trống' },
        { status: 400 }
      );
    }
    
    if (!body.description) {
      return NextResponse.json(
        { error: 'Mô tả không được để trống' },
        { status: 400 }
      );
    }
    
    // Check if slug is being changed and if new slug already exists
    if (body.slug) {
      const existingCategory = await WikiCategory.findOne({
        slug: body.slug,
        _id: { $ne: id },
      });
      
      if (existingCategory) {
        return NextResponse.json(
          { error: 'Slug đã tồn tại, vui lòng chọn slug khác' },
          { status: 400 }
        );
      }
    }
    
    const category = await WikiCategory.findByIdAndUpdate(
      id,
      {
        name: body.name,
        slug: body.slug,
        description: body.description,
        icon: body.icon,
        color: body.color,
        parentId: body.parentId || null,
        order: body.order,
        isPublished: body.isPublished,
      },
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return NextResponse.json(
        { error: 'Không tìm thấy danh mục' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Cập nhật danh mục thành công',
      data: category,
    });
  } catch (error: any) {
    console.error('Error updating category:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Slug đã tồn tại' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Không thể cập nhật danh mục' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'ID không hợp lệ' },
        { status: 400 }
      );
    }
    
    const category = await WikiCategory.findByIdAndDelete(id);
    
    if (!category) {
      return NextResponse.json(
        { error: 'Không tìm thấy danh mục' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Xóa danh mục thành công',
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Không thể xóa danh mục' },
      { status: 500 }
    );
  }
}

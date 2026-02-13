import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import WikiCategory from '@/models/WikiCategory';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '100');
    const search = searchParams.get('search') || '';
    
    // Build query
    interface QueryFilter {
      $or?: Array<{ name?: { $regex: string; $options: string } } | { description?: { $regex: string; $options: string } }>;
    }
    
    const query: QueryFilter = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    
    // Get categories with pagination and populate parent
    const categories = await WikiCategory.find(query)
      .populate('parentId', 'name slug')
      .sort({ order: 1, name: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    
    const total = await WikiCategory.countDocuments(query);
    
    return NextResponse.json({
      data: categories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Không thể tải danh sách danh mục' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
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
    
    // Check if slug already exists
    const existingCategory = await WikiCategory.findOne({ slug: body.slug });
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Slug đã tồn tại, vui lòng chọn slug khác' },
        { status: 400 }
      );
    }
    
    // Log for debugging
    console.log('Creating category with status:', body.status);
    
    // Create category
    const category = await WikiCategory.create({
      name: body.name,
      slug: body.slug,
      description: body.description,
      icon: body.icon || '📁',
      color: body.color || '#2563EB',
      parentId: body.parentId || null,
      order: body.order || 0,
      isPublished: body.isPublished !== undefined ? body.isPublished : true,
      status: body.status || 'active',
      thumbnailUrl: body.thumbnailUrl || '',
      metaDescription: body.metaDescription || '',
      articleCount: 0,
    });
    
    return NextResponse.json(
      { 
        message: 'Tạo danh mục thành công',
        data: category,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating category:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Danh mục đã tồn tại' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Không thể tạo danh mục' },
      { status: 500 }
    );
  }
}

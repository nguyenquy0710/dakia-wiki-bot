import { ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  department?: string;
  position?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWikiCategory {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  color?: string;
  parentId?: ObjectId;
  order: number;
  isPublished: boolean;
  // New fields for enhanced functionality
  status: 'active' | 'inactive';
  thumbnailUrl?: string;
  metaDescription?: string;
  articleCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWikiArticle {
  _id: ObjectId;
  title: string;
  slug: string;
  summary: string;
  content: string;
  htmlContent: string;
  categoryId: ObjectId;
  author: string;
  tags: string[];
  
  metaTitle?: string;
  metaDescription?: string;
  
  version: number;
  previousVersions: {
    version: number;
    content: string;
    updatedBy: string;
    updatedAt: Date;
  }[];
  
  views: number;
  likes: number;
  
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWikiComment {
  _id: ObjectId;
  articleId: ObjectId;
  userId: ObjectId;
  content: string;
  parentId?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

import mongoose, { Schema, Model } from 'mongoose';
import { IWikiArticle } from '@/types/models';

const WikiArticleSchema = new Schema<IWikiArticle>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    htmlContent: {
      type: String,
      required: [true, 'HTML content is required'],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'WikiCategory',
      required: [true, 'Category is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    version: {
      type: Number,
      default: 1,
    },
    previousVersions: [
      {
        version: Number,
        content: String,
        updatedBy: String,
        updatedAt: Date,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
WikiArticleSchema.index({ slug: 1 });
WikiArticleSchema.index({ categoryId: 1 });
WikiArticleSchema.index({ isPublished: 1 });
WikiArticleSchema.index({ isFeatured: 1 });

const WikiArticle: Model<IWikiArticle> = 
  mongoose.models.WikiArticle || mongoose.model<IWikiArticle>('WikiArticle', WikiArticleSchema);

export default WikiArticle;

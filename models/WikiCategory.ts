import mongoose, { Schema, Model } from 'mongoose';
import { IWikiCategory } from '@/types/models';

const WikiCategorySchema = new Schema<IWikiCategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'WikiCategory',
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
WikiCategorySchema.index({ slug: 1 });
WikiCategorySchema.index({ parentId: 1 });

const WikiCategory: Model<IWikiCategory> = 
  mongoose.models.WikiCategory || mongoose.model<IWikiCategory>('WikiCategory', WikiCategorySchema);

export default WikiCategory;

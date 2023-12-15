import type { ImageType } from '@project/types';

export interface IReview {
  _id: string;
  username: string;
  image: ImageType;
  opinion: string;
  rating: number;
  company?: string;
}

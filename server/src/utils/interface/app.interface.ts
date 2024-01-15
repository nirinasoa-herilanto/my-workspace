/**
 * Image interface
 */
export interface IImage {
  link: string;
  alt: string;
}

/**
 * Custom input interface
 */
export interface ICustomInput<T> {
  input: T;
}

export interface IResults<T> {
  page: number;
  limit: number;
  total: number;
  data: T;
}

/* tslint:disable */
/* eslint-disable */
import { BookResponse } from './book-response';
export interface PageResponseBookResponse {
  content?: Array<BookResponse>;
  first?: boolean;
  last?: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
}

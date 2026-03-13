/* tslint:disable */
/* eslint-disable */
import { BorrowedBookResponse } from './borrowed-book-response';
export interface PageResponseBorrowedBookResponse {
  content?: Array<BorrowedBookResponse>;
  first?: boolean;
  last?: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
}

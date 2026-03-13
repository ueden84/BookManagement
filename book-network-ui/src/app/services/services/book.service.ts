/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BookRequest } from '../models/book-request';
import { BookResponse } from '../models/book-response';
import { PageResponseBookResponse } from '../models/page-response-book-response';
import { PageResponseBorrowedBookResponse } from '../models/page-response-borrowed-book-response';

@Injectable({
  providedIn: 'root',
})
export class BookService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findAllBooks
   */
  static readonly FindAllBooksPath = '/books';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllBooks()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBooks$Response(params?: {
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PageResponseBookResponse>> {

    const rb = new RequestBuilder(this.rootUrl, BookService.FindAllBooksPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageResponseBookResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllBooks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBooks(params?: {
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<PageResponseBookResponse> {

    return this.findAllBooks$Response(params).pipe(
      map((r: StrictHttpResponse<PageResponseBookResponse>) => r.body as PageResponseBookResponse)
    );
  }

  /**
   * Path part for operation saveBook
   */
  static readonly SaveBookPath = '/books';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveBook$Response(params: {
    context?: HttpContext
    body: BookRequest
  }
): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, BookService.SaveBookPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveBook(params: {
    context?: HttpContext
    body: BookRequest
  }
): Observable<number> {

    return this.saveBook$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation uploadBookCoverPicture
   */
  static readonly UploadBookCoverPicturePath = '/books/cover/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadBookCoverPicture()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBookCoverPicture$Response(params: {
    'book-id': number;
    context?: HttpContext
    body?: {
'file': Blob;
}
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, BookService.UploadBookCoverPicturePath, 'post');
    if (params) {
      rb.path('book-id', params['book-id'], {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadBookCoverPicture$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBookCoverPicture(params: {
    'book-id': number;
    context?: HttpContext
    body?: {
'file': Blob;
}
  }
): Observable<{
}> {

    return this.uploadBookCoverPicture$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation borrowBook
   */
  static readonly BorrowBookPath = '/books/borrow/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `borrowBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowBook$Response(params: {
    'book-id': number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, BookService.BorrowBookPath, 'post');
    if (params) {
      rb.path('book-id', params['book-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `borrowBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowBook(params: {
    'book-id': number;
    context?: HttpContext
  }
): Observable<number> {

    return this.borrowBook$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation updateShareableStatus
   */
  static readonly UpdateShareableStatusPath = '/books/shareable/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateShareableStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus$Response(params: {
    'book-id': number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, BookService.UpdateShareableStatusPath, 'patch');
    if (params) {
      rb.path('book-id', params['book-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateShareableStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus(params: {
    'book-id': number;
    context?: HttpContext
  }
): Observable<number> {

    return this.updateShareableStatus$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation approveReturnBorrowBook
   */
  static readonly ApproveReturnBorrowBookPath = '/books/borrow/return/approve/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `approveReturnBorrowBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnBorrowBook$Response(params: {
    'book-id': number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, BookService.ApproveReturnBorrowBookPath, 'patch');
    if (params) {
      rb.path('book-id', params['book-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `approveReturnBorrowBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnBorrowBook(params: {
    'book-id': number;
    context?: HttpContext
  }
): Observable<number> {

    return this.approveReturnBorrowBook$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation returnBorrowedBook
   */
  static readonly ReturnBorrowedBookPath = '/books/borrow/return/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `returnBorrowedBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnBorrowedBook$Response(params: {
    'book-id': number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, BookService.ReturnBorrowedBookPath, 'patch');
    if (params) {
      rb.path('book-id', params['book-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `returnBorrowedBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnBorrowedBook(params: {
    'book-id': number;
    context?: HttpContext
  }
): Observable<number> {

    return this.returnBorrowedBook$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation updateArchivedStatus
   */
  static readonly UpdateArchivedStatusPath = '/books/archived/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArchivedStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus$Response(params: {
    'book-id': number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, BookService.UpdateArchivedStatusPath, 'patch');
    if (params) {
      rb.path('book-id', params['book-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateArchivedStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus(params: {
    'book-id': number;
    context?: HttpContext
  }
): Observable<number> {

    return this.updateArchivedStatus$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation findBookById
   */
  static readonly FindBookByIdPath = '/books/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findBookById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBookById$Response(params: {
    'book-id': number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<BookResponse>> {

    const rb = new RequestBuilder(this.rootUrl, BookService.FindBookByIdPath, 'get');
    if (params) {
      rb.path('book-id', params['book-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BookResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findBookById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBookById(params: {
    'book-id': number;
    context?: HttpContext
  }
): Observable<BookResponse> {

    return this.findBookById$Response(params).pipe(
      map((r: StrictHttpResponse<BookResponse>) => r.body as BookResponse)
    );
  }

  /**
   * Path part for operation findAllReturnedBooksByOwner
   */
  static readonly FindAllReturnedBooksByOwnerPath = '/books/returned';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllReturnedBooksByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllReturnedBooksByOwner$Response(params?: {
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PageResponseBorrowedBookResponse>> {

    const rb = new RequestBuilder(this.rootUrl, BookService.FindAllReturnedBooksByOwnerPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageResponseBorrowedBookResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllReturnedBooksByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllReturnedBooksByOwner(params?: {
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<PageResponseBorrowedBookResponse> {

    return this.findAllReturnedBooksByOwner$Response(params).pipe(
      map((r: StrictHttpResponse<PageResponseBorrowedBookResponse>) => r.body as PageResponseBorrowedBookResponse)
    );
  }

  /**
   * Path part for operation findAllBooksByOwner
   */
  static readonly FindAllBooksByOwnerPath = '/books/owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllBooksByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBooksByOwner$Response(params?: {
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PageResponseBookResponse>> {

    const rb = new RequestBuilder(this.rootUrl, BookService.FindAllBooksByOwnerPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageResponseBookResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllBooksByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBooksByOwner(params?: {
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<PageResponseBookResponse> {

    return this.findAllBooksByOwner$Response(params).pipe(
      map((r: StrictHttpResponse<PageResponseBookResponse>) => r.body as PageResponseBookResponse)
    );
  }

  /**
   * Path part for operation findAllBorrowedBooksByOwner
   */
  static readonly FindAllBorrowedBooksByOwnerPath = '/books/borrowed';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllBorrowedBooksByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBorrowedBooksByOwner$Response(params?: {
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PageResponseBorrowedBookResponse>> {

    const rb = new RequestBuilder(this.rootUrl, BookService.FindAllBorrowedBooksByOwnerPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageResponseBorrowedBookResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllBorrowedBooksByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBorrowedBooksByOwner(params?: {
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<PageResponseBorrowedBookResponse> {

    return this.findAllBorrowedBooksByOwner$Response(params).pipe(
      map((r: StrictHttpResponse<PageResponseBorrowedBookResponse>) => r.body as PageResponseBorrowedBookResponse)
    );
  }

}

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

import { FeedbackRequest } from '../models/feedback-request';
import { PageResponseFeedbackResponse } from '../models/page-response-feedback-response';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation saveFeedback
   */
  static readonly SaveFeedbackPath = '/feedbacks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveFeedback()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFeedback$Response(params: {
    context?: HttpContext
    body: FeedbackRequest
  }
): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, FeedbackService.SaveFeedbackPath, 'post');
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
   * To access the full response (for headers, for example), `saveFeedback$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFeedback(params: {
    context?: HttpContext
    body: FeedbackRequest
  }
): Observable<number> {

    return this.saveFeedback$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation findAllFeedbacksByBook
   */
  static readonly FindAllFeedbacksByBookPath = '/feedbacks/book/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllFeedbacksByBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFeedbacksByBook$Response(params: {
    'book-id': number;
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PageResponseFeedbackResponse>> {

    const rb = new RequestBuilder(this.rootUrl, FeedbackService.FindAllFeedbacksByBookPath, 'get');
    if (params) {
      rb.path('book-id', params['book-id'], {});
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
        return r as StrictHttpResponse<PageResponseFeedbackResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllFeedbacksByBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFeedbacksByBook(params: {
    'book-id': number;
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<PageResponseFeedbackResponse> {

    return this.findAllFeedbacksByBook$Response(params).pipe(
      map((r: StrictHttpResponse<PageResponseFeedbackResponse>) => r.body as PageResponseFeedbackResponse)
    );
  }

}

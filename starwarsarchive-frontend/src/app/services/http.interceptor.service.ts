/**
 * Copyright 2023 Nicolas Favre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * http.interceptor.service.ts
 * The HTTP interceptor service to handle request with the backend API
 *
 * @author Nicolas Favre
 * @date 18.05.2023
 * @version 1.0.0
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */

import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {config} from "../config";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  /**
   * Intercept the HTTP request and handle errors
   * @param req: the HTTP request
   * @param next: the HTTP handler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let serverUrl: string = "";
    if (location.hostname === 'localhost') {
      serverUrl = "http://localhost:8080/api/";
    } else {
      serverUrl = config.api_url + "/api/";
    }

    req = req.clone({
      url: serverUrl + req.url
    })

    return next.handle(req)
  }
}

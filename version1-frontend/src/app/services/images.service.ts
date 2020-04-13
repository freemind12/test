import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../shared/image';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg-service.service';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(baseURL + 'images')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MapService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {
  }
}

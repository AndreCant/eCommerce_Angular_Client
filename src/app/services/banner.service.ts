import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { Banner } from '../model/Banner';

const baseUrl = `${AppConstants.SERVICES_BASE_URL}/admin`;

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private httpClient: HttpClient) {}

  getBanners(): Observable<Banner[]>{
    return this.httpClient.get<Banner[]>(`${baseUrl}/banners`);
  }

  getBannerByName(name: string): Observable<Banner[]>{
    return this.httpClient.get<Banner[]>(`${baseUrl}/banner/${name}`);
  }

  createBanner(banner: FormData): Observable<string>{
    return this.httpClient.post<string>(`${baseUrl}/banner`, banner);
  }

  updateBanner(banner: FormData, id: number): Observable<string>{
    return this.httpClient.post<string>(`${baseUrl}/banner/${id}`, banner);
  }

  deleteBanner(id: number): Observable<string>{
    return this.httpClient.delete<string>(`${baseUrl}/banner/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SEARCH_CONFIG } from 'src/search-config';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  index = SEARCH_CONFIG.index;

  constructor(private http: HttpClient) { }

  search(query: any): Observable<any> {

    const body = {
      query: query,
      index: this.index // Make sure you have 'index' defined in your environment
    };

    console.log('Sending to server:', JSON.stringify(body));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.searchUrl, JSON.stringify(body), { headers });
  }
}

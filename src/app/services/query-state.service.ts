


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryStateService {
  private fullTextSearch = new BehaviorSubject<string>('');
  private specificCriteria = new BehaviorSubject<{ [key: string]: any }>({});

  fullTextSearch$ = this.fullTextSearch.asObservable();
  specificCriteria$ = this.specificCriteria.asObservable();

  updateFullTextSearch(text: string) {
    this.fullTextSearch.next(text);
  }

  updateSpecificCriteria(criteria: { [key: string]: any }) {
    this.specificCriteria.next(criteria);
  }
}

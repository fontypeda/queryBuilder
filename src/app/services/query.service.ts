import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private querySubject = new BehaviorSubject<any>({ query: { match_all: {} } });
  private pageSize = 10; // Setzen Sie die Seitengröße

  setQuery(queryData: any, page: number = 0) {
    let query = this.buildQuery(queryData);
    this.querySubject.next(query);
  }

  resetQuery() {
    this.querySubject.next({ query: { match_all: {} } });
  }

  getQuery() {
    return this.querySubject.asObservable();
  }
  
  private buildQuery(queryData: any) {
    let esQuery: any = {

      query: {
        bool: {
          must: []
        }
      }
    };
  
    if (queryData.fullTextSearch && queryData.fullTextSearch.trim() !== '') {
      esQuery.query.bool.must.push({
        query_string: {
          query: queryData.fullTextSearch
        }
      });
    }
  
    if (queryData.specificFieldGroups && queryData.specificFieldGroups.length > 0) {
      queryData.specificFieldGroups.forEach((group: any) => {
        if (group.specificField && group.specificFieldSearch.trim() !== '') {
          let match: any = {};
          match[group.specificField] = group.specificFieldSearch;
          esQuery.query.bool.must.push({ match });
        }
      });
    }
  
    if (esQuery.query.bool.must.length === 0) {
      esQuery.query = { match_all: {} };
    }
  
    return esQuery;
  }

  // ...
}
  





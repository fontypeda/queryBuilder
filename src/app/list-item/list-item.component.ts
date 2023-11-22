import { Component, OnInit } from '@angular/core';
import { QueryService } from '../services/query.service';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  results: any;
  query: any;

  constructor(private queryService: QueryService, private apiService: ApiService) {}

  ngOnInit() {
    this.queryService.getQuery().subscribe(query => {
      this.query = query;
      this.apiService.search(query).subscribe(data => {
        this.results = data;
        console.log(this.results);
      });
    });
  }
}



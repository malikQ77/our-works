import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-works-items',
  templateUrl: './works-items.component.html',
  styleUrls: ['./works-items.component.css']
})
export class WorksItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  worksItemsRouter = [
    {
      routeURL: '/hey',
      routeName: 'Name p1',
      routeDesc: 'desc'
    },
    {
      routeURL: '/hello',
      routeName: 'name p2',
      routeDesc: 'desc'
    },
  ];
}

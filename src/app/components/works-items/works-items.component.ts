import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { CookieService } from 'ngx-cookie-service';
import { BackgroundColorsMapService } from "../../services/background-colors-map.service";
interface BackgroundState {
  backgroundColor: string
}

@Component({
  selector: 'app-works-items',
  templateUrl: './works-items.component.html',
  styleUrls: ['./works-items.component.css'],
})
export class WorksItemsComponent implements OnInit {

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
    {
      routeURL: '/hello',
      routeName: 'name p2',
      routeDesc: 'desc'
    },
    {
      routeURL: '/hello',
      routeName: 'name p2',
      routeDesc: 'desc'
    },
    {
      routeURL: '/hello',
      routeName: 'name p2',
      routeDesc: 'desc'
    },
  ];

  backgroundColor: string = '';

  constructor(private store: Store<BackgroundState>,
    private cookieService: CookieService,
    private backgroundColorsMapService: BackgroundColorsMapService) {
    
      this.store.select('backgroundColor').subscribe(background => {
      this.backgroundColor = backgroundColorsMapService.getPrimaryColor(this.cookieService.get('background'));
    });
    
  }

  ngOnInit(): void {
  }

}

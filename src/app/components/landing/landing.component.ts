import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { CookieService } from 'ngx-cookie-service';
import { BackgroundColorsMapService } from "../../services/background-colors-map.service";
interface BackgroundState {
  backgroundColor: string
}
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

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
  previewCV(fileName: string){
    window.open('assets/cvs/' + fileName)
  }

}

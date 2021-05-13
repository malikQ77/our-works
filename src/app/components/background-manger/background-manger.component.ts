import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { CookieService } from 'ngx-cookie-service';


interface BackgroundState {
  backgroundColor: string
}

@Component({
  selector: 'app-background-manger',
  templateUrl: './background-manger.component.html',
  styleUrls: ['./background-manger.component.css'],
})
export class BackgroundMangerComponent implements OnInit {

  backgroundColor: string = '';
  showBackgroundManger = false;
  constructor(private store: Store<BackgroundState>, private cookieService: CookieService) {
    this.store.select('backgroundColor').subscribe(background => {
      let cookieValue = this.cookieService.get('background');
      if(!cookieValue){
        this.cookieService.set('background', background);
      }else if(cookieValue && background != 'linear-gradient(to right, #642B73, #C6426E)'){
        this.cookieService.set('background', background);
      }
      this.backgroundColor = background;
      document.body.style.backgroundImage =  this.cookieService.get('background');
    });
  }

  ngOnInit(): void {
  }

  handleShowBackgroundManger() {
    this.showBackgroundManger = !this.showBackgroundManger;
  }

  background1() {
    this.store.dispatch({ type: 'background1' })
  }
  background2() {
    this.store.dispatch({ type: 'background2' })
  }
  background3() {
    this.store.dispatch({ type: 'background3' })
  }
  background4() {
    this.store.dispatch({ type: 'background4' })
  }
}

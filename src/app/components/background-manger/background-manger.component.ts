import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
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
  backgroundColor$: Observable<string>;
  constructor(private store: Store<BackgroundState>, private cookieService: CookieService) {
    this.backgroundColor$ = this.store.select('backgroundColor');
    this.backgroundColor$.subscribe(background => {
      this.backgroundColor = background;
      
      if(!this.cookieService.check('background')){
        this.cookieService.set('background', background);
      }
      if(this.cookieService.get('background') == background){
        document.body.style.backgroundImage = background;
      }else{
        document.body.style.backgroundImage = this.cookieService.get('background')
      }
    })
  }

  ngOnInit(): void {
  }

  handleShowBackgroundManger() {
    this.showBackgroundManger = !this.showBackgroundManger;
  }

  background1() {
    this.cookieService.set('background', this.backgroundColor);
    this.store.dispatch({ type: 'background1' })
  }
  background2() {
    this.cookieService.set('background', this.backgroundColor);
    this.store.dispatch({ type: 'background2' })
  }
  background3() {
    this.cookieService.set('background', this.backgroundColor);
    this.store.dispatch({ type: 'background3' })
  }
  background4() {
    this.cookieService.set('background', this.backgroundColor);
    this.store.dispatch({ type: '' })
  }
}

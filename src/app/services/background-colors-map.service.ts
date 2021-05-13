import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class BackgroundColorsMapService {

  colors = [
    { background: 'linear-gradient(to right, #41295a, #2F0743)', primary: "#41295a" },
    { background: 'linear-gradient(to right, #4568DC, #B06AB3)', primary: "#4568DC" },
    { background: 'linear-gradient(to right, #CB356B, #BD3F32)', primary: "#CB356B" },
    { background: 'linear-gradient(to right, #642B73, #C6426E)', primary: "#642B73" },
    { background: 'linear-gradient(to right, #606c88, #3f4c6b)', primary: '#606c88' }
  ];

  constructor() { }

  getPrimaryColor(color: string) {
    this.colors.find(colorsRow => {
      if (colorsRow.background == color) {
        color = colorsRow.primary
      }
    });
    return color;
  }
}

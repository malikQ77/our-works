import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { BackgroundColorsMapService } from '../../services/background-colors-map.service';
import { async } from 'rxjs';
interface BackgroundState {
  backgroundColor: string;
}
@Component({
  selector: 'app-convert-multi-files-to-base64',
  templateUrl: './convert-multi-files-to-base64.component.html',
  styleUrls: ['./convert-multi-files-to-base64.component.css']
})
export class ConvertMultiFilesToBase64Component implements OnInit {

  selectedFiles: File[] = [];
  convertedFiles: any[] = [];
  acceptedFileTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
  ];
  errorMsg = '';
  infoMsg = '';
  backgroundColor: string = '';

  constructor(
    private store: Store<BackgroundState>,
    private cookieService: CookieService,
    private backgroundColorsMapService: BackgroundColorsMapService
  ) {
    this.store.select('backgroundColor').subscribe((background) => {
      this.backgroundColor = backgroundColorsMapService.getPrimaryColor(
        this.cookieService.get('background')
      );
    });
  }

  ngOnInit(): void {
  }

  onFileChanged(event: any) {
    this.errorMsg = '';
    for (let i = 0; i < event.target.files.length; i++) {
      if (this.selectedFiles.length < 15) {
        if (this.acceptedFileTypes.includes(event.target.files[i].type)) {
          this.selectedFiles.push(event.target.files[i])
        } else {
          this.errorMsg = "Unaccepted file type for: " + event.target.files[i].name;
        }
      } else {
        this.errorMsg = "max. files number is 15";
      }
    }
  }

  saveConvertedFiles(file: any) {
    this.convertedFiles.push(file.toString());
    console.log(this.convertedFiles.length)
  }
  covertFile() {
    this.convertedFiles = [];
    for (let i = 0; i < this.selectedFiles.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFiles[i]);
      reader.onload = () => {
        this.saveConvertedFiles(reader.result);
      }
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  updateSize(size: any) {
    var sOutput = size + " bytes";
    for (var aMultiples = ["K", "M", "G", "T", "P", "E", "Z", "Y"], nMultiple = 0, nApprox = size / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
      sOutput = nApprox.toFixed(1) + aMultiples[nMultiple];
    }
    return sOutput;
  }


  async viewFile(file: any) {
    const blob = new Blob(
      [file],
      { type: file.type },
    );
    const href = await URL.createObjectURL(blob);
    window.open(href);
  }
  deleteFile(file: any) {
    this.selectedFiles.forEach((fileFromArray, index) => {
      if (file == fileFromArray) {
        this.selectedFiles.splice(index, 1)
      }
    })
  }
  async downloadFile(val: any) {

    const blob = new Blob([val], { type: 'plain/text' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

}

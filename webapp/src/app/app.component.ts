import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('uploadForm') uploadForm!: ElementRef<HTMLFormElement>;

  public doSomething() {
    console.log('implement solo input')
  }

  public async uploadFiles(event: Event) {
    event.preventDefault();
    const res = await fetch('http://localhost:3000/files', {
      method: 'POST',
      body: new FormData(this.uploadForm.nativeElement)
    });
    const body = await res.json();
    console.log('Response from upload', body);

/*     formElem.onsubmit = async e => {
      e.preventDefault();

      const body = await res.json();
      await fetchFiles();
    }; */

  }


}

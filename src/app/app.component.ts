import { Component, OnInit } from '@angular/core';
import { BUILDINFO } from '../environments/meta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  bi = BUILDINFO;
  DATA = 'Message to be hashed';
  hashd;
  private worker: Worker;
  ngOnInit() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker('./hashr.worker', { type: 'module' });
      this.worker.onmessage = (event) => {
        this.hashd = event.data;
      }
      this.worker.postMessage(this.DATA);
    } else {
      this.hashd = {
        data: this.DATA,
        md5: 'webworker unsupported browser'
      };
    }
  }
}

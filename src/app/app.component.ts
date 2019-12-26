import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hashd;
  private worker: Worker;
  ngOnInit() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker('./hashr.worker', { type: 'module' });
      this.worker.onmessage = (event) => {
        this.hashd = event.data;
      }
      this.worker.postMessage('Message to be hashed');
    }
  }
}

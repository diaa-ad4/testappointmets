import {Component, OnInit} from '@angular/core';
// import moment form 'moment';
import * as moment from 'moment';
import * as momentzone from 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Test';

  ngOnInit(): void {
  }

}

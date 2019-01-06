import { Component, OnInit, Input } from '@angular/core';
import { ApiItem } from '../types';

@Component({
  selector: 'app-api-demo',
  templateUrl: './api-demo.component.html',
  styleUrls: ['./api-demo.component.scss']
})
export class ApiDemoComponent implements OnInit {

  @Input()
  className: string;

  @Input()
  type: string;

  @Input()
  description: string;

  @Input()
  selector: string;

  @Input()
  inputs: ApiItem[] = [];

  constructor() { }

  ngOnInit() {
  }

}

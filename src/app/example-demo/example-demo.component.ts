import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-example-demo',
  templateUrl: './example-demo.component.html',
  styleUrls: ['./example-demo.component.scss']
})
export class ExampleDemoComponent implements OnInit {

  @Input()
  heading = '';

  @Input()
  code = '';

  constructor() { }

  ngOnInit() {
  }

}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ApiItem {
  name: string;
  type?: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-api-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-demo.component.html',
  styleUrls: ['./api-demo.component.css']
})
export class ApiDemoComponent {
  @Input() className: string = '';
  @Input() selector: string = '';
  @Input() description: string = '';
  @Input() inputs: ApiItem[] = [];
  // Outputs and Methods can be added later if needed, following the same ApiItem structure
  // @Input() outputs: ApiItem[] = [];
  // @Input() methods: ApiItem[] = [];

  constructor() {}

  // ngOnInit removed as apiItems will now be directly passed as 'inputs'
}

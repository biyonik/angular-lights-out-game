import { Component, computed, input, InputSignal, OnInit } from "@angular/core";

@Component({
  standalone: true,
  selector: 'cell',
  template: `
    <td [class]="computedClass()" (click)="handleClick()"></td>
  `,
  styles: [`

  `]
})
export default class CellComponent implements OnInit {
  isLit: InputSignal<boolean> = input<boolean>(false);
  key: InputSignal<string | undefined> = input<string | undefined>();

  

  constructor() { }

  ngOnInit(): void { }

  computedClass = computed(() => {
    var cls = this.isLit() ? `Cell-lit` : '';
    return 'Cell ' + cls;
  })

  handleClick() { }
}

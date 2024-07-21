import { Component, computed, input, InputSignal, OnInit, output } from "@angular/core";

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
  coordinates: InputSignal<string | undefined> = input<string | undefined>();
  clickedCell = output<string>();


  constructor() { }

  ngOnInit(): void { }

  computedClass = computed(() => {
    var cls = this.isLit() ? `Cell-lit` : '';
    return 'Cell ' + cls;
  })

  handleClick() {
    this.clickedCell.emit(this.coordinates()!);
  }
}

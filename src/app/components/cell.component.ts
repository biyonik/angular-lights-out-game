import { Component, computed, input, InputSignal, OnInit } from "@angular/core";

@Component({
  standalone: true,
  selector: 'cell',
  template: `
    <td [class]="computedClass()" (click)="handleClick()"></td>
  `,
  styles: [`
    :host .Cell {
      width: 30px;
      height: 30px;
      border: 1px solid black;
      transition: background-color 0.3s ease-in-out;
      background-color: white;
      user-select: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
    }

    :host .Cell-lit {
      background-color: black;
    }
  `]
})
export default class CellComponent implements OnInit {
  isLit: InputSignal<boolean> = input<boolean>(false);

  constructor() { }

  ngOnInit(): void { }

  computedClass = computed(() => {
    return 'Cell ' + this.isLit() ? `Cell-lit` : '';
  })

  handleClick() { }
}

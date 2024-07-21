import { Component, effect, input, InputSignal, OnInit, signal, WritableSignal } from "@angular/core";
import CellComponent from "./cell.component";
import { NgFor } from "@angular/common";

@Component({
  standalone: true,
  selector: 'board',
  imports: [CellComponent, NgFor],
  template: `
    @if(this.hasWon()) {
      <h1>Congratulations! You've won!</h1>
    }
    <table class="Board">
      <tbody>
        @for(row of board(); track row; let i = $index) {
          <tr>
            @for(cell of row; track j; let j = $index) {
              @let coord = i + '-' + j;
              <cell
                [isLit]="cell"
                [coordinates]="coord"
                (clickedCell)="handleClickedCell($event)"
              />
            }
          </tr>
        }
      </tbody>
    </table>
  `
})
export default class BoardComponent implements OnInit {
  nCols: InputSignal<number> = input<number>(5);
  nRows: InputSignal<number> = input<number>(5);
  chanceLightStartsOn: InputSignal<number> = input<number>(0.25);

  clickedCellSignal = signal<string | undefined>(undefined);
  boardSignal: WritableSignal<boolean[][]> = signal([])
  hasWonSignal: WritableSignal<boolean> = signal(false);

  board = this.boardSignal.asReadonly();
  hasWon = this.hasWonSignal.asReadonly();
  clickedCell = this.clickedCellSignal.asReadonly();


  constructor() {
    effect(() => {
      const board = Array.from({ length: this.nRows() }, () => Array.from({ length: this.nCols() }, () => Math.random() < this.chanceLightStartsOn()));
      this.boardSignal.set(board);
      this.hasWonSignal.set(false);
    }, {
      allowSignalWrites: true
    })
  }

  ngOnInit(): void {

  }

  handleClickedCell(event: string) {
    this.clickedCellSignal.set(event);
    let [y, x] = this.clickedCell()!.split('-').map(Number);
    this.flipCell(y, x);
    this.flipCell(y, x - 1);
    this.flipCell(y, x + 1);
    this.flipCell(y - 1, x);
    this.flipCell(y + 1, x);

    const allCellsLit = this.board().every(row => row.every(cell => cell));
    this.hasWonSignal.set(allCellsLit);
  }

  private flipCell(y: number, x: number) {
    if (x >= 0 && x < this.nCols() && y >= 0 && y < this.nRows()) {
      this.boardSignal.update(board => {
        const newBoard = board.map((row, i) => {
          if (i === y) {
            return row.map((cell, j) => {
              if (j === x) {
                return !cell
              }
              return cell
            })
          }
          return row
        })
        return newBoard
      })
    }
  }

}

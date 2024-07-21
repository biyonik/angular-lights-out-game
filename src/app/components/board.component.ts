import { Component, effect, input, InputSignal, OnInit, signal, WritableSignal } from "@angular/core";
import CellComponent from "./cell.component";
import { NgFor } from "@angular/common";

@Component({
  standalone: true,
  selector: 'board',
  imports: [CellComponent, NgFor],
  template: `
    <table class="Board">
      <tbody>
        @for(row of board(); track row; let i = $index) {
          <tr>
            @for(cell of row; track cell; let j = $index) {
              @let coord = i + '-' + j;
              <cell
                [isLit]="cell"
                [key]="coord"
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

  boardSignal: WritableSignal<boolean[][]> = signal([])
  hasWonSignal: WritableSignal<boolean> = signal(false);

  board = this.boardSignal.asReadonly();
  hasWon = this.hasWonSignal.asReadonly();


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

  flipCellsAround(coordinates: string) {

    let [y, x] = coordinates.split('-').map(Number);

    this.flipCell(y, x);

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

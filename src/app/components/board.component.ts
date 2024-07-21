import { Component, input, InputSignal, OnInit, signal, WritableSignal } from "@angular/core";
import CellComponent from "./cell.component";
import { NgFor } from "@angular/common";

@Component({
  standalone: true,
  selector: 'board',
  imports: [CellComponent, NgFor],
  template: `
    <table class="Board">
      <tbody>
      </tbody>
    </table>
  `,
  styles: [`
    .Board {
      border-collapse: collapse;
      width: 300px;
      border: 1px solid black;
      text-align: center;
      margin: 0 auto;
      padding: 0;
      margin-top: 20px;
      margin-bottom: 20px;
      font-family: Arial, sans-serif;
      font-size: 18px;
      user-select: none;
      cursor: pointer;
    }
  `]
})
export default class BoardComponent implements OnInit {
  nCols: InputSignal<number> = input.required<number>();
  nRows: InputSignal<number> = input.required<number>();

  boardSignal: WritableSignal<boolean[][]> = signal([])
  hasWonSignal: WritableSignal<boolean> = signal(false);

  board = this.boardSignal.asReadonly();
  hasWon = this.hasWonSignal.asReadonly();


  constructor() { }

  ngOnInit(): void { }

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

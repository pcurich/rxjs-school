import { displayLog } from "./utils";
import { fromEvent } from "rxjs";
import { tap, map, filter, first, scan, takeWhile, startWith, endWith, distinct, distinctUntilChanged } from "rxjs/operators";

export default () => {
  const grid = document.getElementById("grid");

  // distinct: Valores distintos a los anteriores, no deja pasar un valor si ya paso antes
  const clickDistinct$ = fromEvent(grid, "click").pipe(
    map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)]),
    takeWhile(([col, _]) => col != 0),
    tap((val) => console.log(`cell: [${val}]`)),
    map(([col, row]) => col + row),
    tap((val) => console.log(`Sum of col + row is: ${val}]`)),
    distinct()
    // distinct(([row, col]) => { `${row}-${col}]`; })
  );
  clickDistinct$.subscribe((data) => displayLog(`${data}`));

  // distinctUntilChanged: Valores distintos a los anteriores, valores repetidos consecutivos
  const clickDistinctUntilChanged$ = fromEvent(grid, "click").pipe(
    map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)]),
    takeWhile(([col, _]) => col != 0),
    tap((val) => console.log(`cell: [${val}]`)),
    distinctUntilChanged((C1, C2) => {
      C1[0] == C2[0] && C1[1] == C2[1];
    })
  );
  clickDistinctUntilChanged$.subscribe((data) => displayLog(`${data}`));
};

import { displayLog } from "./utils";
import { fromEvent } from "rxjs";
import { tap, map, filter, first, scan, takeWhile, startWith, endWith } from "rxjs/operators";

export default () => {
  const grid = document.getElementById("grid");

  // startWith: modifica el observable para emitir ciertos valores de forma previa a cualquier evento del observable origianl
  const clickStartWithe$ = fromEvent(grid, "click").pipe(
    map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)]),
    takeWhile(([col, _]) => col != 0),
    tap((val) => console.log(`cell: [${val}]`)),
    startWith("Grid dimensions: ", "10x10"),
    endWith("Game finish", "Bye")
  );
  clickStartWithe$.subscribe((data) => displayLog(`${data}`));
};

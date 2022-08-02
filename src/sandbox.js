import { displayLog } from "./utils";
import { fromEvent } from "rxjs";
import { tap, map, filter, first, scan, takeWhile, reduce } from "rxjs/operators";

export default () => {
  const grid = document.getElementById("grid");

  // reduce: recibe un acumulador y el valor actual y emite un unico evento al completarse el stream
  const clickReduce$ = fromEvent(grid, "click").pipe(
    map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)]),
    takeWhile(([col, _]) => col != 0),
    tap((val) => console.log(`cell: [${val}]`)),
    reduce(
      (accumulated, current) => {
        return {
          clicks: accumulated.clicks + 1,
          cells: [...accumulated.cells, current],
        };
      },
      { clicks: 0, cells: [] }
    )
  );
  clickReduce$.subscribe((data) => displayLog(`${data.clicks} clicks: ${JSON.stringify(data.cells)}`));

  // reduce: recibe un acumulador y el valor actual y emite varios eventos al completarse el stream
  const clickScan$ = fromEvent(grid, "click").pipe(
    map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)]),
    takeWhile(([col, _]) => col != 0),
    tap((val) => console.log(`cell: [${val}]`)),
    scan(
      (accumulated, current) => {
        return {
          clicks: accumulated.clicks + 1,
          cells: [...accumulated.cells, current],
        };
      },
      { clicks: 0, cells: [] }
    )
  );
  clickScan$.subscribe((data) => displayLog(`${data.clicks} clicks: ${JSON.stringify(data.cells)}`));
};

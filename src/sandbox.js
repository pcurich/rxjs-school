import { displayLog } from "./utils";
import { fromEvent } from "rxjs";
import { tap, map, filter, first, take, takeWhile, last } from "rxjs/operators";

export default () => {
  const grid = document.getElementById("grid");

  //takeWhile: cuantos elementos quieres sentir mientras se cumpla una condicion
  //last: La ultima posicion
  // takelast(x): las ultimas x veces
  // skip: omite cierta cantidad de elementos al inicio
  const clickTakeWhileLast$ = fromEvent(grid, "click").pipe(
    tap((val) => console.log("ANTES DE MAP:", val)),
    map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)]),
    tap((val) => console.log("ANTES DE TAKEWHILE:", val)),
    takeWhile(([col, row]) => col > 3),
    tap((val) => console.log("DESPUES DE TAKEWHILE:", val)),
    last()
  );
  clickTakeWhileLast$.subscribe((data) => displayLog(`clickTakeWhileLast: ${data}`));
};

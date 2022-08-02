import { displayLog } from "./utils";
import { fromEvent } from "rxjs";
import { tap, map, filter, first, take, takeWhile } from "rxjs/operators";

export default () => {
  const grid = document.getElementById("grid");

  //first : Solo traemos el primer valor y parece que despues lo desuscribe
  const clickFirst$ = fromEvent(grid, "click").pipe(
    tap((val) => console.log("ANTES DE MAP:", val)),
    map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)]),
    tap((val) => console.log("ANTES DE FIRST:", val)),
    first()
  );
  clickFirst$.subscribe((data) => displayLog(`clickFirst: ${data}`));

  //take: cuantos elementos quieres sentir antes de cerrar el stream
  const clickTake$ = fromEvent(grid, "click").pipe(
    tap((val) => console.log("ANTES DE MAP:", val)),
    map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)]),
    tap((val) => console.log("ANTES DE FIRST:", val)),
    take(5)
  );
  clickTake$.subscribe((data) => displayLog(`clickTake: ${data}`));

  //takeWhile: cuantos elementos quieres sentir mientras se cumpla una condicion
  const clickTakeWhile$ = fromEvent(grid, "click").pipe(
    tap((val) => console.log("ANTES DE MAP:", val)),
    map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)]),
    tap((val) => console.log("ANTES DE FIRST:", val)),
    takeWhile(([col, row]) => col > 3)
  );
  clickTakeWhile$.subscribe((data) => displayLog(`clickTakeWhile: ${data}`));
};

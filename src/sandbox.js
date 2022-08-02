import { displayLog } from "./utils";
import { fromEvent } from "rxjs";
import { mapTo, map, filter } from "rxjs/operators";

export default () => {
  const grid = document.getElementById("grid");
  const click$ = fromEvent(grid, "click");
  const subscription = click$.subscribe((data) => console.log(data));

  //MapTo : cada elemento que entra lo transforma devolviendo siempre el mismo valor
  const clickMapTo$ = fromEvent(grid, "click").pipe(mapTo("CLICK"));
  clickMapTo$.subscribe((data) => displayLog(data)).unsubscribe();

  //Map : cada elemento que entra lo transforma
  const clickMap$ = fromEvent(grid, "click").pipe(
    map((val) => [{ X: val.offsetX, Y: val.offsetY, P_X: Math.floor(val.offsetX / 50), P_Y: Math.floor(val.offsetY / 50) }])
  );
  clickMap$.subscribe((data) => displayLog(data)).unsubscribe();

  //Filter : añade un predicado para hacer un filtro
  const clickFilter$ = fromEvent(grid, "click").pipe(
    map((val) => [Math.floor(val.offsetX / 50), Math.floor(val.offsetY / 50)]),
    filter((val) => (val[0] + val[1]) % 2 != 0)
  );
  clickFilter$.subscribe((data) => displayLog(data));
};

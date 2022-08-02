import { displayLog } from "./utils";
import { interval, timer } from "rxjs";

export default () => {
  //INTERVAL: Sirve para emitir secuencia de valores cada cierto intervalo

  const source1 = interval(500);
  const subscription1 = source1.subscribe((data) => {
    displayLog(`1-${data}`);
  });

  //termino el intervalo
  timer(3000).subscribe(() => {
    subscription1.unsubscribe();
  });
  //   setTimeout(() => {
  //     subscription1.unsubscribe();
  //   }, 3000);

  //tarda 4 seg en empezar y se repite cada 0.1 seg
  const source2 = timer(4000, 100);
  const subscription2 = source2.subscribe((data) => {
    displayLog(`2-${data}`);
  });
  timer(6000).subscribe(() => {
    subscription2.unsubscribe();
  });
};

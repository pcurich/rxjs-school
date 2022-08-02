import { displayLog } from "./utils";
import { of, range } from "rxjs";

export default () => {
  //of permite emitir una secuencia variable de objetos de distinta tipologia
  const source1 = of(1, 2, 3, 4, 5, 6);
  const subscribe1 = source1.subscribe(displayLog);

  const source2 = of(
    [1, 2, 3, 4, 5, 6],
    "Hello World",
    {
      foo: "bar",
      id: 1,
    },
    function sayHello() {
      return "HI!";
    }
  );

  const subscribe2 = source2.subscribe(displayLog);

  //RANGE: secuencia ordenada de numero, desde y cuantos
  const source3 = range(3, 10);
  const subscribe3 = source3.subscribe(displayLog);
};

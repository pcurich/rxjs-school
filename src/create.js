import { displayLog } from "./utils";
import { from } from "rxjs";

export default () => {
  //from sirver para crear observables a partir de arrays y a tambien a travez de promises

  const myArray = [1, 2, 3];
  const myString = "Hello";
  const myPromise = new Promise((resolve) =>
    setTimeout(() => {
      resolve("World");
    }, 2000)
  );

  const observable1 = from(myArray);
  const observable2 = from(myString);
  const observable3 = from(myPromise);

  //version resumida del .next del observable
  const suscription1 = observable1.subscribe(displayLog);
  const suscription2 = observable2.subscribe(displayLog);
  const suscription3 = observable3.subscribe(displayLog);
};

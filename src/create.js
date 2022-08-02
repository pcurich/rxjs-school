import { displayLog } from "./utils";
import { Observable } from "rxjs";

export default () => {
  //El metodo next emite eventos desde el observable al observer
  const hello = new Observable((observer) => {
    //sincrono
    observer.next("Hello");
    //asyncrono
    setTimeout(() => {
      observer.next("World");
    }, 2000);
  });

  const subscribe = hello.subscribe((ev) => {
    displayLog(ev);
  });
};

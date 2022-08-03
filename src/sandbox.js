import { updateDisplay } from "./utils";
import { fromEvent, Subject, BehaviorSubject } from "rxjs";
import { map, tap, share } from "rxjs/operators";

export default () => {
  /** start coding */

  //subject es un tipo especial de observable con 3 propiedades:
  //* Puede hacer multi cast de sus valores hacia varios observadores, osea es un hot observable
  //* Ademas de ser un observable tambien es un observador, tiene los metodos subscribe y pipe,
  //tambien tiene los metodos next, complete y error
  //* Es que actua como un distribuidor (2 anteriores)
  const progressBar = document.getElementById("progress-bar");
  const docElement = document.documentElement;

  //function to update progress bar width on view
  const updateProgressBar = (percentage) => {
    progressBar.style.width = `${percentage}%`;
  };

  //observable that returns scroll (from top) on scroll events
  const scroll$ = fromEvent(document, "scroll").pipe(
    map(() => docElement.scrollTop),
    tap((evt) => console.log("[scroll]: ", evt))
  );

  //observable that returns the amount of page scroll progress
  const scrollProgress$ = scroll$.pipe(
    map((evt) => {
      const docHeight = docElement.scrollHeight - docElement.clientHeight;
      return (evt / docHeight) * 100;
    })
    // share()
  );

  //   const scrollProgressHot$ = new Subject();
  const scrollProgressHot$ = new BehaviorSubject(-3);
  scrollProgress$.subscribe(scrollProgressHot$);

  //subscribe to scroll progress to paint a progress bar
  const subscription = scrollProgressHot$.subscribe(updateProgressBar);

  //subscribe to display scroll progress percentage
  const subscription2 = scrollProgressHot$.subscribe((val) => updateDisplay(`${Math.floor(val)} %`));

  //   scrollProgressHot$.next(-1); //estoy forzando el que tenga variables iniciales
  //const scrollProgressHot$ = new BehaviorSubject(-1);

  ///se guarda el ultimo evento emitido
  console.log("Scroll inirial state: ", scrollProgressHot$.value);
  /** end coding */
};

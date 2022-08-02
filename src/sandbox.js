import { updateDisplay } from "./utils";
import { fromEvent } from "rxjs";
import { map, tap, share } from "rxjs/operators";

export default () => {
  //share: me ayuda a no tener varias instancias de un observable.
  //Convierte mi cold observable en un hot observable
  //osea es un observable que comparte una sola instancia con sus suscripciones
  /** start coding */
  const progressBar = document.getElementById("progress-bar");
  const docElement = document.documentElement;
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
    }),
    share()
  );

  //subscribe to scroll progress to paint a progress bar
  const subscription = scrollProgress$.subscribe(updateProgressBar);
  const subscription2 = scrollProgress$.subscribe((val) => updateDisplay(`${Math.floor(val)}%`));

  /** end coding */
};

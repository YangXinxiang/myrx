import {timer, from, forkJoin} from "rxjs";
// import {} from "rxjs/operators";
import log from "../../../util";
/**
 * 练习forkJoin
 */
export default function testForkJoin(){
    log(`testForkJoin :: enter.`);
    const source1$ = timer(2000);
    const promise = new Promise((resolve, reject)=>{
        log(`testForkJoin :: new Promise enter...`);
        setTimeout(()=>{
            // resolve("Hello, promise~~");
            reject("Hello, promise~~");
        },1000)
    })
    const source2$ = from(promise);
    const newData$ = forkJoin(source1$, source2$);
    const subscription  = newData$.subscribe(
        value => log(`testForkJoin :: in next, value = ${value}`),
        error => log(`testForkJoin :: in error, error = ${error}`),
        () => log(`testForkJoin :: in complete~~`),
    );

    setTimeout(()=>{
        log(`testForkJoin :: will unsubscribe`);
        subscription.unsubscribe();
    }, 5000);
}
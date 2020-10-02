/**
 * 练习和测试第7章，过滤类操作符。
 * filter
 */
import {of, interval, range, timer, Observable, fromEvent} from "rxjs";
import {filter, first, take, takeLast, takeUntil, takeWhile} from "rxjs/operators";
import log from "../../../util";
export default function testTake() {
    log(`testTake :: enter.`);
    // testTake1();  
    // testLast(); 
    // testTakeWhile();
    // testTakeWhile2();

    // testTakeUntil();
    countClickTimes();
}

function testTake1(){
    log(`testTake1 :: enter.`);
    // const source$ = of(9,12,25,16,30);
    const source$ = interval(500);
    const rst$ =   source$.pipe(
        take(3)
    )  
    rst$.subscribe(
        value => log(`testTake1 :: in next, value = ${value}`),
        error => log(`testTake1 :: in error, error = ${error}`),
        () => log(`testTake1 :: in complete`),
    )
}

function testLast(){
    log(`testLast :: enter.`);
    // const source$ = of(9,12,25,16,30);
    const source$ = interval(500).pipe(take(6))
    const rst$ =   source$.pipe(
        takeLast(1)
    )  
    rst$.subscribe(
        value => log(`testLast :: in next, value = ${value}`),
        error => log(`testLast :: in error, error = ${error}`),
        () => log(`testLast :: in complete`),
    )
}

function testTakeWhile(){
    log(`testTakeWhile :: enter.`);
    const source$ = range(6,30)
    const rst$ =   source$.pipe(takeWhile((value,index) =>{
        return value <10;
    }))
    rst$.subscribe(
        value => log(`testTakeWhile :: in next, value = ${value}`),
        error => log(`testTakeWhile :: in error, error = ${error}`),
        () => log(`testTakeWhile :: in complete`),
    )
}

function testTakeWhile2(){
    log(`testTakeWhile2 :: enter.`);
    const source$ = interval(500);
    const controller$ = timer(3000);
    const rst$ = source$.pipe(
        // takeUntil(controller$);
        takeWhile(x => x<6)
    )

    rst$.subscribe(
        value => log(`testTakeWhile2 :: in next, value = ${value}`),
        error => log(`testTakeWhile2 :: in error, error = ${error}`),
        () => log(`testTakeWhile2 :: in complete`),
    )
}

function testTakeUntil(){
    log(`testTakeUntil :: enter.`);
    const source$ = interval(500);
    const controller$ = new Observable((observer)=>{
        setTimeout(()=>{
            // observer.error("error~~~");
            observer.next(1);
            
            observer.complete();
        },3000)
    });
    const rst$ = source$.pipe(
        takeUntil(controller$)      
    )

    rst$.subscribe(
        value => log(`testTakeUntil :: in next, value = ${value}`),
        error => log(`testTakeUntil :: in error, error = ${error}`),
        () => log(`testTakeUntil :: in complete`),
    )
}

function countClickTimes(){
    log(`countClickTimes :: enter.`);
    let count = 0;
    const event$ = fromEvent(document.querySelector("#myBtn66"), "click");
    const timer$ = timer(5000);
    const rst$ = event$.pipe( takeUntil(timer$) );
    rst$.subscribe(
        value => {
            count ++ ;
            log(`countClickTimes :: in next, count = ${count}`);
        },
        error => log(`countClickTimes :: in error, error = ${error}`),
        () => log(`countClickTimes :: in complete`),
    )
}
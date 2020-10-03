/**
 * 再练习一下repeatWhen
 * 2020.09.21
 */
import {of, timer, Observable, interval} from "rxjs";
import {repeat, repeatWhen, delay, takeWhile, takeUntil} from "rxjs/operators";
import log from "../../../util";
export default function testRepeatWhen3(){
    log(`testRepeatWhen3 :: enter.`);
    testRepeatWhen3_1();
    testTakeWhile();

    testTakeUntil();

}

function testRepeatWhen3_1(){
    log(`testRepeatWhen3_1 :: enter.`);
    const source$ = of(6,9,12);
    const notifier$ = (notification$)=>{
        // return notification$.pipe(delay(3000))
        return new Observable((observer)=>{
            observer.next(0);
            observer.complete();
        });
        //return timer(2000);
    }
    const rst$ = source$.pipe( repeatWhen(notifier$) );
    
    rst$.subscribe(
        value => log(`testRepeatWhen3_1 :: in next, value = ${value}`),
        error => log(`testRepeatWhen3_1 :: in next, error = ${error}`),
        () => log(`testRepeatWhen3_1 :: in complete`),
    )
}
/**
 * takeUntil，接收一个操作符notifier$做参数，只要notifier$完结或者有数据突出，立即停止接收上游source$数据。
 */
function testTakeUntil() {
    log(`testTakeUntil :: enter.`);
    const source$ = interval(1500);
    const notifier$ = timer(500);    
    const rst$ = source$.pipe( takeUntil(notifier$) );
    rst$.subscribe(
        value => log(`testTakeUntil :: in next, value = ${value}`),
        error => log(`testTakeUntil :: in next, error = ${error}`),
        () => log(`testTakeUntil :: in complete`),
    )
}

/**
 * takeWhile 这个要简单一些，接收一个predicate函数（判定函数）来接收数据。
 * 每一个数据都要去判定一下，当判定返回 false 的时候，立即接收上游数据。
 */
function testTakeWhile() {
    log(`testTakeWhile :: enter.`);
    const source$ = of(6,9,12);
    const rst$ = source$.pipe(takeWhile(x=>x<10));
    rst$.subscribe(
        value => log(`testTakeWhile :: in next, value = ${value}`),
        error => log(`testTakeWhile :: in next, error = ${error}`),
        () => log(`testTakeWhile :: in complete`),
    )
}


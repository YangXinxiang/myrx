import {of, interval, timer} from "rxjs";
import {skip, skipUntil, skipWhile} from "rxjs/operators";
import log from "../../../util";
export default function testSkip(){
    log(`testSkip :: enter.`);
    testSkip1();
    // testSkip2();
    // testSkipWhile();
    testSkipUntil();
}

// skip 同步数据的前n个
function testSkip1(){
    log(`testSkip1 :: enter.`);
    const source$ = of(5,8,12,55,90,128);
    const rst$ = source$.pipe( skip(3) );
    rst$.subscribe(
        value => log(`testSkip1 :: in next , value = ${value}`),
        error => log(`testSkip1 :: in next , error = ${error}`),
        () => log(`testSkip1 :: in complete~~`),
    )
}
// skip 异步数据的前n个
function testSkip2(){
    log(`testSkip2 :: enter.`);
    const source$ = interval(2000,500);
    const rst$ = source$.pipe( skip(3) );
    rst$.subscribe(
        value => log(`testSkip2 :: in next , value = ${value}`),
        error => log(`testSkip2 :: in next , error = ${error}`),
        () => log(`testSkip2 :: in complete~~`),
    )
}
// skipWhile， 当predicate函数返回false的时候，就不再skip，就把所有的上游数据传给下游。
function testSkipWhile(){
    log(`testSkipWhile :: enter.`);
    //const source$ = interval(2000,500);
    const source$ = of(4,8,12,55,90,128);
    const rst$ = source$.pipe( skipWhile(x => x%2==0) );
    rst$.subscribe(
        value => log(`testSkipWhile :: in next , value = ${value}`),
        error => log(`testSkipWhile :: in next , error = ${error}`),
        () => log(`testSkipWhile :: in complete~~`),
    )
}

function testSkipUntil(){
    log(`testSkipUntil :: enter.`);
    const source$ = of(4,8,12,55,90,128);
    // const source$ = interval(500);
    const notifier$ = timer(2600)
    const rst$ = source$.pipe( skipUntil(notifier$) );
    rst$.subscribe(
        value => log(`testSkipUntil :: in next , value = ${value}`),
        error => log(`testSkipUntil :: in next , error = ${error}`),
        () => log(`testSkipUntil :: in complete~~`),
    )
}
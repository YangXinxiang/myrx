import {timer, of} from "rxjs";
import {race, map,startWith, concat} from "rxjs/operators";
import log from "../../../util";

export default function testStartWith(){
    log(`testRace :: enter.`);
    // testStartWith1();
    testStartWith2();
}

/**
 * 公平而残酷的 race， 胜者通吃。
 */
function testStartWith1(){
    log(`testStartWith1 :: enter.`);
    const source2$ = timer(0, 500).pipe(map(x=>x+"b"));
    const raced$ = source2$.pipe(startWith("Hello~~"));
    const sub = raced$.subscribe(
        value   => log(`testStartWith1 :: in next, value = ${value}`),
        error   => log(`testStartWith1 :: in error, error = ${error}`),
        ()      => log(`testStartWith1 :: in complete~~`),
    );

    setTimeout(()=>{
        sub.unsubscribe();
    },7000)
}

function testStartWith2(){
    log(`testStartWith2 :: enter.`);
    const source1$ = of("Hello, ", "Hi~~");
    const source2$ = timer(200, 1000).pipe(map(x => x+"aaa"));
    const newData$ = source1$.pipe(concat(source2$));
    const sub = newData$.subscribe(
        value => log(`testStartWith2 :: in next , value  =${value}`),
        error => log(`testStartWith2 :: in error , error  =${error}`),
        () => log(`testStartWith2 :: complete~~`),        
    )
    setTimeout(()=>{
        sub.unsubscribe();
    },7000);
}
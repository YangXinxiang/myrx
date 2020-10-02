/**
 * 练习和测试第7章，过滤类操作符。
 * first/last
 */
import {of, timer, interval} from "rxjs";
import {filter, first, last} from "rxjs/operators";
import log from "../../../util";
export default function testFirstAndLast() {
    log(`testFirstAndLast :: enter.`);
    testFirst();
    testFirst2();
    testLast();
    testLast2();
    testLast3();
}

function testFirst(){
    log(`testFirst :: enter.`);
    const source$ = of(5,9,11,23,7);
    const rst$ = source$.pipe(first());
    rst$.subscribe(
        value => log(`testFirst :: in next, value = ${value}`),
        error => log(`testFirst :: in error, error = ${error}`),
        () => log(`testFirst :: in complete~~`),

    )
}
// use predicate
function testFirst2(){
    log(`testFirst2 (use predicate) :: enter.`);
    const source$ = of(5,9,11,23,7);
    const rst$ = source$.pipe(first(
        (value, index) =>{
            return value >11;
        }
    ));
    rst$.subscribe(
        value => log(`testFirst2 :: in next, value = ${value}`),
        error => log(`testFirst2 :: in error, error = ${error}`),
        () => log(`testFirst2 :: in complete~~`),

    )
}

// use predicate and async
function testFirst3(){
    log(`testFirst3 (use predicate) :: enter.`);
    const source$ = of(5,9,11,23,7);
    const rst$ = source$.pipe(first(
        (value, index) =>{
            return value >11;
        }
    ));
    rst$.subscribe(
        value => log(`testFirst3 :: in next, value = ${value}`),
        error => log(`testFirst3 :: in error, error = ${error}`),
        () => log(`testFirst3 :: in complete~~`),

    )
}

function testLast(){
    log(`testLast :: enter.`);
    const source$ = of("Good", "moning", "sir!","are", "you","ok");
    const rst$ = source$.pipe(last());
    rst$.subscribe(
        value => log(`testLast :: in next, value = ${value}`),
        error => log(`testLast :: in error, error = ${error}`),
        () => log(`testLast :: in complete~~`),
    )
}
// use predicate
function testLast2(){
    log(`testLast2 ():: enter.`);
    const source$ = of("Good", "moning", "sir!","are", "you","ok");
    const rst$ = source$.pipe(last(
        (value, index) => {
            return index>=3;
        }
    ));
    rst$.subscribe(
        value => log(`testLast2 :: in next, value = ${value}`),
        error => log(`testLast2 :: in error, error = ${error}`),
        () => log(`testLast2 :: in complete~~`),
    )
}

function testLast3(){
    log(`testLast3 ():: enter.`);
    const source$ = interval(1000);
    const rst$ = source$.pipe(last(
        (value, index) => {
            return index>=3;
        }
    ));
    rst$.subscribe(
        value => log(`testLast3 :: in next, value = ${value}`),
        error => log(`testLast3 :: in error, error = ${error}`),
        () => log(`testLast3 :: in complete~~`),
    )
}
import {of, interval, timer, fromEvent} from "rxjs";
import {map, zip} from "rxjs/operators";
import log from "../../../util/";
export default function testZip(){
    log(`testZip :: enter.`);
    testZip1();
    testZip2()
}
// zip 同步数据
function testZip1(){
    log(`testZip1 :: enter.`);
    const source1$ = of(1,2,3,4);
    const source2$ = of("a","b","c","d");
    const ziped$ = source1$.pipe(zip(source2$));
    ziped$.subscribe(
        value => log(`testZip1 :: in next, value = ${value}.`),
        error => log(`testZip1 :: in error, error = ${error}.`),
        () => log(`testZip1 :: in complete~~~.`)
    );
}

// zip同步、异步结合的数据
function testZip2(){
    log(`testZip2 :: enter.`);
    const source1$ = of("a","b","c","d");
    const source2$ = interval(500);
    const ziped$ = source1$.pipe(zip(source2$));
    ziped$.subscribe(
        value => log(`testZip2 :: in next, value = ${value}.`),
        error => log(`testZip2 :: in error, error = ${error}.`),
        () => log(`testZip2 :: in complete~~~.`)
    );
}
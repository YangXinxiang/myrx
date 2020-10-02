/**
 * 练习和测试第7章，过滤类操作符。
 * filter
 */
import {of,} from "rxjs";
import {filter, first} from "rxjs/operators";
import log from "../../../util";
export default function testFilter() {
    log(`testFilter :: enter.`);
    testFilter1();
    testFirst();
}

function testFilter1(){
    log(`testFilter1 :: enter.`);
    const source1$ = of(9,6,3,8,11,23,8,13);
    const judge = (value, index, orign$)=>{
        log(`testFilter1 :: judge enter, value = ${value}, index = ${index}, orign$ = ${JSON.stringify(orign$)}`);
        return value%2 === 0;
    }

    const rst$ = source1$.pipe( filter(judge) );
    rst$.subscribe(
        value => log(`testFilter1 :: in next, value = ${value}`),
        error => log(`testFilter1 :: in error , error = ${error}`),
        () => log(`testFilter1 :: in complete~~~`)
    )

}

function testFirst(){
    log(`testFirst :: enter.`);
    const source1$ = of(11,23,8,9,19,22);
    const rst$ = source1$.pipe( first(
        (value, index) => value>30,
        (value, index) => value +"hahhaha",
        "----1"
    ) );
    rst$.subscribe(
        value => log(`testFirst :: in next, value = ${value}`),
        error => log(`testFirst :: in error , error = ${error}`),
        () => log(`testFirst :: in complete~~~`)
    )
}

import {from, of, timer, interval} from "rxjs";
import {count, max, min, reduce, concat} from "rxjs/operators";
import log from "../../../util/";
export default function testMathAssist(){
    log(`testMathAssist :: enter.`);
    testCount1();
}
/**
 * 练习count， 统计吐出数据数量，二不是总和
 */
function testCount1(){
    log(`testCount1 :: enter.`);
    const source1$ = of(1,2,5);
    const source2$ = of(6,8,10);
    const fullSource$ = source1$.pipe(concat(source2$));
    const count$ = fullSource$.pipe(count());
    
    count$.subscribe(
        value => log(`testCount1 :: in next, value = ${value}`),
        null,
        ()=>log(`testCount1 :: in complete~~`)
    )
}
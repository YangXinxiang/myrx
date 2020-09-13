import {timer} from "rxjs";
import {map, withLatestFrom} from "rxjs/operators";
import log from "../../../util/index";
export default function testWithLastFrom(){
    log(`testWithLastFrom :: enter.`);
    testWithLastFrom1();
}





/**
 * 练习withLastFrom， 注意这里的source是有主从关系的，调用withLastFrom的source控制整体数据突出的节奏
 */
function testWithLastFrom1(){
    log(`testWithLastFrom1 :: enter.`);
    const source1$ = timer(0, 2000).pipe(map(x=>x*100));
    const source2$ = timer(500,1000);
    const newData$ = source1$.pipe(withLatestFrom(source2$, (a,b)=>a+b) ); // 最后传入一个project加工数据的参数函数
    const sub = newData$.subscribe(
        value => log(`testWithLastFrom1 :: in next, value = ${value}`),
        error => log(`testWithLastFrom1 :: in error, error = ${error}`),
        ()    => log(`testWithLastFrom1 :: in complete~~`),
    )
    setTimeout(()=>{
        sub.unsubscribe();
    },7000);
    /**
     * 输出结果分析：
     * 0ms: 
     * source1$ ==>> 0; source2$  没有数据吐出，因此newData$此时不产生数据
     * 
     * 500ms:  source1$ ::: 0 , source2$ ==>> 0。
     * 此时都有数据了，但是newData$此时不产生数据任然不会产生数据。因为source2$ 是从属关系，不会控制数据产生。
     * 如果这里用的事combineLatest，那么此时这个环节就会产生数据。要注意区别。
     * 
     * 1500ms: source1$ ::: 0 , source2$ ==>> 1。
     * 分析同上，此时newData$还是不会产生数据。
     * 
     * 2000ms: source1$ ==>> 100 , source2$:: 1。
     * newData$ ==>> 101
     * 
     * 2500ms: source1$ ::: 100 , source2$ ==>>>2。
     * 此时newData$还是不会产生数据。
     *  3500ms: source1$ ::: 100 , source2$ ==>>>3。
     * 此时newData$还是不会产生数据。
     *  4000ms: source1$ ==>> 200 , source2$ ==>>>3。
     * newData$ ==>> 203
     * 
     */
}
import {of, Observable, concat, interval, timer, fromEvent} from "rxjs";
import {map, merge} from "rxjs/operators";
import log from "../../../util/";
export default function testMerge(){
    log(`testMerge :: enter.`);
    testMerge1();
    testMerge2();
}
function testMerge1(){
    log(`testMerge1 :: enter.`)
    const source1$ = timer(0,1000).pipe(map(x => x+"A"));
    const source2$ = timer(500,1000).pipe(map(x=>x+"B"));
    const source3$ = timer(1000,1000).pipe(map(x=>x+"C"));
    const merged$ = source1$.pipe(merge(source2$, source3$, 2)); // 实例的方式调用
    //  const merged$ = merge(source1$, source2$, source3$, 2); // 静态的方式调用，静态方式调用要从"rxjs"中import
    const sub1 = merged$.subscribe(
        value => log(`testMerge1 :: in next, value = ${value}`),
        error => log(`testMerge1 :: in error, error = ${error}`),
        () => log(`testMerge1 :: in complete~~~`),
    )
    setTimeout(()=>{
        sub1.unsubscribe()
    },5000);
}
/**
 * 模拟一个真实场景的使用，合并点击事件
 */
function testMerge2(){
    log(`testMerge2 :: enter.`)
    const source1$ = fromEvent(document.querySelector("#myBtn1"), "click");
    const source2$ = fromEvent(document.querySelector("#myBtn2"), "click");
    const source3$ = fromEvent(document.querySelector("#myBtn3"), "click");
    const merged$ = source1$.pipe(merge(source2$, source3$, 3)); // 实例的方式调用
    merged$.subscribe(
        event => document.querySelector("#myTextArea").value += event.target.value + "\r\n",
    )
}
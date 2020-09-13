import {of, interval, timer, fromEvent} from "rxjs";
import {map, zip, combineLatest} from "rxjs/operators";
import log from "../../../util/";
export default function testCombineLatest(){
    log(`testCombineLatest :: enter.`);
    // testCombineLatest1();
    // testCombineLatest2();
    testCombineLatest3();
}

function testCombineLatest1(){
    log(`testCombineLatest1 :: enter.`);
    const source1$ = timer(500,1000).pipe(map(x=>x+"a"));
    const source2$ = timer(1000,1000).pipe(map(x=>x+"b"));
    const combinedLatest$ = source1$.pipe(combineLatest(source2$));
    const subscribtion = combinedLatest$.subscribe(
        value =>log(`testCombineLatest1 :: in next, value = ${value}`),
        error =>log(`testCombineLatest1 :: in error, error = ${error}`),
        () =>log(`testCombineLatest1 :: in complete~~`),
    );
    // 过6秒就反注册
    setTimeout(()=>{
        subscribtion.unsubscribe();
    },6000);
    /* 输出内容
    10:36:03.050 index.js:5 [myrxjs]  testCombineLatest1 :: enter.
    10:36:04.654 index.js:5 [myrxjs]  testCombineLatest1 :: in next, value = 0a,0b
    10:36:06.045 index.js:5 [myrxjs]  testCombineLatest1 :: in next, value = 1a,0b
    10:36:06.046 index.js:5 [myrxjs]  testCombineLatest1 :: in next, value = 1a,1b
    10:36:06.931 index.js:5 [myrxjs]  testCombineLatest1 :: in next, value = 1a,2b
    10:36:06.931 index.js:5 [myrxjs]  testCombineLatest1 :: in next, value = 2a,2b
    10:36:07.056 index.js:5 [myrxjs]  testCombineLatest1 :: in next, value = 2a,3b
    10:36:07.845 index.js:5 [myrxjs]  testCombineLatest1 :: in next, value = 3a,3b
    10:36:08.054 index.js:5 [myrxjs]  testCombineLatest1 :: in next, value = 3a,4b
    10:36:08.844 index.js:5 [myrxjs]  testCombineLatest1 :: in next, value = 4a,4b
    10:36:09.054 index.js:5 [myrxjs]  testCombineLatest1 :: in next, value = 4a,5b
    */
}


function testCombineLatest2(){
    log(`testCombineLatest2 :: enter.`);
    const source1$ = timer(500, 1000).pipe(map(x=>x+"a"));
    const source2$ = timer(1000, 1000).pipe(map(x=>x+"b"));
    const source3$ = timer(1200, 1000).pipe(map(x=>x+"c"));
    
    const combinedLatest$ = source1$.pipe(combineLatest(source2$,source3$));
    const sub = combinedLatest$.subscribe(
        value => log(`testCombineLatest2 :: in next, value = ${value}`),
        error => log(`testCombineLatest2 :: in error, error = ${error}`),
        () => log(`testCombineLatest2 :: in complete~~`),
    );
    setTimeout(()=>{
        sub.unsubscribe();
    }, 7000);
}

/**
 * 测试多重合并
 */
// 下面的测试输出
/*
    1.5s:
    1a, 1b
    2.5s
    2a, 1b
    2a, 2b
    3.5s
    3a, 2b
    3a, 3b
    4.5s
    4a, 3b
    4a,4b
    */
function testCombineLatest3(){
    log(`testCombineLatest3 :: enter.`);
    const timer$ = timer(500,1000);
    const source1$ = timer$.pipe(map(x => x+"a"));
    const source2$ = timer$.pipe(map(x => x+"b"));
    const combinedLatest$ = source1$.pipe(combineLatest(source2$));
    const sub = combinedLatest$.subscribe(
        value => log(`testCombineLatest3 :: in next, value = ${value}`),
        error => log(`testCombineLatest3 :: in error, error = ${error}`),
        () => log(`testCombineLatest3 :: in complete~~`),
    )
    setTimeout(()=>{
        sub.unsubscribe();
    }, 5000);
}
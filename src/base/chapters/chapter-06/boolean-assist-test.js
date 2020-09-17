/**
 * 测试一些boolean类型的辅助操作符
 * every
 * find
 * findIndex
 * isEmpty
 * defaultEmpty
 */

 import {timer, interval, of} from "rxjs";
 import {every, find, findIndex, isEmpty, defaultIfEmpty, zip,map} from "rxjs/operators";
 import log from "../../../util";
 export default function testBooleanAssist(){
    log(`testBooleanAssist :: enter.`);
    // testEvery();
    // testEvery2();
    // testFind();
    // testFindIndex();
    // findBothValueAndIndex();
    testIsEmpty();

    testDefaultIfEmpty();
 }

 function testEvery(){
    log(`testEvery :: enter.`);
    const source1$ = of(6,2,9,10);
    const rst$ = source1$.pipe(every(x => x>5));
    rst$.subscribe(
        value => log(`testEvery :: in next, value = ${value}`),
        error => log(`testEvery :: in error , error = ${error}`),
        () => log(`testEvery :: in complete~~~`)
    )
 }

 function testEvery2(){
    log(`testEvery2 :: enter.`);
    const source1$ = timer(500,1000);
    const rst$ = source1$.pipe(every(x => x>5));
    rst$.subscribe(
        value => log(`testEvery2 :: in next, value = ${value}`),
        error => log(`testEvery2 :: in error , error = ${error}`),
        () => log(`testEvery2 :: in complete~~~`)
    )
 }

 // find, 查找满足条件的数据，返回找到的数据
 function testFind(){
    log(`testFind :: enter.`);
    const source1$ = timer(500,1000);
    const rst$ = source1$.pipe(find(x => x>5));
    rst$.subscribe(
        value => log(`testFind :: in next, value = ${value}`),
        error => log(`testFind :: in error , error = ${error}`),
        () => log(`testFind :: in complete~~~`)
    )
 }
 // findIndex, 查找满足条件的数据的index
 function testFindIndex(){
    log(`testFindIndex :: enter.`);
    const source$ = timer(500, 1000).pipe(
        map((x,index,orign) => {
            log(`testFindIndex :: map enter, x = ${x}, index = ${index}`);
            return {myIndex: index, myValue : x};
        })
    )
    
    const rst$ = source$.pipe(findIndex(x => x.myIndex = 6));
    rst$.subscribe(
        value => log(`testFindIndex :: in next, value = ${value}`),
        error => log(`testFindIndex :: in error , error = ${error}`),
        () => log(`testFindIndex :: in complete~~~`)
    )
 }

 // 通过find 和findIndex，自定义返回的数据
 function findBothValueAndIndex(){
    log(`findBothValueAndIndex :: enter.`);
    const source = timer(500,1000);
    const source$ = timer(500, 1000).pipe(
        map((x,index,orign) => {
            log(`findBothValueAndIndex :: map enter, x = ${x}, index = ${index}`);
            return {myIndex: index, myValue : x};
        })
    )
    const rstValue$ = source$.pipe(find(x => x.myIndex == 6));
    const rstIndex$ = source$.pipe(findIndex(x => x.myIndex == 6));
    const newData$ = rstValue$.pipe( zip(rstIndex$) );

    newData$.subscribe(
        value => log(`findBothValueAndIndex :: in next, value = ${JSON.stringify(value)}`),
        error => log(`findBothValueAndIndex :: in error , error = ${error}`),
        () => log(`findBothValueAndIndex :: in complete~~~`)
    )
 }

 // 测试是否
 function testIsEmpty(){
    log(`testIsEmpty :: enter.`);
    const source$ = of(1);
    const rst$ = source$.pipe( isEmpty() );
    rst$.subscribe(
        value => log(`testIsEmpty :: in next, value = ${value}`),
        error => log(`testIsEmpty :: in error , error = ${error}`),
        () => log(`testIsEmpty :: in complete~~~`)
    )
 }

 // 测试 defaultIfEmpty
 function testDefaultIfEmpty(){
    log(`testDefaultIfEmpty :: enter.`);
    // const source$ = of(666);
    const source$ = of();
    const rst$ = source$.pipe( defaultIfEmpty("Hello, this is default~~") );
    rst$.subscribe(
        value => log(`testDefaultIfEmpty :: in next, value = ${value}`),
        error => log(`testDefaultIfEmpty :: in error , error = ${error}`),
        () => log(`testDefaultIfEmpty :: in complete~~~`)
    )
 }
import {timer, fromEvent} from "rxjs";
import {take,windowWhen, bufferWhen} from "rxjs/operators";
import log from "../../../util";
export default function testWindowAndBufferWhen(){
    log(`testWindowAndBufferWhen :: enter.`);
    // testWindowWhen1();
    // testWindowWhen2();
   // testBufferWhen1();
    testBufferWhen2();
}
// windowWhen，按照参数函数返回的 observalbe 来划分对上游数据的封装。上游数据封装在向下游吐出的observable对象中。
function testWindowWhen1(){
    log(`testWindowWhen1 :: enter.`);
    const source$ = timer(0,100);
    const closingSelector = ()=>{
        return timer(400);
    }
    const newData$ = source$.pipe(
        take(15),
        windowWhen(closingSelector)
    )
    
    const observer = {
        next(v){
            log(`testWindowWhen1 :: （inner）next enter, value = ${v}`);
        },
        error(e){
            log(`testWindowWhen1 :: （inner）error enter, value = ${e}`);
        },
        complete(){
            log(`testWindowWhen1 :: （inner） in complete~~`);
        }
    }
    newData$.subscribe(
        (value) => {
            log(`testWindowWhen1 :: next enter, value = ${value}`);
            value.subscribe(observer);           
        },
        (error) => log(`testWindowWhen1 :: error, error = ${error}`),
        () => log(`testWindowWhen1 :: in complete~~`)
    )
}

// windowWhen通过参数函数返回的observable对象控制缓存周期，函数参数没有参数，这降低了灵活性。
// 但是，如果参数函数返回的observable的数据源在外部的话，要好一些，比如下面的示例：
function testWindowWhen2(){
    log(`testWindowWhen2 :: enter.`);
    const source$ = timer(0,500);
    const closingSelector = ()=>{
        return fromEvent(document.querySelector("#myTextArea"), "click");
    }
    const newData$ = source$.pipe(
        take(30),
        windowWhen(closingSelector)
    )
    
    const observer = {
        next(v){
            log(`testWindowWhen2 :: （inner）next enter, value = ${v}`);
        },
        error(e){
            log(`testWindowWhen2 :: （inner）error enter, value = ${e}`);
        },
        complete(){
            log(`testWindowWhen2 :: （inner） in complete~~`);
        }
    }
    newData$.subscribe(
        (value) => {
            log(`testWindowWhen2 :: next enter, value = ${value}`);
            value.subscribe(observer);           
        },
        (error) => log(`testWindowWhen2 :: error, error = ${error}`),
        () => log(`testWindowWhen2 :: in complete~~`)
    )
}

// bufferWhen跟 windowWhen基本差不多，都是在一开始注册的时候windowWhen/bufferWhen就开始工作，立即调用参数函数closingSelector，
// 参数函数返回的observable对象控制本期间输出的内容。参数函数返回的observable有数据或者完结的时候，本次数据缓存周期结束。同时同步开启下一个缓存周期。
function testBufferWhen1(){
    log(`testBufferWhen1 :: enter.`);
    const source$ = timer(1,200);
    const closingSelector = ()=>{
        return timer(800);
    }
    const newData$ = source$.pipe(
        take(20),
        bufferWhen(closingSelector)
    )

    newData$.subscribe(
        (value)=>log(`testBufferWhen1 :: in next, value = ${JSON.stringify(value)}`),
        (error)=>log(`testBufferWhen1 :: in error, error = ${error}`),
        ()=>log(`testBufferWhen1 :: in complete~~~`)
    )
}

function testBufferWhen2(){
    log(`testBufferWhen2 :: enter.`);
    const source$ = timer(0,500).pipe(take(30));
    const closingSelector = ()=>{
        log(`testBufferWhen2 :: closingSelector enter.`);
        return fromEvent(document.querySelector("#myTextArea"), "click");
    }
    const newData$ = source$.pipe(
        bufferWhen(closingSelector)
    )

    newData$.subscribe(
        (value)=>log(`testBufferWhen2 :: in next , value = ${value}`),
        (error)=>log(`testBufferWhen2 :: in error, error = ${error}`),
        ()=>log(`testBufferWhen2 :: incomplete~~~`)
    )
}
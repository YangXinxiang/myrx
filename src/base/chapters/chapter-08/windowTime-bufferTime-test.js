// 练习 windowTime 和 bufferTime
import {of, interval,timer} from "rxjs";
import {windowTime, bufferTime, take} from "rxjs/operators";
import log from "../../../util";
export default function testWindowAndBufferTime(){
    log(`testWindowAndBufferTime :: enter.`);
    // testWindowTime();
     testWindowTime2();
    //testBufferTime();

    // testBufferTime2();
}

/**
 * windowTime, 把上游的数据，分成固定时长的段，每一段包装成一个内部observable对象，需要再次明确的subscribe该内部observable.
 * 内部observable对象会把该区段的数据原封不动的传给下游。
 * 
 * 理解了工作原理，但是不知道应用场景呢。。。
 * 优势是什么？好处是什么？   疑惑在2020.10.03
 */
function testWindowTime(){
    log(`testWindowTime :: enter.`);
    const source$ = interval(200)
    const newData$ = source$.pipe(
        
        windowTime(1000),
        take(6),
        
    )

    const oberver = {
        next(value){
            log(`testWindowTime (inner) :: in next, value = ${value}`);
        },
        error(error){
            log(`testWindowTime (inner) :: in error, error = ${error}`);
        },
        complete(){
            log(`testWindowTime (inner) :: in complete`);
        }

    }

    newData$.subscribe(
        value => {
            log(`testWindowTime (outer) :: in next, value = ${value}`);
            value.subscribe(oberver);
        },
        error =>{
            log(`testWindowTime (outer) :: in error, error = ${error}`);
        },
        () =>{
            log(`testWindowTime (outer) :: in complete`);
        }
    )

    

}

// 使用windowTime的第二个参数，表示下一个包装上游数据的observable对象什么时候产生
function testWindowTime2(){
    log(`testWindowTime2 :: enter.`);
    const source$ = timer(0,100)
    const newData$ = source$.pipe(
        windowTime(400, 700), // 第二个参数表示每隔多长时间产生一个封装上游数据的observable， 500ms比1000短，会成倍的产生ob，可能会产生重复数据
        take(6)
    )

    const oberver = {
        next(value){
            log(`testWindowTime2 (inner) :: in next, value = ${value}`);
        },
        error(error){
            log(`testWindowTime2 (inner) :: in error, error = ${error}`);
        },
        complete(){
            log(`testWindowTime2 (inner) :: in complete`);
        }

    }

    newData$.subscribe(
        value => {
            log(`testWindowTime2 (outer) :: in next, value = ${value}`);
            value.subscribe(oberver);
        },
        error =>{
            log(`testWindowTime2 (outer) :: in error, error = ${error}`);
        },
        () =>{
            log(`testWindowTime2 (outer) :: in complete`);
        }
    )
}

/**
 * bufferTime, 按指定的时间间隔用数组缓存数据，时间间隔结束的时候，一次性将数据吐出给下游。
 * 
 * 问题：因为会缓存数据，因此指定的时间间隔内，可能会产生多个数据。怎么办？
 * 第三个参数解决这个问题。
 */
function testBufferTime(){
    log(`testBufferTime :: enter.`);
    const source$ = timer(0, 100);
    const newData$ = source$.pipe(
        bufferTime(400),
        take(6)
    );

    newData$.subscribe(
        value => {
            log(`testBufferTime :: in next, value = ${value}`);
            //value.subscribe(oberver);
        },
        error =>{
            log(`testBufferTime :: in error, error = ${error}`);
        },
        () =>{
            log(`testBufferTime :: in complete`);
        }
    )
}

// 测试
function testBufferTime2(){
    log(`testBufferTime2 :: enter.`);
    const source$ = timer(0, 100);
    const newData$ = source$.pipe(
        bufferTime(600, 200, 3), // 第2个参数表示重新启动缓存数据对象的时机，会导致数据重复或者丢失。
        take(6)
    );

    newData$.subscribe(
        value => {
            log(`testBufferTime2 :: in next, value = ${value}`);
            //value.subscribe(oberver);
        },
        error =>{
            log(`testBufferTime2 :: in error, error = ${error}`);
        },
        () =>{
            log(`testBufferTime2 :: in complete`);
        }
    )
}
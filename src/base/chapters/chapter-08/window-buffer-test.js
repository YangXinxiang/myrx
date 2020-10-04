import {timer} from "rxjs";
import {window, buffer, take} from "rxjs/operators";
import log from "../../../util";
export default function testWindowAndBuffer(){
    log(`testWindowAndBuffer :: enter.`);
    // testWindow();
    testBuffer();
}

function testWindow(){
    log(`testWindow :: enter.`);
    const source$ = timer(0, 100);
    const seprator$ = timer(400, 400);
    const newData$ = source$.pipe(
        window(seprator$),   // 相当于 windowToggle的开始 opennings$ 和结束方法返回的数据聚合成了一个了。
        take(6)
    )
    // 高阶observable对象产生的内部observable观察者
    const innerObserver = {
        next(value){
            log(`testWindow (inner) :: in next, value = ${value}`);
        },
        error(error){log(`testWindow (inner) :: in error, error = ${error}`)},
        complete(){
            log(`testWindow (inner) :: in complete~~~`)
        }
    }
    newData$.subscribe(
        value =>{
            log(`testWindow (outer) :: in next, value = ${value}`);
            value.subscribe(innerObserver);
        },
        error => log(`testWindow (outer) :: in error, error = ${error}`),
        () => log(`testWindow (outer) :: in complete~~~`)
    )
}

function testBuffer(){
    log(`testBuffer :: enter.`);
    const source$ = timer(0, 100);
    const seprator$ = timer(400, 400);
    const newData$ = source$.pipe(
        buffer(seprator$),   // 相当于 windowToggle的开始 opennings$ 和结束方法返回的数据聚合成了一个了。
        take(6)
    )
    // 高阶observable对象产生的内部observable观察者
    const innerObserver = {
        next(value){
            log(`testBuffer (inner) :: in next, value = ${value}`);
        },
        error(error){log(`testBuffer (inner) :: in error, error = ${error}`)},
        complete(){
            log(`testBuffer (inner) :: in complete~~~`)
        }
    }
    newData$.subscribe(
        value =>{
            log(`testBuffer (outer) :: in next, value = ${value}`);
            // value.subscribe(innerObserver);
        },
        error => log(`testBuffer (outer) :: in error, error = ${error}`),
        () => log(`testBuffer (outer) :: in complete~~~`)
    )
}


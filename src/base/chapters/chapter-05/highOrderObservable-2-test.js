import {interval,timer, never,Observable} from "rxjs";
import {concat, concatAll, take, map, zipAll, combineAll, switchAll, exhaust} from "rxjs/operators";
import log from "../../../util";
import { FindValueOperator } from "rxjs/internal/operators/find";
export default function testHighOrderObservable2(){
    log(`testHighOrderObservable2 :: enter.`);
    // testConcatAll();
    // testZipAll();
    // testZipAll2();
    // testCombineAll();
    // testSwitchAll();
    testExhaust();
}
/**
 * 测试 concatAll
 */
function testConcatAll(){
    log(`testConcatAll :: enter.`); // 假如这里是时间点0
    const ho$ = interval(1000).pipe(
        take(2),
        map((x => {
            log(`testConcatAll :: in map 1, will return a new observable`);
            return interval(1500).pipe(
                take(2),
                map(y=>{
                    return x + " "+y;
                })
            );
        }))
    )
    // 相当于把ho$ 产生的所有的数据 concat起来
    const newData$ = ho$.pipe(concatAll());
    newData$.subscribe(
        value => log(`testConcatAll :: in next, value = ${value}`),
        error => log(`testConcatAll :: in error, error = ${error}`),
        () => log(`testConcatAll :: in complete~~`),
    );
    /*
    1S      : o1
    2s      : o2
    o1：
    1+1.5S : 0:0
    1+3S : 0:1

    O2:
    2+1.5s    : 1:0
    2+3s : 1:1

    如果不是使用concatAll拉平： 应该是： 0:0（2.5S）, 1:0（3.5S）, 0:1（4S）, 1:1（5S）
    但是使用concatAll拉平之后，必须等observable1的对象完结之后，才会去subscribe第2个observable对象。
    因此数据变为：
    0:0（2.5S）, 0:1（4S）, 1:0, 1:1
    */

}
/**
 * 测试 zipAll
 */
function testZipAll(){
    log(`testZipAll :: enter.`);
    const ho$ = interval(1000).pipe(
            take(2),
            map(x=>{
                log(`testZipAll :: the first main observable creating~~`);
                return interval(1500).pipe(
                    take(2),
                    map(y => x+" : "+y)
                )
            })
        );
    const newData$ = ho$.pipe(zipAll());
    const subscription = newData$.subscribe(
        value => log(`testZipAll :: in next, value = ${value}`),
        error => log(`testZipAll :: in error, error = ${error}`),
        () => log(`testZipAll :: in complete~~~`),
    );
}

function testZipAll2(){
    log(`testZipAll2 :: enter.`);
    const ho$ = interval(1000).pipe(
            take(2),
            concat(timer(500)), // 两条数据流分别连接多突出一个数据,因此，会突出3个数据： 0, 1, 0，第三个数据0是timer(500)吐出的
            // 三个数据流，每个数据流会被映射成一个 observable对象
            map(x=>{
                log(`testZipAll2 :: the first main observable creating~~x = ${x}`);
                /*
                return interval(1500).pipe(
                    take(2),
                    map(y => x+" : "+y)
                );
                */
                return new Observable(observer => {
                    log(`testZipAll2 :: start subscribe, x = ${x}`);
                    setTimeout(()=>{
                        let value = x+" :: "+0;
                        log(`testZipAll2 :: will call next, value = ${value}`);
                        observer.next(value);
                    },1500);

                    setTimeout(()=>{
                        let value2 = x+" :: "+1;
                        log(`testZipAll2 :: will call next2, value2 = ${value2}`);
                        observer.next(value2);
                        observer.complete();
                    },3000);

                })
            }),
            
        );
    const newData$ = ho$.pipe(zipAll());
    const subscription = newData$.subscribe(
        value => log(`testZipAll2 :: in next, value = ${value}`),
        error => log(`testZipAll2 :: in error, error = ${error}`),
        () => log(`testZipAll2 :: in complete~~~`),
    );
}
/**
 * 测试高阶Observable操作符 combineAll
 */
function testCombineAll(){
    log(`testCombineAll :: enter.`); // 假如这里是开始点： 0S
    const ho$ = interval(1000).pipe(
        take(2),
        concat(timer(500)), // 这里叠加一个 concat ，变得更复杂一些。
        map(x => {
            log(`testCombineAll :: creating inner observable, x = ${x}`);
            return interval(1500).pipe(
                take(2),
                map(y => x+" : "+y)
            )
        })
    );
    const newData$ = ho$.pipe(combineAll());
    // 注册的时候，会同时对每一个子 observable 注册， 每一个 observable 会从这时候才开始尝试产生数据。
    newData$.subscribe(
        value => log(`testCombineAll :: in next ,value = ${value}`),
        error => log(`testCombineAll :: in error ,error = ${error}`),
        () => log(`testCombineAll :: in complete~~`),
    )   
}

/**
 * 测试 switch高阶操作符。
 */
 function testSwitchAll(){
     log(`testSwitch :: enter.`);
     const ho$ = interval(1000).pipe(
         take(3),
         map(x =>{
             /*
             return interval(700).pipe(
                 take(2),
                 map(y => x+" :::: "+y)
             )*/
             return new Observable(observer => {
                log(`testSwitch :: creating observable.`);
                setTimeout(()=>{
                    log(`testSwitch :: will call next 0.`);
                    observer.next(x+"===>>>"+0);
                },700);
                setTimeout(()=>{
                    log(`testSwitch :: will call next 1.`);
                    observer.next(x+"===>>>"+1);                    
                },1400);
                setTimeout(()=>{
                    log(`testSwitch :: will call next 2.`);
                    observer.next(x+"===>>>"+2);
                    observer.complete();
                },1400);
             })
         })
     );
     const newData$ = ho$.pipe(switchAll());
     newData$.subscribe(
         value => log(`testSwitch :: in next , value = ${value}`),
         error => log(`testSwitch :: in error , error = ${error}`),
         () => log(`testSwitch :: in complete~~`),
     );
 }
 /**
  * 练习高阶observable, exhaust
  */
 function testExhaust(){
     log(`testExhaust :: enter.`);
     const ho$ = interval(1000).pipe(
         take(3),
         map(x => {
             return interval(700).pipe(
                 take(3),
                 map(y => x+"::::"+y)
             )
         })
     );
    const newData$ = ho$.pipe(exhaust())
    newData$.subscribe(
         value => log(`testExhaust :: in next , value = ${value}`),
         error => log(`testExhaust :: in error , error = ${error}`),
         () => log(`testExhaust :: in complete~~~`),
     );
 }
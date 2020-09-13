import {Observable, of, range, generate} from "rxjs";
import {map, filter, repeat} from "rxjs/operators";
import log from "../../../util/";
import testETN from "./empty-never-throw-test";
import testAsync from "./interval-and-timer";
import testFrom from "./from-test";
import testFromEvent from "./fromEvent-test";
import testAjax from "./ajax-test";
import testRepeatWhen, {testRepeat3, testRepeat5, testRepeatWhen2} from "./repeatWhen-test";
import testDefer from "./defer-test";
import testError from "./error-test";
export default function startTest(){
    log(`startTest(c4) :: enter.`);
    // testETN();
    // testAsync();

     testFrom();

   //  testFromEvent();
   // testAjax(); // ajax没有测试成功，是不支持了么？
   // testRepeatWhen();
   // testRepeatWhen2();
   // testRepeat3();
   //testRepeat5();

   // testDefer();
   //testError();
}
/**
 * 练习操作符 of
 */
export function testOf(){
    log(`testOf :: enter.`);
   
    let source$ = of(1,2,3,4);
    source$.subscribe({
        next(value){
            log(`next : ${value}`);
        },
        error(er){
            log(`error : ${er}`);
        },
        complete(){
            log(`complete`);
        }
    })
   
}
/**
 * 练习操作符 range
 */
export function testRange(){
    log(`testRange :: enter.`);   
    let source$ = range(1,10).pipe(map(x=>x*2))
    source$.subscribe({
        next(value){
            log(`testRange :: next : ${value}`);
        },
        error(er){
            log(`testRange :: error : ${er}`);
        },
        complete(){
            log(`testRange :: complete`);
        }
    })
}

/**
 * 练习操作符 generate
 */

 export function testGenerate(){
    log(`testGenerate :: enter.`);
    // generate 就想for循环，比如用for循环产生 2~10之间的偶数数组
    let result1 = [];
    for(let i=2;i<10;i+=2){
        result1.push(i);
    }
    log(`testGenerate :: for 循环产生的2~10之间的偶数数组 :: ${result1}`);

    // 用generate操作符产生2~10之间的偶数序列
    const source$ =generate(
        2,
        value => value<10,
        value => value+=2,
        value => value
    );

    source$.subscribe(
        value=>log(`testGenerate :: subscribe ,value got : ${value}`),
        error=>log(`testGenerate :: subscribe ,error got : ${error}`),
        ()=>log(`testGenerate :: subscribe complete~~`),
    );

    // 生成递增一个x的字符序列
    const source2$ = generate(
        "x",
        value   => value.length<5,
        value   => value+="x",
        value   => value
    ); 
    source2$.subscribe(
        value=>log(`testGenerate :: subscribe22 ,value got : ${value}`),
        error=>log(`testGenerate :: subscribe22 ,error got : ${error}`),
        ()=>log(`testGenerate :: subscribe22 complete~~`),
    );
 }


 export function testGenerate2(){
     log(`testGenerate2 :: enter.`);
     let source$ = generate(2,
        value => value<16,
        value => value+=2,
        value =>value
        ).pipe(filter(x=>x>6));

      source$.subscribe(
          value => log(`testGenerate2 :: in next, ${value}`),
          error =>log(`testGenerate2 :: in error, ${error}`),
          ()=>log(`testGenerate2 :: in complete.`)
      ) 
 }
 // 练习repeat，p77
 export function testRepeat(){
    log(`testRepeat :: enter.`);
    let source$ = new Observable((observer)=>{
        log(`testRepeat :: on subscribe`);
        setTimeout(()=>observer.next(1),1000);
        setTimeout(()=>observer.next(2),2000);
        setTimeout(()=>observer.next(3),3000);
        setTimeout(()=>observer.complete(),4000);
        return {
            unsubscribe(){
                log(`testRepeat :: on unsubscribe`);
            }
        }
    });

    let repeated$ = source$.pipe(repeat(3));
    repeated$.subscribe(
        value =>  log(`repeated :: ${value}`),
        null,
        () =>  log(`repeated :: complete`)
       
    )
 }
 // 练习of 结合repeat : p78
 export function testRepeat2(){
    let source$ = of(1,2,3);
    let repeated$ = source$.pipe(repeat(3));
    repeated$.subscribe(
        value =>  log(`testRepeat2 repeated :: ${value}`),
        null,
        () =>  log(`testRepeat2 repeated :: complete`)
    )
 }

  // 练习empty 结合repeat : p79
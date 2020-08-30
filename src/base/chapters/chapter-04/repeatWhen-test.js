/** 
 * 本文件主要是练习（复习）repeat 和 练习repeatWhen操作符 （2020.08.29~~30）
 * repeatWhen的基本用法：
 * source$.pipe(repeatWhen(notifier));
 * notifier 是一个触发控制repeat时机的控制器方法，
 * 该方法要返回一个下一次触发调用时机的obserable对象，一般是 timer、interval、delay等包装的obserable
 * notifier 在source$ 第一次complete的时候被调用， notifier返回的对象触发的时候，source$会被再次注册。
 * 所以，叫做，repeatWhen
 * 
 * 注意： 深入浅出Rxjs书上第4张（P90）的第一段落描述的不对！！！
 * notifier是在源source$在调用complete之后开始调用，而不是在source$抛出异常的时候开始调用~~~
 * 
 * [myrxjs]  testRepeatWhen2 :: enter.
10:16:57.169 index.js:5 [myrxjs]  testRepeatWhen2 :: on subscribe (creating....)
10:16:57.169 index.js:5 [myrxjs]  testRepeatWhen2 :: in next ,value = {"address":"Beijing","count":0}
10:16:57.170 index.js:5 [myrxjs]  testRepeatWhen2 :: notifier enter.
10:16:57.171 index.js:5 [myrxjs]  testRepeatWhen2 :: on subscribe  created end~~~
10:16:59.176 index.js:5 [myrxjs]  testRepeatWhen2 :: on subscribe (creating....)
10:16:59.176 index.js:5 [myrxjs]  testRepeatWhen2 :: in next ,value = {"address":"Beijing","count":1}
10:16:59.176 index.js:5 [myrxjs]  testRepeatWhen2 :: unsubscribe enter.
10:16:59.176 index.js:5 [myrxjs]  testRepeatWhen2 :: on subscribe  created end~~~
10:17:01.174 index.js:5 [myrxjs]  testRepeatWhen2 :: on subscribe (creating....)
10:17:01.174 index.js:5 [myrxjs]  testRepeatWhen2 :: in next ,value = {"address":"Beijing","count":2}
10:17:01.174 index.js:5 [myrxjs]  testRepeatWhen2 :: unsubscribe enter.
10:17:01.174 index.js:5 [myrxjs]  testRepeatWhen2 :: on subscribe  created end~~~
10:17:03.175 index.js:5 [myrxjs]  testRepeatWhen2 :: on subscribe (creating....)
10:17:03.175 index.js:5 [myrxjs]  testRepeatWhen2 :: in next ,value = {"address":"Beijing","count":3}
10:17:03.176 index.js:5 [myrxjs]  testRepeatWhen2 :: unsubscribe enter.
10:17:03.176 index.js:5 [myrxjs]  testRepeatWhen2 :: on subscribe  created end~~~
10:17:03.176 index.js:5 [myrxjs]  testRepeatWhen2 :: unsubscribe enter.
 */
import {Observable, of,timer, interval} from "rxjs";
import {repeatWhen, repeat} from "rxjs/operators";
import log from "../../../util/";

// 练习 repeatWhen
export default function testRepeatWhen(){
    log(`testRepeatWhen :: enter.`);
    let source$ = of(1,2,3);
    let source2$ = new Observable((observer)=>{
        log(`testRepeatWhen :: source2$ new enter (sunbscribe)...`);
        observer.next(6);
        observer.next(7);
        observer.next(8);
        observer.complete();
        return {
            unsubscribe(){
                log(`testRepeatWhen :: source2$ unsubscribe enter.`);
            }
        }
    });
    let repeated$ = source2$.pipe(repeatWhen(notify));

    function notify(arg$){
        log(`testRepeatWhen :: notify :: enter.`);
        return timer(3000);
    }
    repeated$.subscribe(
        value => log(`testRepeatWhen :: in next, value = ${value}`),
        error => log(`testRepeatWhen :: in error, error = ${error}`),
        () => log(`testRepeatWhen :: in complete~~`),
    )
}

// 复习一遍repeat
export function testRepeat3(){
    log(`testRepeat3 :: enter.`);
    let source$ = new Observable(observer=>{
        log(`testRepeat3 :: subscribe enter (new inst).`);
        observer.next(7);
        observer.next(8);
        observer.next(9);
        observer.complete();

        return {
            unsubscribe(){
                log(`testRepeat3 :: unsubscribe enter`);
            }
        }
    });

    let repeated$ = source$.pipe(repeat(3));
    repeated$.subscribe(
        value => log(`testRepeat3 :: in next, value = ${value}`),
        error => log(`testRepeat3 :: in error, error = ${error}`),
        () => log(`testRepeat3 :: in complete~~~`)
    )

}

// 2020.08.30 再默写练习一遍repeat
export function testRepeat5(){
    log(`testRepeat5 :: enter.`);

    // 注意create目前看只能用Observable.create方式调用
    const source$ = Observable.create(observer => {
        log(`testRepeat5 :: creating obserable (onsubscribe).`);
        observer.next("name");
        observer.next("email");
        observer.next("phone");
        observer.complete();
        log(`testRepeat5 :: creating obserable end~~`);
        return {
            unsubscribe(){
                log(`testRepeat5 :: unsubscribe end~~`);
            }
        }
    });

    const repeated$ = source$.pipe(repeat(3));
    repeated$.subscribe(
        value => log(`testRepeat5 :: in next, value = ${value}`),
        error => log(`testRepeat5 :: in error, error = ${error}`),
        () => log(`testRepeat5 :: in complete~~`),
    )
}

// 再复习一遍repeatWhen, 2020.08.30
export function testRepeatWhen2(){
    log(`testRepeatWhen2 :: enter.`);
    let count = 0;
    const source$ = Observable.create(observer => {
        log(`testRepeatWhen2 :: on subscribe (creating....)`);
        observer.next({address:"Beijing", count: count++});
        
        observer.complete();
        log(`testRepeatWhen2 :: on subscribe  created end~~~`);

        return {
            unsubscribe(){
                log(`testRepeatWhen2 :: unsubscribe enter.`)
            }
        }
    });

    /**
     * repeatWhen的重新注册的触发器 Obserable， 
     */
    const notifier = ()=>{
        log(`testRepeatWhen2 :: notifier enter.`)
        return interval(2000);
    }


    const repeated$ = source$.pipe(repeatWhen(notifier));
    const subscribtion = repeated$.subscribe(
        value => {
            log(`testRepeatWhen2 :: in next ,value = ${JSON.stringify(value)}`);
            if(value.count >=3){
                subscribtion.unsubscribe();
            }           
            
        },
        error => log(`testRepeatWhen2 :: in error ,error = ${error}`),
        () => log(`testRepeatWhen2 :: in complete~~`),
    )

}
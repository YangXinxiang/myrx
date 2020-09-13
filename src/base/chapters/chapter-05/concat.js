import {of, Observable, concat, interval} from "rxjs";
// import {concat} from "rxjs/operators";
import log from "../../../util/";
export default function testConcat(){
    log(`testConcat :: enter.`);
    // testConcat1();

     testConcat2();

   // unsub()
}
/**
 * 合并两个简单数据流
 */
export function testConcat1(){
    log(`testConcat1 :: enter.`);
    const soure$1 = of(1,2,3);
    const source2$ = of(7,8,9);
    const concated$ = soure$1.pipe(concat(source2$));
    concated$.subscribe(
        value=> log(`testConcat1 :: in next, value = ${value}`),
        error=> log(`testConcat1 :: in error, error = ${error}`),
        ()=> log(`testConcat1 :: in complete~~`),

    )
}

/**
 * 测试concat方法，从根本上分析cancat的原理:
 * 为了方便看concat的过程，手写了两个数据源observable
 */
export function testConcat2(){
    log(`testConcat2 :: enter.`);
    const source1 = new Observable(observer=>{
        log(`testConcat2 :: new Observable 1 enter.`);
        observer.next("Hello~~");
        observer.next("Hi~~");
        // observer.error("Crash!!!");  // 中间调用error，会导致后续数据无法合并汇入进来
        observer.complete(); // 如果不调用complete， 后续数据不会合并进来。
        return {
            unsubscribe(){
                log(`testConcat2 :: unsubscribe 1 enter.`);
            }
        }
    });
    const source2 = new Observable(observer=>{
        log(`testConcat2 :: new Observable 2 enter.`);
        observer.next("Good~~");
        observer.next("Morning~~");
        // observer.error("Crash!!!");
        observer.complete();
        return {
            unsubscribe(){
                log(`testConcat2 :: unsubscribe 2 enter.`);
            }
        }
    });

    // const concated2 = source1.pipe(concat(source2));
    const concated2 = concat(source1, source2);
    concated2.subscribe(
        value => log(`testConcat2 :: in next, value = ${value}`),
        error => log(`testConcat2 :: in error, error = ${error}`),
        () => log(`testConcat2 :: in complete~~`)
    )
}

export function unsub(){
    log(`unsub :: enter.`)
    const source$ = interval(500);
    const s1 = source$.subscribe(
        value=>log(`unsub :: in next, value = ${value}`),
        error => log(`unsub :: in error, error = ${error}`),
        complete =>log(`unsub :: in next`)
    );
    log(`unsub :: will unsubscribe.`);
    setTimeout(()=>{
        log(`unsub :: will unsubscribe.`);
        s1.unsubscribe();
        log(`unsub :: will subscribe, again.`);
        const s2= source$.subscribe(
            value=>log(`unsub :: in next, value = ${value}`),
            error => log(`unsub :: in error, error = ${error}`),
            complete =>log(`unsub :: in next`)
        );
        log(`s1==s2?  ${s1==s2}`);
    },3000);
    
}
import {Observable, of, range, generate,empty,throwError,never,interval,timer} from "rxjs";
import {map, filter, repeat} from "rxjs/operators";
import log from "../../../util/"
export default function testAsync(){
    log(`testAsync :: enter.`);
    testInterval();
    testTimer1();
    testTimer2();
}

function testInterval(){
    log(`testInterval :: enter.`);
    let source$ = interval(500);
    const subscribtion = source$.subscribe(
        value => log(`testInterval :: next, value = ${value}`),
        error => log(`testInterval :: error, error = ${error}`),
        () => log(`testInterval :: complete`),
    )
    setTimeout(()=>{
        log(`testInterval :: will unsubscribe.`);
        subscribtion.unsubscribe();
    },6000)

}

function testTimer1(){
    log(`testTimer1 :: enter.`);
    let source$ = timer(1500);
    const subscribtion = source$.subscribe(
        value => log(`testTimer1 :: in netxt, value = ${value}`),
        error => log(`testTimer1 :: in error,  error = ${error}`),
        ()=>  log(`testTimer1 :: complete~~~`),
    )
}
function testTimer2(){
    log(`testTimer2 :: enter.`);
    // time传两个参数的时候，第一个参数变为了延迟多少秒执行，第二个参数是间隔参数
    let source$ = timer(1000, 3000);
    const subscribtion = source$.subscribe(
        value =>log(`testTimer2 :: in next , value = ${value}`),
        error =>log(`testTimer2 :: in error, error = ${error}`),
        () =>log(`testTimer2 :: complete~~`)
    );

    let source2$ = timer(20000);
    // 哈哈，这里温习以下另外一种注册方式~~
    source2$.subscribe({
        next(value){
            log(`testTimer2 :: in timer2 next, value = ${value}`);
            subscribtion.unsubscribe();
        },
        error(error){
            log(`testTimer2 :: in timer2 error, error = ${error}`);
        },
        complete(){
            log(`testTimer2 :: in timer2 complete`);
        }
    })
}
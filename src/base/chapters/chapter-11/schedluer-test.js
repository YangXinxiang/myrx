/**
 * 练习scheduler，因为操作符有变了，6.x版本具体操作符可以参考：
 * https://ithelp.ithome.com.tw/articles/10253801
 */
import { from } from "rxjs";
import log from "../../../util/index";
import {of,range, asapScheduler, asyncScheduler} from "rxjs";
import {} from "rxjs/operators";
// import {asap} from "rxjs/scheduler";
export default function testScheduler() {
    log(`testScheduler :: enter.`);
    testScheduler01();
}

function testScheduler01() {
    log(`testScheduler01 :: enter.`);
     const source$ = range(1,5, asyncScheduler);    
    // const source$ = of(1, 2, 3, asyncScheduler)
    log(`testScheduler01 :: before subscribe.`);
    source$.subscribe(
        value => log(`testScheduler01 :: in next , value = ${value}`),
        error => log(`testScheduler01 :: in error , error = ${error}`),
        () => log(`testScheduler01 :: in complete~~`),
    );
    log(`testScheduler01 :: after subscribe.`);
}
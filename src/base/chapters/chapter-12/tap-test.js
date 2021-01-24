import {interval, timer, range} from "rxjs";
import {tap, map} from "rxjs/operators"
import log from "../../../util/index";
export default function testTap(){
    log(`testTap :: enter.`);
    testTap1();
    testTap2();
}
function testTap1(){
    log(`testTap1 :: enter.`);
    const source$ = timer(1000).pipe(
        map(x=>{
            return "AAA ::: ===>>>> "+x
        }),
        tap(vvv=> log(`testTap1 :: in tap 11, vvv = ${vvv}`))
    );

    source$.subscribe(
        value=>log(`testTap1 :: in next, value = ${value}`),
        err => log(`testTap1 :: in error, err = ${err}`),
        ()=>log(`testTap1 :: in complete~~~`),
    )
}
function testTap2(){
    log(`testTap2 :: enter.`);
    const source$ = timer(1000).pipe(
        map(x=>{
            return "AAA ::: ===>>>> "+x
        }),
        tap(vvv=> log(`testTap2 :: in tap 11, vvv = ${vvv}`))
    );
    source$.pipe(tap(vv=>{
        log(`testTap2 :: in tap 22, vv = ${vv}`);
        // 哈哈，这一行不会输出出来，想想为什么？
    }))
    source$.subscribe(
        value=>log(`testTap2 :: in next, value = ${value}`),
        err => log(`testTap2 :: in error, err = ${err}`),
        ()=>log(`testTap2 :: in complete~~~`),
    )
}
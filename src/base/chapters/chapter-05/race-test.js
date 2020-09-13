import {timer} from "rxjs";
import {race, map} from "rxjs/operators";
import log from "../../../util";

export default function testRace(){
    log(`testRace :: enter.`);
    testRace1();
}

/**
 * 公平而残酷的 race， 胜者通吃。
 */
function testRace1(){
    log(`testRace1 :: enter.`);
    const source1$ = timer(0, 2000).pipe(map(x=>x+"a"));
    const source2$ = timer(0, 500).pipe(map(x=>x+"b"));
    const raced$ = source1$.pipe(race(source2$));
    const sub = raced$.subscribe(
        value => log(`testRace1 :: in next, value = ${value}`),
        error => log(`testRace1 :: in error, error = ${error}`),
        () => log(`testRace1 :: in complete~~`),
    );

    setTimeout(()=>{
        sub.unsubscribe();
    },7000)
}
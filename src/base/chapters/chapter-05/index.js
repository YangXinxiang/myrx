/**
 * 第5章， 合并数据流 练习
 * 2020.09.09
 */
import {from} from "rxjs"
import log from "../../../util/";
import testConcat from "./concat";
import testMerge from "./merge-test";
import testZip from "./zip-test";
import testCombineLatest from "./combineLatest-test";
import testWithLatestFrom from "./withLatestFrom-test";
import testRace from "./race-test";
import testStartWith from "./startWith-test";
// import testForkJoin from "./forkJoin";
import testHighOrderObservable from "./highOrderObservable-test";
import testHighOrderObservable2  from "./highOrderObservable-2-test";
export default function startTestC5(){
    log(`startTestC5 :: enter.`);
    // testConcat();
    // testFrom();
    // testMerge();
    // testZip();
    // testCombineLatest();
    // testWithLatestFrom();
    // testRace();
    // testStartWith();
    // testForkJoin();
    // testHighOrderObservable();

    testHighOrderObservable2();
}

function testFrom(){
    log(`testFrom :: enter.`);
    const promise = Promise.resolve("OKOKOK");
    const from$ = from(promise);
    from$.subscribe(
        value => log(`testFrom :: next ${value}.`),
    )
}

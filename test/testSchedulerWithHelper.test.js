/**
 * 使用封装过的helper、marble等来进行单元测试，简化单元测试的书写。
 */
import {merge, timer, interval} from "rxjs";
import {map, take} from "rxjs/operators";
import { testCase } from "../test-Helpers/test-helper";
import {hot, cold, time, expectObservable, expectSubscriptions } from "../test-Helpers/marble-testing";
describe("使用封装的helper、marble等来进行单元测试，简化单元测试的书写", ()=>{

    testCase("测试使用封装的cold", ()=>{
        const source1 =     "----a-----b-----|";
        const source2 =     "----C-----D-----|";
        const expected1 =   "----a-----b-----|";
        const expected =    "----(aC)--(bD)--|";
        const source1$ = cold(source1);
        const source2$ = cold(source2);
        const source$ = merge(source1$, source2$);
        expectObservable(source1$).toBe(expected1);
        expectObservable(source$).toBe(expected);
        // global.rxTestScheduler.expectObservable(source1$).toBe(expected1);
    })

    testCase("测试使用封装的time", ()=>{
        const timeStr =   "-0123|";   
        // 测试时间。
        const usedTime = time(timeStr);  // time 返回的事一个数字哈~~ 要注意。
        expect(usedTime).toBe(50); // 这里得使用框架原生的去断言

        const expected = "-012(3|)"; // 每个字符之间表示有一帧的间隔，同一时间内来多个数据，用()括起来       
        // 如果直接测试interval ，可以这样， 注意，要传入第2个参数 scheduler
        const source$ = interval(10, global.rxTestScheduler).pipe(
            map(x=>x.toString()), // 转换为字符串去比较
            take(4)
        )
        expectObservable(source$).toBe(expected);
    })
})

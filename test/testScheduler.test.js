import {range, of, timer, interval} from "rxjs";
import {take} from "rxjs/operators";
import {TestScheduler} from "rxjs/testing";

let scheduler;
let current;

describe("测试RxJs异步", ()=>{
    beforeEach(()=>{
        // 构造函数的参数中执行真正的断言，不是自己去比较actual和expected， 而是用断言工具去比较
        scheduler = new TestScheduler((actual, expected) => {
            console.log(`new TestScheduler :: enter, a = ${JSON.stringify(actual)}, b = ${JSON.stringify(expected)}`);
            expect(actual).toEqual(expected); // 执行真正的断言判断
            // expect(11).toEqual(1); // 必然失败
            // return actual === expected; // 这样自己手工比较是没有用的。
        });
    })
    it("弹珠图测试1", ()=>{
        const source = "--a--b--|";
        const expected = "--a--b--|";
        const source$ = scheduler.createColdObservable(source);
        scheduler.expectObservable(source$).toBe(expected);
        scheduler.flush(); // 准备去真正的断言。
        
    })
})


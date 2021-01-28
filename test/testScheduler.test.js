import {range, of, timer, interval} from "rxjs";
import {take, map} from "rxjs/operators";
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

    it("测试一个map", ()=>{
        const source = "--a--b--|";
        const expected = "--a--b--|";
        const source$ = scheduler.createColdObservable(source, {a:2,b:5}); // 第2个参数传入真正的数据
        // 测试操作符
        scheduler.expectObservable(source$.pipe(
            map(x=>x*2)
        )).toBe(expected, {a:4,b:10}); // toBe的第2个参数传入期待的结果
        scheduler.flush(); // 准备去真正的断言。
    })

    it("测试一个时间用例", ()=>{
        const source = "-----|";
        const time = scheduler.createTime(source);
        console.log(`测试一个时间, time = ${time}`);
        expect(time).toEqual(50); // 执行真正的断言判断
    })
})


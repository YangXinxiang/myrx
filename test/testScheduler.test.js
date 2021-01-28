import {range, of, timer, interval,empty, throwError, never,merge, concat} from "rxjs";
import {take, map, } from "rxjs/operators";
import {TestScheduler} from "rxjs/testing";

let scheduler;
let current;

describe("测试RxJs异步", ()=>{
    beforeEach(()=>{
        // 构造函数的参数中执行真正的断言，不是自己去比较actual和expected， 而是用断言工具去比较
        scheduler = new TestScheduler((actual, expected) => {
            console.log(`new TestScheduler :: enter, actual = ${JSON.stringify(actual)}, expected = ${JSON.stringify(expected)}`);
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

    it("测试 empty", ()=>{
        const expected = "|";
        scheduler.expectObservable(empty()).toBe(expected);
        scheduler.flush();
    })

    it("测试抛出错误 throwError", ()=>{
        const expected = "#";
        const source$ = throwError("error"); // 这个参数error貌似只能是error啊
        scheduler.expectObservable(source$).toBe(expected);
        scheduler.flush();
    })

    it("测试 never类型的操作符", ()=> {
        const expected = "-";
        scheduler.expectObservable(never()).toBe(expected);
        scheduler.flush();
    })

    it("测试interval", ()=>{
        const expected = "-012(3|)"; // 每个字符之间表示有一帧的间隔，同一时间内来多个数据，用()括起来
        const source$ = interval(10,scheduler).pipe(        
            take(4),
            map(x=>x.toString()) // 因为expected是字符串，而x是数字，需要转换为字符串
        );
        scheduler.expectObservable(source$).toBe(expected);
        scheduler.flush();
    })

    it("测试timer，（扩展练习）", ()=>{
        const expected = "--(0|)";
        const source$ = timer(20,scheduler).pipe(
            map(x=>x.toString()) // 因为expected是字符串，而x是数字，需要转换为字符串
        );
        scheduler.expectObservable(source$).toBe(expected);
        scheduler.flush();
    })

    it("测试merge", ()=>{
        const source1 =     "-i----b---|";
        const source2 =     "-w----d---|";
        const expected =    "-(iw)-(bd)|";
        const source1$ = scheduler.createColdObservable(source1);
        const source2$ = scheduler.createColdObservable(source2);
        const merged$ = merge(source1$, source2$);
        scheduler.expectObservable(merged$).toBe(expected);
        scheduler.flush();

    })

    it("测试concat， （扩展练习）", ()=>{
        const source1 =     "--a----b---|";
        const source2 =     "--c----d---|";
        const expected =    "--a----b-----c----d---|";
        const source1$ = scheduler.createColdObservable(source1);
        const source2$ = scheduler.createColdObservable(source2);
        const concated$ = concat(source1$, source2$);
        scheduler.expectObservable(concated$).toBe(expected);
        scheduler.flush(); // 必须要有flush啊
    })
})


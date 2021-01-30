import {range, of, timer, interval,empty, throwError, never,merge, concat} from "rxjs";
import {take, map, } from "rxjs/operators";
import {TestScheduler} from "rxjs/testing";



describe("测试RxJs异步", ()=>{
    let scheduler;
    beforeEach(()=>{
        // 构造函数的参数中执行真正的断言，不是自己去比较actual和expected， 而是用断言工具去比较
        scheduler = new TestScheduler((actual, expected) => {
            console.log(`new TestScheduler [11]:: enter, actual = ${JSON.stringify(actual)}, expected = ${JSON.stringify(expected)}`);
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

    it("测试hot observable", ()=>{
        const source1 =     "--a----^b-----c---|";
        const source2 =     "-------^d-----e---|";
        const expected =           "-(bd)--(ce)|";
        const expected1 =           "-b-----c---|";
        const hotSource1$ = scheduler.createHotObservable(source1);
        const hotSource2$ = scheduler.createHotObservable(source2);
        const merged$ = merge(hotSource1$, hotSource2$);
        scheduler.expectObservable(merged$).toBe(expected);
        scheduler.expectObservable(hotSource1$).toBe(expected1);
        scheduler.flush();
    })


    it("测试hot observable 和cold observable结合", ()=>{
        const source1 = "--a----^c------d---|";
        const source2 =        "-e---f------g|";
        const expected =       "-(ce)f--d---g|";
        const source1$ = scheduler.createHotObservable(source1);
        const source2$ = scheduler.createColdObservable(source2);
        const merged$ = merge(source1$, source2$);
        scheduler.expectObservable(merged$).toBe(expected);
        scheduler.flush();
    })
})

describe("测试subscribe和unsubscribe等用例", ()=>{
    let scheduler;
    beforeEach(()=>{
        scheduler = new TestScheduler((actual, expected)=>{
            console.log(`new TestScheduler [22]:: enter, actual = ${JSON.stringify(actual)}, expected = ${JSON.stringify(expected)}`);
            expect(actual).toEqual(expected);
        })
    })

    it("测试注册subscribe和反注册unsubscribe", ()=>{
        const source1 =     "--a---b---|";
        const source2 =               "---c-d-----|";
        // ^可以出现在创建【热播】的source源字符串中，也可以出现在判断冷播的subscriptions中。
        // 但是，^不可以出现在创建【冷播】的source源字符中。
        const source1Sub =  "^---------!"; 
        const source2Sub = "";
        const expected=     "--a---b------c-d-----|"; // 重点检查时机
        const source1$ = scheduler.createColdObservable(source1);
        const source2$ = scheduler.createColdObservable(source2);
        const concated$ = concat(source1$,source2$);
        scheduler.expectObservable(concated$).toBe(expected);
        scheduler.expectSubscriptions(source1$.subscriptions).toBe(source1Sub);

        //scheduler.expectSubscriptions(src1$.subscriptions).toBe(expectedSub1);
        //
        //
        scheduler.flush();
    })

    it("测试热播的subdcribe 和 unsubscribe", ()=>{
        const source1 = "---a---^b----c-----d---|";
        const expected =       "-b----c-----d---|";
        const expectedSub1 =   "^---------------!";
        const source1$ = scheduler.createHotObservable(source1);
        scheduler.expectObservable(source1$).toBe(expected);
        scheduler.expectSubscriptions(source1$.subscriptions).toBe(expectedSub1);
        scheduler.flush();
    })
})



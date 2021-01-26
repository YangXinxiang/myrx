import {range, of, timer, interval} from "rxjs";
import {take} from "rxjs/operators";
import {TestScheduler} from "rxjs/testing";

let scheduler;
let current;

describe("测试RxJs异步", ()=>{
    beforeEach(()=>{
        scheduler = new TestScheduler((actual, expected) => {
            console.log(`new TestScheduler :: enter, a = ${JSON.stringify(actual)}, b = ${JSON.stringify(expected)}`);
            expect(actual).toEqual(expected);
        });
    })
    it("第一个RxJs测试", ()=>{
        const source = "--a--b--|";
        const expected = "--a--b--|";
        const source$ = scheduler.createColdObservable(source);
        scheduler.expectObservable(source$).toBe(expected);
        scheduler.flush();
        
    })
})


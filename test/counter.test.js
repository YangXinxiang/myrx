import { testCase } from "../testHelpers/test-helper";
import {hot, cold, time, expectObservable, expectSubscriptions } from "../testHelpers/marble-testing";
// 导入真实需要测试的方法
import { counterPipe,startCount } from "../src/base/chapters/chapter-12/counter";

describe("使用封装的测试框架，测试真实的CASE", ()=>{
    testCase("测试counter", ()=>{
        // Step 1 : 准备数据
        const marblePlus =  "^-a----b-----f----g--|";
        const marbleMinus=  "^----c----d------------e|";
        const expected =    "--h--i-j--k--l----m----n|"; // 很有意思，哈哈，用参数替换
        const plus$ =hot(marblePlus);
        const minus$ = hot(marbleMinus);

        // Step 2 : 执行测试函数
        const result$ = counterPipe(plus$, minus$);

        // Step 3 : 开始断言，第2个参数很有意思，会替换掉第一个参数中对应的字段。
        expectObservable(result$).toBe(expected, {
            h:1,
            i:0,
            j:1,
            k:0,
            l:1,
            m:2,
            n:1,
        });
    })
})
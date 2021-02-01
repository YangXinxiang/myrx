import {of} from "rxjs"
import {delay} from "rxjs/operators"
import { testCase } from "../testHelpers/test-helper";
import {hot, cold, time, expectObservable, expectSubscriptions } from "../testHelpers/marble-testing";
// 导入真实需要测试的方法
import {
    createDomEvent$,
    fetch,
    observeResult,
    createSearchPipe,
    startSearch,
 } from "../src/base/chapters/chapter-12/search";


 describe("测试RxJS实现的输入、搜索", ()=>{
    testCase("测试核心数据流， 验证节流效果", ()=>{
        const duration = 40; // 节流的时间
        const delyTime = 40; // 模拟返回数据的延时时间
        const mockAPI = (query)=>{
            const obj = {
                r:["react","redux", "rxjs", "relax"],
                rx:["rxjs", "rxjhahah","relax"],
                rxj:["rxjs", "rxjhahah"],
                rxjs:["rxjs"]
            }
            const data = obj[query.toLowerCase()];
            return of(data);
            return of(data).pipe(
                delay(duration, global.rxTestScheduler)
            );
        }

        const sourceStr = "^--a-b----c-----|";
        const expected  = "---------x----y-|";
        const mockKeyup$ = hot(sourceStr,{
            a: {target: {value: "r"}},
            b: {target: {value: "rx"}},
            c: {target: {value: "rxj"}},
        });
        
        // Step 2: 测试方法
        const result$ = createSearchPipe(mockKeyup$, mockAPI, duration, global.rxTestScheduler)

        // Step 3: 断言
        expectObservable(result$).toBe(expected,{
            x: ["rxjs", "rxjhahah","relax"],
            y: ["rxjs", "rxjhahah"],
        });
    })

    testCase("测试核心数据流， 验证异步获取数据逻辑：第一个数据没返回的时候，再触发第二次请求，放弃第一次请求", ()=>{
        // 步骤1： 准备测试环境
        const keyup =       "^-a--b-------c---|"; // a: 20+60 = 80
        const expected =    "-----------x-------(y|)"; // 注意最后结束是同时的，必须括起来
        const duration = 0; // 为了便于测试，将debounceTime的时间设置的比较短，为0
        const delayTime = 60;  // 异步请求返回的延时时间
        // 模拟结果
        const mockObj = {
            r   : ["react","redux", "rxjs", "relax"],
            rx  : ["rxjs", "rxjhahah","relax"],
            rxj : ["rxjs", "rxjhahah"],
            rxjs: ["rxjs"]
        }
        // 模拟键盘输入事件
        const keyup$ = hot(keyup, {
            a : {target:{value:"r"}},
            b : {target:{value:"rx"}},
            c : {target:{value:"rxj"}},
        })

        const mockAPI = (query)=>{
            const data  = mockObj[query];            
            return of(data).pipe(
                delay(delayTime, global.rxTestScheduler)
            )
        }
        // 步骤2： 执行测试函数
        const result$ = createSearchPipe(keyup$,mockAPI,duration,global.rxTestScheduler);

        // 步骤3： 断言
        expectObservable(result$).toBe(expected,{
            x : mockObj["rx"],
            y : mockObj["rxj"]
        })
    })
 })
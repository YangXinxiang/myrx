import { interval } from "rxjs";
import {TestScheduler} from "rxjs/testing";
function testCase(description, testFn){
    console.log(`testCase :: enter, description = ${description}, testFn.length = ${testFn.length}`);
    if(testFn.length ===0){
        it(description, ()=>{
            global.rxTestScheduler = new TestScheduler((actual, expected)=>{
                console.log(`testCase :: new TestScheduler, actual = ${JSON.stringify(actual)}, expected = ${JSON.stringify(expected)}`);
                expect(actual).toEqual(expected)
            })
            console.log(`testCase :: global.rxTestScheduler = ${global.rxTestScheduler}`);
            try{
                testFn();
                global.rxTestScheduler.flush();
            }finally{
                global.rxTestScheduler = null;
            }
        })               
    }else{
        // 如果testFn 有传参，也就是想异步的控制调用done，使用原来的
        it(...arguments);
    }
}
export {
    testCase
}
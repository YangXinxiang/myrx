/**
 * 在node环境练习一下rxjs的fromEvent
 * 2020.08.29  11：30 测试都通过， 运行： 
 * node fromEvent-node-test.js 
 */
const EventEmitter = require("events");
const {fromEvent} = require("rxjs");

function testestFromEvent2(){
    console.log(`testestFromEvent2 :: enter.`);
    const emitter = new EventEmitter();

    emitter.emit("starEvent",{"name":"接收不到",age:19});
    // 普通的注册事件
    emitter.on("starEvent",(event)=>{
        console.log(`testestFromEvent2 :: on starEvent, event = ${JSON.stringify(event)}`);
    });

    emitter.emit("starEvent",{"name":"刘亦菲",age:20}); // on 能接收到~~

    // 包装成rxjs的 Obserable， hot 的
    let source$ = fromEvent(emitter,"starEvent");
    source$.subscribe(
        value => console.log(`testestFromEvent2 :: in next, value = ${JSON.stringify(value)}`),
        error => console.log(`testestFromEvent2 :: in error, error = ${error}`),
        () => console.log(`testestFromEvent2 :: in complete~~`),
    );

    emitter.emit("starEvent",{"name":"杨超越",age:19});
}

testestFromEvent2();
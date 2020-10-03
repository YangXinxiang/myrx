/**
 * 这个是2020.09.20 魏凯培训后的几个疑惑点练习
 * 几个Todo:
1，测试一下fromEvent对移动端点击事件的支持。
2，试一下在web环境下使用 fromEventPattern
3，测试一下rxjs在v6.x版本下fromPromise操作符是否还有，是否还可以用。
4，测试一下rxjs在v6.x版本下ajax操作符是否还有，是否还可以用。
5，再想想defer的使用场景。
 */
import {of,timer, interval, fromEvent,fromEventPattern} from "rxjs";
import {repeatWhen, repeat} from "rxjs/operators";
import log from "../../../util/";
export default function exercise4(){
    log(`exercise4 :: enter.`);

    testFromEventPattern();
}

function testFromEventPattern(){
    const wsurl = "ws://123.207.136.134:9010/ajaxchattest";
    const ws = new WebSocket(wsurl);

    const addHandle = handler => {
        ws.addEventListener("message",handler );
    }
    const removeHandle = handler => {
        ws.addEventListener("close",handler );
    }

    const source$ = fromEventPattern(addHandle, removeHandle);
    source$.subscribe(
        value => {
           // debugger;
            log(`testFromEventPattern :: in next, value = ${value.data}`)
        },
        error => log(`testFromEventPattern :: in error, error = ${error}`),
        () => log(`testFromEventPattern :: in complete~~`),
    )

    ws.addEventListener("open", ()=>{
        const info = "Hello "
        log(`testFromEventPattern ::  on open, will send [${info}]`);
        ws.send(info);
    })
    
    ws.addEventListener("close", ()=>{
        log(`testFromEventPattern ::  on close~~`);
    })
    setTimeout(()=>{
        const info = "World~~~"
        log(`testFromEventPattern :: will send [${info}]`);
        ws.send(info);
    },2000);

    setTimeout(()=>{
        log(`testFromEventPattern :: will close ws~~`)
        ws.close();
    },5000);
    //ws.o
}


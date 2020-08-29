/**
 * 在node环境练习一下rxjs的fromEventPattern， 这个方法用的不多，还没想到很好的运用场景
 * 2020.08.29  12：30 测试都通过， 运行： 
 * node fromEventPattern-node-test.js 
 */
const { fromEventPattern } = require("rxjs");
const EventEmitter = require("events");
function testfromEventPattern(){
    log(`testfromEventPattern :: enter.`);
    const emitter = new EventEmitter();
    function addEvent(handler){
        log(`testfromEventPattern :: addEvent :: enter.`);
        emitter.on("msg", handler);
    }
    function removeEvent(handler){
        log(`testfromEventPattern :: removeEvent :: enter.`);
        emitter.off("msg", handler);
    }

    function whatsThis(handler){
        log(`testfromEventPattern :: whatsThis :: enter.`);
        
    }

    /**
     * source$ {Obserable} , fromEventPattern 包装一个的Obserable对象，
     * 第一个参数： addEvent, 一个接收handle函数参数的函数，在subscribe的时候会调用addEvent
     * 第二个参数： removeEvent,  一个接收handle函数参数的函数，在unsubscribe的时候会调用
     * 
     * addEvent、removeEvent中的参数handle在被调用的时候，相当于调用obserable中产生数据的observer的next方法
     */
    const source$ = fromEventPattern(addEvent, removeEvent);

    const subscribtion =  source$.subscribe(
        value => log(`testfromEventPattern :: subscribe in next, value = ${value}`),
        error => log(`testfromEventPattern :: subscribe in error, error = ${error}`),
        () => log(`testfromEventPattern :: subscribe in complete~~~`),
    );

    
    
    // 触发事件
    emitter.emit("msg","hello");
    emitter.emit("msg","world");

    subscribtion.unsubscribe();
    emitter.emit("msg","end~~");

}

function testNormalEvent(){
    log(`testNormalEvent :: enter.`);
    const emitter = new EventEmitter();
    function addEvent(handler){
        log(`testNormalEvent :: addEvent :: enter.`);
        emitter.on("msg", handler);
    }
    function removeEvent(handler){
        log(`testNormalEvent :: removeEvent :: enter.`);
        emitter.off("msg", handler);
    }

    addEvent(log);
    // 触发事件
    emitter.emit("msg","hello");
    emitter.emit("msg","world");

    removeEvent(log);
    emitter.emit("msg","end~~");

}
function log(...args){
    let prefix = "[myrxjs] ";
    console.log(prefix, ...args);
}


// testNormalEvent();
testfromEventPattern();
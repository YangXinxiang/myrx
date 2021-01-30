/**
 * 简化单元测试的编写，封装一层创建observable，断言observable
 * 
 */

function hot(){
    if(!global.rxTestScheduler){
        throw(`Errorr, opps, no global.rxTestScheduler, maybe it is not in test evn~~`);
    }
    return global.rxTestScheduler.createHotObservable(...arguments);
}
function cold(source, payload){
    debugger;
    if(!global.rxTestScheduler){
        throw(`Errorr, opps, no global.rxTestScheduler, maybe it is not in test evn~~`);
    }
    return global.rxTestScheduler.createColdObservable(...arguments);
}

function time() {
    if(!global.rxTestScheduler){
        throw(`Errorr, opps, no global.rxTestScheduler, maybe it is not in test evn~~`);
    }
    return  global.rxTestScheduler.createTime(...arguments);
}

function expectObservable(){
    if(!global.rxTestScheduler){
        throw(`Errorr, opps, no global.rxTestScheduler, maybe it is not in test evn~~`);
    }
    // 这里不断言，其实根据项目来看哈。
    return global.rxTestScheduler.expectObservable(...arguments)
}

function expectSubscriptions(){
    if(!global.rxTestScheduler){
        throw(`Errorr, opps, no global.rxTestScheduler, maybe it is not in test evn~~`);
    }
    return global.rxTestScheduler.expectSubscriptions(...arguments); // .toBe(expected);
}

export {
    hot,
    cold,
    time,
    expectObservable,
    expectSubscriptions,
}
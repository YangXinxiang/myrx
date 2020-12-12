import log from "../../../util/index";
import {Subject, interval, merge, fromEvent} from "rxjs";
import { take, multicast,map, refCount, publish, share} from "rxjs/operators";
export default function testPublishAndShare(){
    log(`testPublishAndShare :: enter.`);
    // testPublish();
    testShare();
}

// publish的实现类似
/* 这是辅助理解publish的示例代码，核心逻辑就是如此，只是对multicast的简单封装。
function publish(selector){
    if(selector){
        // 这种方式只是大致理解，还是懵逼中。。。
        return this.multicast(()=>new Subject(), selector);
    }else{
        return this.multicast(new Subject())
    }
}
*/
function testPublish(){
    log(`testPublish :: enter.`);
    const tick$ = interval(1000).pipe(take(3));
    const sharedTick$ = tick$.pipe(
        publish(),
        refCount()
    );
    sharedTick$.subscribe(
        value => log(`testPublish :: subscribe [1] , in next, value = ${value}`),
        error => log(`testPublish :: subscribe [1] , in error, error = ${error}`),
        () => log(`testPublish :: subscribe [1] , in complete~~~`),
    )
    // 接收到的上游数据为：1s: 0, 2s: 1, 3s: 2, 然后会调用observer的complete~~
    // 悲催的事，此时的observer是中间人subject，这个subject是publish固定封装传入的，因此，中间人此时完结了。。。
    // 此时再注册，已经拿不到数据，而是直接拿到一个完结的消息。
    setTimeout(()=>{
        sharedTick$.subscribe(
            value => log(`testPublish :: subscribe [2] , in next, value = ${value}`),
            error => log(`testPublish :: subscribe [2] , in error, error = ${error}`),
            () => log(`testPublish :: subscribe [2] , in complete~~~`),
        )
    },5000)

}

// share跟publish 很像，同样， 要理解share，直接上示例代码
/*
function shareSubjectFactory() {
    return new Subject();
}

function share() {
    return multicast.call(this, shareSubjectFactory).refCount();
}
function share2(){
    return this.multicast(()=>new Subject()).refCount()
}
*/

function testShare(){
    log(`testShare :: enter.`);
    const coldSource$ = interval(1000).pipe(take(3));
    const sharedTick$ = coldSource$.pipe(
        share()
    )
    // share 本身已经封装调用了 refCount， 不再需要手工调用，直接注册即可。
    sharedTick$.subscribe(
        value => log(`testShare :: subscribe [1] , in next, value = ${value}`),
        error => log(`testShare :: subscribe [1] , in error, error = ${error}`),
        () => log(`testShare :: subscribe [1] , in complete~~~`),
    )
    // 接收到的上游数据为：1s: 0, 2s: 1, 3s: 2, 然后会调用observer的complete~~
    setTimeout(()=>{
        sharedTick$.subscribe(
            value => log(`testShare :: subscribe [2] , in next, value = ${value}`),
            error => log(`testShare :: subscribe [2] , in error, error = ${error}`),
            () => log(`testShare :: subscribe [2] , in complete~~~`),
        )
    },2000)
    // 注意跟上面的testPublish的区别，3s的时候，上游coldSource$ 完结，会调用中间人完结。
    // 第5秒的时候，再次注册，因为，此时中间人subject已经完结，share封装的multicast参数是一个函数
    // 因此会再次调用该函数，生成一个新的中间人subject去连接上下游。
    setTimeout(()=>{
        sharedTick$.subscribe(
            value => log(`testShare :: subscribe [3] , in next, value = ${value}`),
            error => log(`testShare :: subscribe [3] , in error, error = ${error}`),
            () => log(`testShare :: subscribe [3] , in complete~~~`),
        )
    },5000)
}
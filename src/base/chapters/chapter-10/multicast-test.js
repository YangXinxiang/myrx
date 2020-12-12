import log from "../../../util/index";
import {Subject, interval, merge, fromEvent} from "rxjs";
import { take, multicast,map, refCount} from "rxjs/operators";
export default function testMulticast(){
    log(`testMulticast :: enter.`);
    // testMulticast1();
    testMulticast2();
    //testMulticastWithRefCount1();
}
/**
 * 测试使用multicast产生热播数据流，该方法测试使用connect。
 * 要注意调用multicast的时候传入的参数的区别，传入new Subject()还是传入产生subject的工厂函数，差别比较大。
 */
function testMulticast1(){
    log(`testMulticast1 :: enter.`);
    const coldSource$ = interval(1000).pipe(
        // 使用map主要是记录一行日志，方便看过程。
        map(x=>{
            log(`testMulticast1 :: colderSource map enter, x = ${x}`);
            return x;
        }), take(4)        
    );
    const subjectFactory = ()=> {
        log(`testMulticast1 :: subjectFactory enter.`);
        return new Subject();
    }
    const hot$ = coldSource$.pipe(
         multicast(new Subject())
        // multicast(subjectFactory) // 如果这里传的是一个工厂函数会是什么样呢？
        // 实测： 如果参数使用的是工厂方法，在完结之后再添加的observer的时候，会调用subjectFactory，但那是并不会再去跟上游数据连接，也收不到完结消息。
        // 如果参数直接传new Subject()，在完结之后添加的observer的时候，能收到完结消息，表现跟直接使用Subject是一样的。
    );
    /*
    // 对比测试，跟直接使用subject做一个对比测试
    const hot$ = new Subject();
    coldSource$.subscribe(hot$);*/   
    hot$.subscribe(
        value => log(`testMulticast1 :: subscribe [1] , in next, value = ${value}`),
        error => log(`testMulticast1 :: subscribe [1] , in error, error = ${error}`),
        () => log(`testMulticast1 :: subscribe [1] , in complete~~~`),
    );
    setTimeout(()=>{
        hot$.subscribe(
            value => log(`testMulticast1 :: subscribe [2] , in next, value = ${value}`),
            error => log(`testMulticast1 :: subscribe [2] , in error, error = ${error}`),
            () => log(`testMulticast1 :: subscribe [2] , in complete~~~`),
        );
        // 调用hot$【ConnectableObservable】的connect方法的时候，才打开上游数据源和下游的开关，也就是这时候，才去 subscribe上游冷播数据
        hot$.connect(); 
    },1500);
    setTimeout(()=>{
        hot$.subscribe(
            value => log(`testMulticast1 :: subscribe [3] , in next, value = ${value}`),
            error => log(`testMulticast1 :: subscribe [3] , in error, error = ${error}`),
            () => log(`testMulticast1 :: subscribe [3] , in complete~~~`),
        )
    },6000);
    //吐出数据的时间点 2.5s : 0   3.5s  :1,     4.5s:2      5.5s: 3  complete
}

/**
 * 再练习一遍 multicast， 使用 connect
 */
function testMulticast2(){
    log(`testMulticast2 :: enter.`);
     const coldSource$ = interval(1000).pipe(take(3));
     // multicast 在传入一个参数的时候，返回的是一个ConnectableObservable实例
     const hot$ = coldSource$.pipe(
         multicast(new Subject()),
         refCount()
     );

     const subscribtion = hot$.subscribe(
         value => log(`testMulticast2 :: observer[1], in next ,vaule = ${value}`),
         error => log(`testMulticast2 :: observer[1], in error ,error = ${error}`),
         ()=>log(`testMulticast2 :: observer[1], in complete~~`)
     )

     setTimeout(()=>{
        subscribtion.unsubscribe(); // 取消注册之后，hot$就没有observer了，会取消对上游的订阅，但是注意哈，此时multicast使用的subject还是处于可用状态的。
        return;
        hot$.subscribe(
            value => log(`testMulticast2 :: observer[2], in next ,vaule = ${value}`),
            error => log(`testMulticast2 :: observer[2], in error ,error = ${error}`),
            ()=>log(`testMulticast2 :: observer[2], in complete~~`)
        )
     },1500)

     setTimeout(()=>{
        // 再给热播数据添加observer，此时中间人会重新订阅上游数据，数据会从头开始。
        hot$.subscribe(
            value => log(`testMulticast2 :: observer[3], in next ,vaule = ${value}`),
            error => log(`testMulticast2 :: observer[3], in error ,error = ${error}`),
            ()=>log(`testMulticast2 :: observer[3], in complete~~`)
        )
     },2000);
     //hot$.connect();
}

/**
 * 练习使用multicast，使用refCount操作符自动注册上游数据。
 */
function testMulticastWithRefCount1(){
    log(`testMulticastWithRefCount1 :: enter.`);
    const coldeSource$ = interval(1000).pipe(
        // 加个map记录日志，方便看过程。
        map(x=>{
            log(`testMulticastWithRefCount1 :: coldeSource$ generating data, x = ${x}`);
            return x;
        }), take(4)
    );
    const subjectFactory = ()=> {
        log(`testMulticast1 :: subjectFactory enter.`);
        return new Subject();
    };
    const hot$ = coldeSource$.pipe(
        //multicast(new Subject()), // 直接传Subject，上游一旦完结，后续再给产生的热播添加observer，就拿不到数据啦，直接收到完结消息，跟直接使用subject一样。
        // 使用工厂函数： 在时间不重合的时候，也就是每次subscribe上游的时候上游已经完结，上游已经表现跟冷播基本一样；
        // 因为multicast会去检查它产生的 connectableObservable是否已经完蛋，如果已经完蛋，重新调用工厂方法要一个subject，重新注册上游获取数据.
        // 但是，但是当时间有重合，哈哈，就不一样啦，数据源就是同一份。。
        multicast(subjectFactory), 
        
    );
    setTimeout(()=>{
        log(`testMulticastWithRefCount1 :: in setTimeout [1500]`);
        hot$.subscribe(
            value => log(`testMulticastWithRefCount1 :: subscribe [1], in next ,value = ${value}`),
            error => log(`testMulticastWithRefCount1 :: subscribe [1], in error ,error = ${error}`),
            () => log(`testMulticastWithRefCount1 :: subscribe [1], in complete~~`),
        );
    }, 1500);

    setTimeout(()=>{
        log(`testMulticastWithRefCount1 :: in setTimeout [3500]`);
        hot$.subscribe(
            value => log(`testMulticastWithRefCount1 :: subscribe [2], in next ,value = ${value}`),
            error => log(`testMulticastWithRefCount1 :: subscribe [2], in error ,error = ${error}`),
            () => log(`testMulticastWithRefCount1 :: subscribe [2], in complete~~`),
        );
    }, 3500);

    setTimeout(()=>{
        log(`testMulticastWithRefCount1 :: in setTimeout [6000]`);
        hot$.subscribe(
            value => log(`testMulticastWithRefCount1 :: subscribe [3], in next ,value = ${value}`),
            error => log(`testMulticastWithRefCount1 :: subscribe [3], in error ,error = ${error}`),
            () => log(`testMulticastWithRefCount1 :: subscribe [3], in complete~~`),
        );
    }, 6000);
    log(`testMulticastWithRefCount1 :: ennd.`);

    // 上游吐出数据： 2.5s: 0, 3.5s 1, 4.5s: 2, 5.5s: 3 -->  complete~~
    // 6s: 再次注册，如果参数是new Subject()， 此时立即收到一个完结的消息
    // 6s: 再次注册，如果参数是工厂方法， 会调用工厂方法重新获取subject，重新subscribe上游冷播数据来获取数据。。
}
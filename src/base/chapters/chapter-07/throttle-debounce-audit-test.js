// https://www.processon.com/view/link/5f6cb7c01e08531ce9d5fad6
import {of, timer, interval, fromEvent, Observable, concat} from "rxjs";
import {take, throttle, throttleTime, debounce,debounceTime, map, mapTo,filter, auditTime, audit , sampleTime, sample} from "rxjs/operators";
import log from "../../../util";
export default function testThrottleAndDebounce(){
    log(`testThrottleAndDebounce :: enter.`);
    // testSetInterval(); // 回顾一下JS基础
    // testInterval();    // 回顾一下之前的interval操作符。
    // testThrottleTime1();
    // testThrottleTime2();
    // testDebounceTime1();
    
    // testDebounceTime2();


    // testThrottle();
    // testDebounce();

    // testAuditTime1();
    //testThrottleTime3();

    // testAudit1();

    // testSampleTime();
    testSample();
}
/**
 * 复习一下之前的基础interval
 * interval 按指定的时间间隔持续产生数据，数据不是从0ms的时候开始，是从interval的参数指定的时间间隔开始产生：
 * 也就是比如 interval(1000)：
 *  0ms的时候，不产生数据
 * 1000ms的时候，产生第一个数据 0
 */
function testInterval(){
    log(`testInterval :: enter.`);
    const source$ = interval(1000).pipe( take (5));
    // const newData$ =  source$.pipe( throttleTime(1000) );
    source$.subscribe(
        value => log(`testThrottleTime1 :: in next, value = ${value}`),
        error => log(`testThrottleTime1 :: in error, error = ${error}`),
        () => log(`testThrottleTime1 :: in complete~~`)
    )
}
// 复习一下基础，setInterval， 在第一个时间间隔之后才执行回调。
function testSetInterval(){
    log(`testSetInterval :: enter.`);
    let count =0;
    const inte = setInterval(() => {
        log(`testSetInterval :: count = ${count}`);
        count++;
        if(count >=5){
            clearInterval(inte);
        }
    }, 1000);

}
/**
 * throttleTime, 
 * throttleTime会在收到第一个数据的时候，第一时间将数据转出给下游。
 * 同时，开始启动计时duration，在本次duration范围内的所有数据被抛弃。
 * 直到下一次计时启动，下一次duration范围内的第一个数据被接收转发给下游。周而复始。
 * 每次duration结束之后，不会马上启动一个节流周期；而是会等到上游的下一个数据过来的时候才会再启动节流逻辑。
 * 
 */
function testThrottleTime1() {    
    const enterTime = new Date().getTime();
    let uesedTime = 0;
    log(`testThrottleTime1 :: enter, uesedTime = ${uesedTime}`);
    // const source$ = interval(900);
    /**/
    const source$ = interval(900).pipe(
        filter(x=>{
            uesedTime = new Date().getTime() - enterTime;
            log(`testThrottleTime1 :: in filter x = ${x}, uesedTime = ${uesedTime}`);
            return x>=0;
        }), 
        take(20) 
    );
    const newData$ =  source$.pipe( throttleTime(1000) );
    newData$.subscribe(
        value => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testThrottleTime1 :: in next, value = ${value}, uesedTime = ${uesedTime}`)
        },
        error => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testThrottleTime1 :: in error, error = ${error}, uesedTime = ${uesedTime}`)
        },
        () => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testThrottleTime1 :: in complete~~, uesedTime = ${uesedTime}`)
        }
    )
}

/**
 * debounceTime
 * 在指定的时间参数dueTime内，只要获得一个数据，就开始启动计时，看未来的dueTime内是否还有数据产生。
 * 如果有：废弃之前的数据，重新开始计时。
 * 如果没有新的数据产生，将本次时段内的数据转给下游。是在dueTime结束的时候转给下游。
 */
// 不会产生数据，因为上游产生数据的时间间隔要小于debounceTime的dueTime，每次来数据都会重新计时，废掉上一个数据。
function testDebounceTime1(){
    log(`testDebounceTime1 :: enter.`);
    const source$ = interval(500);
    const newData$ =  source$.pipe( debounceTime(1000) );
    newData$.subscribe(
        value => log(`testDebounceTime1 :: in next, value = ${value}`),
        error => log(`testDebounceTime1 :: in error, error = ${error}`),
        () => log(`testDebounceTime1 :: in complete~~`)
    )
}

//为了做对比，throttleTime和debounceTime的源都做一个过滤。
function testThrottleTime2() {
    log(`testThrottleTime2 :: enter.`);
    // 过滤掉一些数据，每1500ms产生一个数据： 0、3、6、9、12
    const source$ = interval(1000).pipe(take(15));
    /*
    const source$ = interval(500).pipe( 
        filter( x => x%3 ===0 ),
        take(5)
        );*/
    const newData$ =  source$.pipe( throttleTime(2000) );
    newData$.subscribe(
        value => log(`testThrottleTime2 :: in next, value = ${value}`),
        error => log(`testThrottleTime2 :: in error, error = ${error}`),
        () => log(`testThrottleTime2:: in complete~~`)
    )
}

function testDebounceTime2(){
    const enterTime = new Date().getTime();
    let uesedTime = 0;
    log(`testDebounceTime2 :: enter, uesedTime = ${uesedTime}`);
    const source$ = interval(500).pipe( 
        filter( x => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testDebounceTime2 :: in filter x = ${x}, uesedTime = ${uesedTime}`);
            return x%3 ===0
        } ),
        take(5)
        ); 
    const newData$ =  source$.pipe( debounceTime(1000) );
    newData$.subscribe(
        value => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testDebounceTime2 :: in next, value = ${value}, uesedTime = ${uesedTime}`)
        },
        error => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testDebounceTime2 :: in error, error = ${error}, uesedTime = ${uesedTime}`)
        },
        () => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testDebounceTime2 :: in complete~~, uesedTime = ${uesedTime}`)
        }
    )
}

// 开始测试牛气十足的 throttle
/**
 * 2020.09.25 晚上测试下来的情况，跟书上（深入浅出rxj第162页）讲的不一样。
 */
function testThrottle(){
    const enterTime = new Date().getTime();
    let uesedTime = 0;
    log(`testThrottle :: enter, uesedTime = ${uesedTime}`);
    const source$ = interval(900).pipe(take(8));
    const durationSelector = (value) => {
        uesedTime = new Date().getTime() - enterTime;
        log(`testThrottle :: durationSelector :: enter, value = ${value}, uesedTime = ${uesedTime}`);
       //let timeObservable = timer(2000);
        let custormerObs$ = new Observable((observer)=>{
            setTimeout(()=>{
                uesedTime = new Date().getTime() - enterTime;
                log(`testThrottle :: durationSelector :: will call next (notifier) uesedTime = ${uesedTime}`);
                observer.next(0);
            }, 1000);
            return {
                unsubscribe(){
                    uesedTime = new Date().getTime() - enterTime;
                    log(`testThrottle :: durationSelector :: unsubscribe :: enter,  uesedTime = ${uesedTime}`);
                }
            }
        })
        
        return custormerObs$;
    }
    const newData$ = source$.pipe(
        throttle(
            durationSelector
        )
    );

    source$.subscribe(
        value => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testThrottle :: [source$] in next, value = ${value}, uesedTime = ${uesedTime}`)
        },
    )

    newData$.subscribe(
        value => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testThrottle :: [newData$] in next, value = ${value}, uesedTime = ${uesedTime}`)
        },
        error => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testThrottle :: [newData$] in error, error = ${error}, uesedTime = ${uesedTime}`)
        },
        () => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testThrottle :: [newData$] in complete~~, uesedTime = ${uesedTime}`)
        }
    )
}

/**
 * 练习debounce
 */
function testDebounce(){
    const enterTime = new Date().getTime();
    let uesedTime = 0;
    log(`testDebounce :: enter, uesedTime = ${uesedTime}`);
    const source$ = interval(2000).pipe(take(6));
    const durationSelector = (value) => {
        uesedTime = new Date().getTime() - enterTime;
        const dueTimer = value%2==0? 1500 : 2500;
        log(`testDebounce :: durationSelector :: enter, value = ${value}, dueTimer = ${dueTimer}, uesedTime = ${uesedTime}`);        
       //let timeObservable = timer(2000);
        let custormerObs$ = new Observable((observer)=>{
            setTimeout(()=>{
                uesedTime = new Date().getTime() - enterTime;
                log(`testDebounce :: durationSelector :: will call next (notifier) value = ${value}, uesedTime = ${uesedTime}`);
                observer.next(value);
            }, dueTimer);
            return {
                unsubscribe(){
                    uesedTime = new Date().getTime() - enterTime;
                    log(`testDebounce :: durationSelector :: unsubscribe :: enter,  uesedTime = ${uesedTime}`);
                }
            }
        })
        
        return custormerObs$;
    }
    const newData$ = source$.pipe(
        debounce(
            durationSelector
        )
    );

    source$.subscribe(
        value => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testDebounce :: [source$] in next, value = ${value}, uesedTime = ${uesedTime}`)
        },
    )

    newData$.subscribe(
        value => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testDebounce :: [newData$] in next, value = ${value}, uesedTime = ${uesedTime}`)
        },
        error => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testDebounce :: [newData$] in error, error = ${error}, uesedTime = ${uesedTime}`)
        },
        () => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testDebounce :: [newData$] in complete~~, uesedTime = ${uesedTime}`)
        }
    )
}


function testAuditTime1() {
    const enterTime = new Date().getTime();
    let uesedTime = 0;
    log(`testAuditTime1 :: enter, uesedTime = ${uesedTime}`);
    const source$ = concat(
            interval(500).pipe(map(x => "A"+x)).pipe(take(2)),
            interval(1000).pipe(map(x => "B"+x)).pipe(take(3)),
            interval(500).pipe(map(x => "C"+x)).pipe(take(2)),
        );

    const newData$ = source$.pipe(
        auditTime(
            800
        )
    );

    source$.subscribe(
        value => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testAuditTime1 :: [source$] in next, value = ${value}, uesedTime = ${uesedTime}`)
        },
    )

    newData$.subscribe(
        value => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testAuditTime1 :: [newData$] in next, value = ${value}, uesedTime = ${uesedTime}`)
        },
        error => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testAuditTime1 :: [newData$] in error, error = ${error}, uesedTime = ${uesedTime}`)
        },
        () => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testAuditTime1 :: [newData$] in complete~~, uesedTime = ${uesedTime}`)
        }
    )
}
/* 上面的testAuditTime1 实测效果分析：

auditTime向下游吐出过的数据：
09:37:39.920 index.js:5 [myrxjs]  testAuditTime1 :: [newData$] in next, value = A1, uesedTime = 1310  // [第1个节流结束]第1个节流结束，取这个期间的最后一个： A1， 注意，此时并不立即开始下一个节流。
09:37:41.421 index.js:5 [myrxjs]  testAuditTime1 :: [newData$] in next, value = B0, uesedTime = 2811  // [第2个节流结束]，取这个期间的最后一个： B0， 注意，此时并不立即开始下一个节流。
09:37:42.422 index.js:5 [myrxjs]  testAuditTime1 :: [newData$] in next, value = B1, uesedTime = 3812  // [第3个节流结束]，取这个期间的最后一个： B0， 注意，此时并不立即开始下一个节流。
09:37:43.421 index.js:5 [myrxjs]  testAuditTime1 :: [newData$] in next, value = C0, uesedTime = 4811  // [第4个节流结束] 向下游吐出C0
======================

过程数据：

09:37:38.610 index.js:5 [myrxjs]  testAuditTime1 :: enter, uesedTime = 0
09:37:39.114 index.js:5 [myrxjs]  testAuditTime1 :: [source$] in next, value = A0, uesedTime = 504   // [第1个上游数据] 上游吐出第1个数据A0: 的时候，激活auditTime(800)，在此基础上节流800ms
09:37:39.616 index.js:5 [myrxjs]  testAuditTime1 :: [source$] in next, value = A1, uesedTime = 1006
09:37:39.920 index.js:5 [myrxjs]  testAuditTime1 :: [newData$] in next, value = A1, uesedTime = 1310  // [第1个节流结束]第1个节流结束，取这个期间的最后一个： A1， 注意，此时并不立即开始下一个节流。
09:37:40.619 index.js:5 [myrxjs]  testAuditTime1 :: [source$] in next, value = B0, uesedTime = 2009   // [第2个上游数据] 上游吐出第2个数据B0： 开始，激活auditTime(800)，在此基础上节流800ms
09:37:41.421 index.js:5 [myrxjs]  testAuditTime1 :: [newData$] in next, value = B0, uesedTime = 2811  // [第2个节流结束]，取这个期间的最后一个： B0， 注意，此时并不立即开始下一个节流。
09:37:41.617 index.js:5 [myrxjs]  testAuditTime1 :: [source$] in next, value = B1, uesedTime = 3007   // [第3个上游数据] 上游吐出第3个数据B1： 开始，激活auditTime(800)，在此基础上节流800ms
09:37:42.422 index.js:5 [myrxjs]  testAuditTime1 :: [newData$] in next, value = B1, uesedTime = 3812  // [第3个节流结束]，取这个期间的最后一个： B0， 注意，此时并不立即开始下一个节流。
09:37:42.618 index.js:5 [myrxjs]  testAuditTime1 :: [source$] in next, value = B2, uesedTime = 4008   // [第4个上游数据] 上游吐出第4个数据B2： 开始，激活auditTime(800)，在此基础上节流800ms
09:37:43.119 index.js:5 [myrxjs]  testAuditTime1 :: [source$] in next, value = C0, uesedTime = 4509   // [第5个上游数据] 上游吐出第5个数据C0，此时还在上一个auditTime的节流期间，上一个数据B2被抛弃。（也是喜新厌旧）
09:37:43.421 index.js:5 [myrxjs]  testAuditTime1 :: [newData$] in next, value = C0, uesedTime = 4811  // [第4个节流结束] 向下游吐出C0
09:37:43.619 index.js:5 [myrxjs]  testAuditTime1 :: [source$] in next, value = C1, uesedTime = 5009   // [第6个上游数据] 上游吐出第6个数据C1，激活auditTime(800)，然后上游结束
09:37:43.619 index.js:5 [myrxjs]  testAuditTime1 :: [newData$] in complete~~, uesedTime = 5009        // 【注意，注意！】此时最后一个数据讲不会接收并向下游转发，而是audit立即结束

*/

function testThrottleTime3() {
    const enterTime = new Date().getTime();
    let uesedTime = 0;
    log(`testThrottleTime3 :: enter, uesedTime = ${uesedTime}`);
    const source$ = concat(
            interval(500).pipe(map(x => "A"+x)).pipe(take(2)),
            interval(1000).pipe(map(x => "B"+x)).pipe(take(3)),
            interval(500).pipe(map(x => "C"+x)).pipe(take(2)),
        );

    const newData$ = source$.pipe(
        throttleTime(
            800
        )
    );

    source$.subscribe(
        value => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testThrottleTime3 :: [source$] in next, value = ${value}, uesedTime = ${uesedTime}`)
        },
    )

    newData$.subscribe(
        value => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testThrottleTime3 :: [newData$] in next, value = ${value}, uesedTime = ${uesedTime}`)
        },
        error => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testThrottleTime3 :: [newData$] in error, error = ${error}, uesedTime = ${uesedTime}`)
        },
        () => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testThrottleTime3 :: [newData$] in complete~~, uesedTime = ${uesedTime}`)
        }
    )

}
/* testThrottleTime3 实测日志过程分析
09:45:13.077 index.js:5 [myrxjs]  startTestC7 :: enter.
09:45:13.078 index.js:5 [myrxjs]  testThrottleAndDebounce :: enter.
09:45:13.078 index.js:5 [myrxjs]  testThrottleTime3 :: enter, uesedTime = 0
09:45:13.584 index.js:5 [myrxjs]  testThrottleTime3 :: [source$] in next, value = A0, uesedTime = 506  [第1个上游数据] A0
09:45:13.585 index.js:5 [myrxjs]  testThrottleTime3 :: [newData$] in next, value = A0, uesedTime = 507 [接收并转发第1个数据]，启动throttleTime(800) 节流时间。截流期间： 507 +800 = 1307

09:45:14.080 index.js:5 [myrxjs]  testThrottleTime3 :: [source$] in next, value = A1, uesedTime = 1002  [第2个上游数据] A1， 在节流期间，直接抛弃
09:45:15.082 index.js:5 [myrxjs]  testThrottleTime3 :: [source$] in next, value = B0, uesedTime = 2004  [第3个上游数据] B0，
09:45:15.082 index.js:5 [myrxjs]  testThrottleTime3 :: [newData$] in next, value = B0, uesedTime = 2004 [接收并转发第3个数据]，启动throttleTime(800) 节流时间。截流期间： 2004+800 = 2804

09:45:16.083 index.js:5 [myrxjs]  testThrottleTime3 :: [source$] in next, value = B1, uesedTime = 3005 [第4个上游数据] B1，
09:45:16.083 index.js:5 [myrxjs]  testThrottleTime3 :: [newData$] in next, value = B1, uesedTime = 3005 [接收并转发第4个数据]，B1，因为此时不在节流期，所以来数据就接收转发，同时启动节流期间：3005+800 = 3805

09:45:17.083 index.js:5 [myrxjs]  testThrottleTime3 :: [source$] in next, value = B2, uesedTime = 4005 [第5个上游数据] B2，
09:45:17.083 index.js:5 [myrxjs]  testThrottleTime3 :: [newData$] in next, value = B2, uesedTime = 4005 [接收并转发第5个数据]，B2，因为此时不在节流期，所以来数据就接收转发，同时启动节流期间：4005+800 = 4805

09:45:17.588 index.js:5 [myrxjs]  testThrottleTime3 :: [source$] in next, value = C0, uesedTime = 4510  [第6个上游数据] C0，， 在节流期间，直接抛弃
09:45:18.088 index.js:5 [myrxjs]  testThrottleTime3 :: [source$] in next, value = C1, uesedTime = 5010  [第7个上游数据] C1，
09:45:18.089 index.js:5 [myrxjs]  testThrottleTime3 :: [newData$] in next, value = C1, uesedTime = 5011 [接收并转发第7个数据]，C1，因为此时不在节流期，所以来数据就接收转发，同时启动节流期间：5011+800 = 5811
09:45:18.089 index.js:5 [myrxjs]  testThrottleTime3 :: [newData$] in complete~~, uesedTime = 5011				上游结束，下游直接结束。数据在一开始已经转发

*/

function testAudit1(){
    const enterTime = new Date().getTime();
    let uesedTime = 0;
    log(`testAudit1 :: enter, uesedTime = ${uesedTime}`);    
    const source$ = concat(
        interval(500).pipe(map(x => "A"+x)).pipe(take(2)),
        interval(1000).pipe(map(x => "B"+x)).pipe(take(3)),
        interval(500).pipe(map(x => "C"+x)).pipe(take(2)),
    );
    const durationSelector = (value) => {
        const num = parseInt(value.replace(/[A-Za-z]/g, ""));
        const duration = num%2===0 ? 1600 : 800;
        uesedTime = new Date().getTime() - enterTime;
        log(`testAudit1 :: durationSelector enter, value = ${value}, num = ${num}, duration = ${duration}, uesedTime = ${uesedTime}`);       
        return timer(duration);
    }
    const newData$ = source$.pipe(audit(durationSelector));
    // 为了做对比，把source$产生数据的过程也输出出来。
    source$.subscribe(
        value => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testAudit1 :: [source$] in next, value = ${value}, uesedTime = ${uesedTime}`)
        },
    )

    newData$.subscribe(
        value => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testAudit1 :: [newData$] in next, value = ${value}, uesedTime = ${uesedTime}`)
        },
        error => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testAudit1 :: [newData$] in error, error = ${error}, uesedTime = ${uesedTime}`)
        },
        () => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testAudit1 :: [newData$] in complete~~, uesedTime = ${uesedTime}`)
        }
    )
}

function testSampleTime(){
    const enterTime = new Date().getTime();
    let uesedTime = 0;
    log(`testSampleTime :: enter, uesedTime = ${uesedTime}`);    
    const source$ = concat(
        interval(500).pipe(map(x => "A"+x)).pipe(take(2)),
        interval(1000).pipe(map(x => "B"+x)).pipe(take(3)),
        interval(500).pipe(map(x => "C"+x)).pipe(take(2)),
    );
    const durationSelector = (value) => {
        const num = parseInt(value.replace(/[A-Za-z]/g, ""));
        const duration = num%2===0 ? 1600 : 800;
        uesedTime = new Date().getTime() - enterTime;
        log(`testSampleTime :: durationSelector enter, value = ${value}, num = ${num}, duration = ${duration}, uesedTime = ${uesedTime}`);       
        return timer(duration);
    }
    const newData$ = source$.pipe(sampleTime(800));
    // 为了做对比，把source$产生数据的过程也输出出来。
    source$.subscribe(
        value => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testSampleTime :: [source$] in next, value = ${value}, uesedTime = ${uesedTime}`)
        },
    )

    newData$.subscribe(
        value => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testSampleTime :: [newData$] in next, value = ${value}, uesedTime = ${uesedTime}`)
        },
        error => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testSampleTime :: [newData$] in error, error = ${error}, uesedTime = ${uesedTime}`)
        },
        () => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testSampleTime :: [newData$] in complete~~, uesedTime = ${uesedTime}`)
        }
    )
}

function testSample(){
    const enterTime = new Date().getTime();
    let uesedTime = 0;
    log(`testSample :: enter, uesedTime = ${uesedTime}`);  
    const rate = 500
    // 每隔200ms产生一个数据，数据是从0递增的，统计消耗了的时间。
    const tick$ = timer(0, rate).pipe(
            map(
                x=>{
                    uesedTime = new Date().getTime() - enterTime;
                    log(`testSample :: generate num ing, uesedTime = ${uesedTime}, x = ${x}, rate = ${rate}`);  
                    return x*rate
                }
            )
        );
    const notifierEvent$ = fromEvent(document.querySelector("#myBtn66"), "click");
    const newData$ = tick$.pipe( sample(notifierEvent$) );

    newData$.subscribe(
        value => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testSample :: [newData$] in next, value = ${value}, uesedTime = ${uesedTime}`)
        },
        error => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testSample :: [newData$] in error, error = ${error}, uesedTime = ${uesedTime}`)
        },
        () => {
            uesedTime = new Date().getTime() - enterTime;
            log(`testSample :: [newData$] in complete~~, uesedTime = ${uesedTime}`)
        }
    )
}
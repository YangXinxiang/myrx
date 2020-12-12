import log from "../../../util/index";
import {Subject, interval, merge, fromEvent} from "rxjs";
import { take} from "rxjs/operators";
export default function testSubject22() {
    log(`testSubject22 :: enter.`);
    //testSubject1();
    // testSubject2();
    // testColdAndHot();
    // testColdAndHot2();
    // testSubject2255();
    // testMultiSubscribeToObservable();
    testSubjectHot1();
}


function testSubject1(){
    log(`testSubject1 :: enter.`);
    const sub = new Subject();
    sub.subscribe(
        value => log(`testSubject1 :: in next, value = ${value}`),
        error => log(`testSubject1 :: in error, error = ${error}`),
        ()=>log(`testSubject1 :: in complete`),
    );

    sub.next(1);
    sub.next(2);
    sub.next(3);
    sub.complete()
}

function testSubject2(){
    log(`testSubject2 :: enter.`);
    const subject = new Subject();
    const subscribtion = subject.subscribe(
        value => log(`testSubject2 :: in next(1), value = ${value}`),
        error => log(`testSubject2 :: in error(1), error = ${error}`),
        ()=>log(`testSubject2 :: in complete(1)`),
    );
    subject.next(1);
    const subscribtion2 = subject.subscribe(
        value => log(`testSubject2 :: in next(2), value = ${value}`),
        error => log(`testSubject2 :: in error(2), error = ${error}`),
        ()=>log(`testSubject2 :: in complete(2)`),
    );
    subject.next(2);
    subscribtion.unsubscribe();
    subject.next(3);
    subject.complete();
}

function testColdAndHot(){
    log(`testColdAndHot :: enter.`);
    // 冷播
    const source$ = interval(500).pipe(take(8));
    const sub1 = source$.subscribe(
        value => log(`testColdAndHot :: [1] in next, value = ${value}`),
        error => log(`testColdAndHot :: [1] in error, error = ${error}`),
        ()=>log(`testColdAndHot ::  [1] in complete`),
    );
    // Observable的complete之后，再进行的subscribe就无效了，但是之前subscribe的还能收到所有数据
    source$.complete(); // 哈哈，没有complete接口哈~~
    //source$.complete
   // log(`testColdAndHot :: called source$.complete.`);
    let sub2;
    let sub3;
    setTimeout(()=>{
            sub2 = source$.subscribe(
                value => log(`testColdAndHot :: [2] in next, value = ${value}`),
                error => log(`testColdAndHot :: [2] in error, error = ${error}`),
                ()=>log(`testColdAndHot :: [2] in complete`),
            ); 
    },1600)
    setTimeout(()=>{
        log(`testColdAndHot :: will sub1.unsubscribe and source$.complete`);       
        sub3 = source$.subscribe(
            value => log(`testColdAndHot :: [3] in next, value = ${value}`),
            error => log(`testColdAndHot :: [3] in error, error = ${error}`),
            ()=>log(`testColdAndHot :: [3] in complete`),
        ); 
    },2000)
}


function testColdAndHot2(){
    log(`testColdAndHot2 :: enter.`);
    // 冷播
    const source$ = interval(500).pipe(take(8));
    const subject = new Subject();
    source$.subscribe(subject); // 借助Subject将冷播转换为热播
    const sub1 = subject.subscribe(
        value => log(`testColdAndHot2 :: [1] in next, value = ${value}`),
        error => log(`testColdAndHot2 :: [1] in error, error = ${error}`),
        ()=>log(`testColdAndHot2 ::  [1] in complete`),
    );
    // Subject因为不能重复使用，因此
    // 在complete之后，之前subscribe、以及之后subscribe的内容都不会再收到数据。
    // complete之后再来数据，所有subscribe的地方会收到一个完结消息；complete之后再添加的observer，会立即收到一个完结的消息。
    // complete之后再来异常，所有subscribe的地方会收到一个异常消息；complete之后再添加的observer，会立即收到一个异常的消息。
    subject.complete();
    log(`testColdAndHot :: called subject.complete.`);
    let sub2;
    let sub3;
    setTimeout(()=>{
        log(`testColdAndHot :: in setTimeout [1600], will add no.2 observer`);
        // complete之后再添加的observer，会立即收到一个完结的消息。
        sub2 = subject.subscribe(
            value => log(`testColdAndHot2 :: [2] in next, value = ${value}`),
            error => log(`testColdAndHot2 :: [2] in error, error = ${error}`),
            ()=>log(`testColdAndHot2 :: [2] in complete`),
        ); 
    },1600)
    setTimeout(()=>{   
        log(`testColdAndHot :: in setTimeout [6000], will add no.3 observer`);   
        // complete之后再添加的observer，会立即收到一个完结的消息。
        sub3 = subject.subscribe(
            value => log(`testColdAndHot2 :: [3] in next, value = ${value}`),
            error => log(`testColdAndHot2 :: [3] in error, error = ${error}`),
            ()=>log(`testColdAndHot2 :: [3] in complete`),
        ); 
    },6000);
    
}
// 测试subject，可以注册多个上游
function testSubject2255(){
    log(`testSubject22 :: enter.`);
    const source1$ = interval(200).pipe(take(2));
    const source2$ = interval(200).pipe(take(2));
    const newData$ = merge(source1$, source2$);
    const subject = new Subject();
    newData$.subscribe(subject);
    //source2$.subscribe(subject);
    subject.subscribe(
        value => log(`testSubject22 :: [1] in next, value = AA:: ${value}`),
        error => log(`testSubject22 :: [1] in error, error = AA:: ${error}`),
        () => log(`testSubject22 :: [1] in complete~~`),
    );
    subject.subscribe(
        value => log(`testSubject22 :: [2] in next, value = BB:: ${value}`),
        error => log(`testSubject22 :: [2] in error, error = BB:: ${error}`),
        () => log(`testSubject22 :: [2] in complete~~`),
    )
    
}

// 对此测试一下普通 的hot observable 的多个注册
function testMultiSubscribeToObservable(){
    log(`testMultiSubscribeToObservable :: enter.`);
    const source$ = fromEvent(document.querySelector("#myBtn77"), "click");
    

    source$.subscribe(
        value => log(`testMultiSubscribeToObservable :: [1] in next, value = AA:: ${value}`),
        error => log(`testMultiSubscribeToObservable :: [1] in error, error = AA:: ${error}`),
        () => log(`testMultiSubscribeToObservable :: [1] in complete~~`),
    );
    
    source$.subscribe(
        value => log(`testMultiSubscribeToObservable :: [2] in next, value = BB:: ${value}`),
        error => log(`testMultiSubscribeToObservable :: [2] in error, error = BB:: ${error}`),
        () => log(`testMultiSubscribeToObservable :: [2] in complete~~`),
    )
    source$.subscribe(
        value => log(`testMultiSubscribeToObservable :: [3] in next, value = BB:: ${value}`),
        error => log(`testMultiSubscribeToObservable :: [3] in error, error = BB:: ${error}`),
        () => log(`testMultiSubscribeToObservable :: [3] in complete~~`),
    )
    log(`testMultiSubscribeToObservable :: end.`);
}

// 再练习通过subject 实现热播
function testSubjectHot1(){
    log(`testSubjectHot1 :: enter.`);
    const coldSource$ = interval(1000).pipe(take(3));
    const subject = new Subject();
    coldSource$.subscribe(subject);
    const subscribtion = subject.subscribe(
        value => log(`testSubjectHot1 :: observer[1], in next , value = ${value}`),
        error => log(`testSubjectHot1 :: observer[1], in error , error = ${error}`),
        () => log(`testSubjectHot1 :: observer[1], in complete~~`),
    );

    setTimeout(()=> {
        subject.subscribe(
            value => log(`testSubjectHot1 :: observer[2], in next , value = ${value}`),
            error => log(`testSubjectHot1 :: observer[2], in error , error = ${error}`),
            () => log(`testSubjectHot1 :: observer[2], in complete~~`),
        );
    },1500);

    setTimeout(()=> {
        subscribtion.unsubscribe();
    },2000);
}
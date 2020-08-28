import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import {map} from "rxjs/operators";
import exec from "./map-filter-test";
import unsub from "./unsubscribe-test";
import  testMore from "./new-test";
import {of_study, range_study, generate_study, repeatStudy, repeatStudy2, etn} from "./operators/index";
console.log("xxxxxxxx");
const observable = Observable.create((observe) => {
    observe.next('value');
    observe.next('value22');
});
console.log("start");
observable.subscribe((v)=>{
    console.log(`subscribe :: enter, v = ${v}`);
});
console.log("end");

/*
const onSubscribe = observer => {
    observer.next("Hello");
    observer.next(" nihao");
    observer.next("测试");
}

const source$ = new Observable(onSubscribe);
const theObserver = {
    next : item => console.log(item)
}

source$.subscribe(theObserver);
*/

const onSubscribe = observer => {
    observer.next("nihao");
    observer.next(" hello");
    observer.next("你好啊");
    let num = 0;
    let tid = setInterval(()=>{
        if(num < 6){
            observer.next(++num);
        }else{
            observer.next("end");
            
            observer.complete();
            observer.error("xxxxx");
            clearInterval(tid);
        }
        
    })
    
}
const source$ = new Observable(onSubscribe);
source$.subscribe({
    next:myTest,
    complete : ()=>{
        console.log("Complete, no more data~~");
    },
    error : (info)=>{
        console.log(`error, info = ${info}`);
    }
    
});
function myTest(p){
    console.log(`myTest :: enter, p = ${p}`);
}







const handlerScribe = observer => {
    observer.next("你好啊");
    observer.next(" 中关村！");
    observer.error("EEEEEE");
}

const observableObj = new Observable(handlerScribe);
observableObj.subscribe((msg)=>{
    console.log("Hello, "+msg);
},(emsg)=>{
   console.log("eeerrrrr "+emsg); 
},()=>{
    console.log("complete");
});

const onSubscribe2 = oberver => {
    oberver.next(1);
    oberver.next(3);
    oberver.next(5);
}
const newObservable = Observable.create(onSubscribe2);
const map$ = newObservable.pipe(map(x=>x*x));
map$.subscribe(console.log);

exec();
unsub();
testMore();
of_study();
range_study();
generate_study();
repeatStudy();
repeatStudy2();
etn();
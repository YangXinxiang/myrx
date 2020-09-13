import {fromEvent, Observable} from "rxjs";
import {map, filter, repeat} from "rxjs/operators";
import log from "../../../util/"
export default function testestEerror(){
    log(`testestEerror :: enter.`);
    const source$ = new Observable((observer)=>{
        log(`testestEerror :: new Observable enter`);
        observer.next(0);
        log(`testestEerror :: called next 0`);
        setTimeout(()=>{
            observer.next(1);
            log(`testestEerror :: called next 1`);
        },1000)
        setTimeout(()=>{
            observer.next(2);
            log(`testestEerror :: called next 2`);
        },2000)
        setTimeout(()=>{
            observer.next(3);
            log(`testestEerror :: called next 3`);
        },3000)
        setTimeout(()=>{
            observer.next(4);
        },4000)
        
       
        // try{
        //     aaaaa.name=666;
        // }catch(e){
        //     log(`testestEerror :: caught error, ${e.message}`);
        // }
        
        // observer.next(4);
        //observer.complete();
    });
    const theObserver = {
        next: value=>log(`testestEerror :: in next, value = ${value}`),
        error: error=>log(`testestEerror :: in error, error = ${error}`),
        complete: ()=>log(`testestEerror :: in complete~~~`),
    }
    log(`testestEerror :: will setTimeout`);
    source$.subscribe();
    setTimeout(()=>{
        log(`testestEerror :: will subscribe`);
        source$.subscribe(theObserver);
    },2000);


    // // 
    // const cold$ = observer=>{
    //     const producer = new Producer();
    //     observer.next(111);
    // }
    // // 
    // const producerHot = new Producer();
    // const hot$ = observer=>{
    //     observer.next(producerHot.dddd);
    // }
    
}
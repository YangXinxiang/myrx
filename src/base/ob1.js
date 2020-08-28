import {Observable} from "rxjs";
import {pipe,map,filter} from "rxjs/operators";
// import {map} from "rxjs/operators/map"
import log from "../util/index";
export default function test1(){
    let onSubscribe = observer=>{
        let count = 8;
        const interval = setInterval(()=>{
            let temp = count--;
            observer.next(temp);
            log(`onSubscribe :: called next, ${temp}`);
            if(count<0){
                clearInterval(interval);
                observer.complete();
            }
            if(count ==3){
                //clearInterval(interval);
                //observer.error(`some thing wrong~~`);
            }
        },1000);    
        
        return {
            unsubscribe(){
                log(`unsubscribe :: enter~~~`);
            }
        }
    }
    let source$ = new Observable(onSubscribe);
    let sourceMaped$ = source$.pipe(filter(x=>x%2!=0),map(x=>x*2)).pipe(map(x=>x+"~~~hahah~~~"));
    let theObserver = {
        next(value){
            log(`theObserver :: ${value}`);
        },
        complete(){
            log(`theObserver :: no more data`);
        },
        error(info){
            log(`theObserver :: an error occured, ${info}`);
        }
    }
    let subscribtion = source$.subscribe(theObserver);
    let subscribtion2 = sourceMaped$.subscribe((value)=>{
        log(`theObserver 222 :: value = ${value}`);
    });
    setTimeout(()=>{
        subscribtion.unsubscribe();
    },4500);
}
/**
 * 模拟冷播
 */
function cloldPulbish(){
    let onSubscribe = (observer)=>{
        let producer = new producer();


    }
}

/**
 * 
 * 模拟热播
 */


 /**
  * 模拟letalbe
  */
 // letableMap(x=>x*2)
function letableMap(project){
    return function($obs){
        return new Observable(observer=>{
            return $obs.subscribe(
                value => observer.next(project(value)),
                error => observer.error(error),
                ()    => observer.complete()
            );
        })
    }
}  
export {
    test1,
}
import {Observable} from "rxjs";
import {repeat} from "rxjs/operators"

export default function repeat_study2(){
    const source$ = Observable.create((observer)=>{
        console.log(`repeat_study2.subscribe :: enter.`);
        setTimeout(()=>{observer.next(1)}, 1000);
        setTimeout(()=>{observer.next(2)}, 2000);
        setTimeout(()=>{observer.next(3)}, 3000);
        setTimeout(()=>{observer.complete()}, 4000);
        return {
            unsubscribe : function(){
                console.log(`repeat_study2.unsubscribe :: enter.`);
                
            }
        }
    });

    let newS$ = source$.pipe(repeat(3))

    newS$.subscribe((v)=>{
        console.log(`-------------- v = ${v}`);
        
    },null,()=>{
        console.log(`-------------- complete`);
    })

}



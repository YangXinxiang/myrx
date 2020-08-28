import {create, of,Observable} from "rxjs";
import {repeat} from "rxjs/operators";
export default function repeatStudy(){
    console.log(`repeatStudy enter.`);
    let source$ = Observable.create(observer => {
        console.log(`repeatStudy create :: enter.`);
        setTimeout(()=>{observer.next(1)},1000);
        setTimeout(()=>{observer.next(2)},2000);
        setTimeout(()=>{observer.next(13)},3000);
        setTimeout(()=>{observer.complete(1)},4000);
        
        return {
            unsubscribe :function(){
                console.log(`repeatStudy unsubscribe enter.`);
                
            }
        }
        
    });

    let repeated$ = source$.pipe(repeat(3));
    repeated$.subscribe(console.log,null,()=>{
        console.log(`ccccoooommmmpppppllllleeeetttteeee !!!`);
    })
}
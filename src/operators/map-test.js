import {Observable} from "rxjs"
import {map,filter} from "rxjs/operators"
export default function mymap(){
    console.log(`map-test.js.mymap :: enter.`)
    const onSubscribe = observer =>{
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.next(4);
        observer.next(5);
        observer.next(6);
    }
    const source$ = Observable.create(onSubscribe);
    source$.pipe(filter(x=>x%2!==0)).pipe(map(x=>x*x)).subscribe(item=>console.log(item))
    //source$.map(x=>x*x).subscribe(item=>console.log(item));
    
}

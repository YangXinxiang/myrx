import {Observable} from "rxjs";
import {filter,map} from "rxjs/operators";
export default function execute(){
    const MyObservable = Observable.create((observer)=>{
        observer.next(22);
        observer.next(55);
        observer.next(66);
        observer.next(77);
        observer.complete();
    });
    const source$ = MyObservable.pipe(map(x=>x*2)).pipe(filter(x=>x>120));
    source$.subscribe((v)=>{
        console.log("map-filter-test :: v "+v);
    },(error)=>{
        console.log("map-filter-test :: error "+error);
        
    },()=>{
        console.log("map-filter-test :: complete");
        
    });
}
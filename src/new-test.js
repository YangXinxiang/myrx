import {Observable, of} from "rxjs";
import {filter, map} from "rxjs/operators";

export default function testMore(info){
    console.log(`testMore :: enter, info = ${info}`);
    
    const onScribe = (observer)=>{
        observer.next("Nihao");
        observer.next(", 周末愉快哦！");
        observer.error("Opps");
        observer.complete();
    }
    const myOb = new Observable(onScribe);
    myOb.subscribe({
        next: (msg)=>{
            console.log(`subscribe.next :: enter, msg = ${msg}`);
            
        },
        error:(msg)=>{
            console.log(`subscribe.error :: enter, msg = ${msg}`);
        },
        complete:()=>{
            console.log(`subscribe.complete :: enter.`);
        }
    })



    createObservable()
}

function createObservable(){
    console.log(`createObservable :: enter.`);
    
    const newOb$ = of(1,2,3,4,5,6,7,8);
    let newSource = newOb$.pipe(filter(predicate=>{
            return predicate%2 ===0;
        }),
        map(project=>{
            return project*2;
        })
    );
    

    newSource.subscribe((item)=>{
        console.log(`createObservable.subscribe :: enter, item = ${item}`);
    })

}


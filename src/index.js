import {Observable,of,range,generate, empty} from "rxjs"
//import {of} from "rxjs/observable/of"
import {map, filter, repeat} from "rxjs/operators"
const source$ = of(1,2,3,4,5,6,7,8,9,10);
source$.pipe(filter(x=>x%2==0)).pipe(map(x=>x*x)).subscribe(item=>console.log(item));

const source2$ = range(3.5,10);
source2$.pipe(map(x=>x+2)).subscribe(console.log);
const value = 10
const source3$ = generate(5,value=>value<16,value=>value+2,value=>value*value);
source3$.subscribe(item=>{
    console.log(`generate :: test enter, item = ${item}`);
});



const source4$ = generate(6,x=>{
        console.log(`generate :: test2222 conditional,x = ${x}`);
        return x<20;
},x=>{
    console.log(`generate :: test2222 iterator,x = ${x}`);
    return x+5},
    x=>{
        console.log(`generate :: test2222 result,x = ${x}`);
        return x*2});
source4$.subscribe(item=>console.log(`generate :: test2222 enter, item = ${item}`));  

//////////////

const originData$ = of(1,2,3);
const repeated$ = originData$.pipe(repeat(3));
repeated$.subscribe(item=>console.log(`test repeat(3), item = ${item}`));


const empty$ = empty();
empty$.subscribe(item=>{console.log(`empty enter.`)})



import {Observable, of} from "rxjs"
import mymap from "./operators/map-test"
//import myCustomerMap from "./operators/my-map"
import { filter, map } from "rxjs/operators"
mymap()
const onSubscribe = server => {
    console.log(`onSubscribe :: enter.`);
    let count = 1;
    let timer = setInterval(()=>{
        server.next(count++)
        console.log(`onSubscribe :: count = ${count}`);
        if(count>6){
            clearInterval(timer)
        }
    },1000)
    return {
        unsubscribe: ()=>{
            console.log(`unsubscribe :: enter.`);
        }
    }
}
/*
const source$ = new Observable(onSubscribe);
const subscribtion = source$.pipe(myCustomerMap(x=>x*x)).subscribe(item=>console.log(item),null,()=>console.log("No more data"));
setTimeout(()=>{
    subscribtion.unsubscribe()
},3500);
*/
console.log(`will console source2`);

const source2$ = of(1,2,3,5,6,7,8,9);
source2$.pipe(filter(x=>x%3==0)).pipe(map(x=>x*5)).subscribe(item=>console.log(`source2 :: item = ${item}`));

import {from} from "rxjs";
import {map, filter, repeat} from "rxjs/operators";
import log from "../../../util/"
export default function testFrom(){
    log(`testFrom :: enter.`);
    fromArray();
    fromString();
    fromArguments("name","email","phone");
    fromPromiseCur();
}

function fromArray(){
    log(`fromArray :: enter.`);
    let source$ = from([1,2,3,5,8]);
    subscribe(source$, "fromArray");
};

function fromString(){
    log(`fromString :: enter.`);
    let source$ = from("abc");
    subscribe(source$, "fromString");
}

function fromArguments(){
    log(`fromArguments :: enter.`);
    let source$ = from(arguments);
    subscribe(source$, "fromArguments");
}
/**
 * from promise 貌似不管用了呢~~~
 */
function fromPromiseCur(){
    log(`fromPromiseCur :: enter.`);
    let source$ = from(new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("promise fullfilled~~~");
        },1000)
    }));
    let promise2 = Promise.resolve("promise fullfilled 222~~~");
    let source$2 = from(promise2);
    //subscribe(source$, "fromPromise");
    subscribe(source$2, "fromPromiseCur");
}



function subscribe(source$, from){
    log(`subscribe :: enter, from = ${from}`);
    let subscribtion = source$.subscribe(
        value => log(`subscribe :: [from = ${from}] in next, value = ${value}`),
        error => log(`subscribe :: [from = ${from}] in error, error = ${error}`),
        () =>    log(`subscribe :: [from = ${from}] in complete~~~`),
    )
    subscribtion.unsubscribe();
}

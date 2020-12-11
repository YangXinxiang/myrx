import log from "../../../util";
import {range, of, fromEvent,fromPromise, from} from "rxjs";
import {catchError, map,} from "rxjs/operators";
export default function testCatchRetryRetryWhen(){
    log(`testCatchRetryRetryWhen :: enter.`);
    //testCatch();
    // testFromPromise();

    testNormalCatch();
}


function testCatch(){
    log(`testCatch :: enter.`);
    const source$ = range(1,6);
    //const nnn$ = source$.pipe(map(x=>x*2));
    
    const dataWithError$ = source$.pipe(
        map((x)=>{
            
            if(x ==4){
                throw new Error("Ohohoh~~got 4~~")
            }else {
                return x;
            }
        }));
    const catch$ = dataWithError$.pipe(catchError((err,caught$)=>of(8)));
    //source$.subscribe(log)
    
    catch$.subscribe(
        (value)=>log(`testCatch :: value = ${value}`)
    )
}

function testFromPromise(){
    const prom = Promise.reject("hhhh~~~");
    const source$ = from(prom);
    source$.subscribe(
        (value)=>log(`testFromPromise :: value = ${value}`),
        error=>log(`testFromPromise :: error = ${error}`),
        ()=>log(`testFromPromise :: in complete~~`),
    )
}

async function testNormalCatch(){
    log(`testNormalCatch :: enter.`);
    const prom  = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("OK");
            //reject("fail~~")
        },2000)
    })
    let rst = "init~~";
    try{
         rst = await prom;
    }catch(e){
        log(`testNormalCatch :: catch error, e = ${e.message}`);
    }
    log(`testNormalCatch :: end rst = ${rst}`);

}
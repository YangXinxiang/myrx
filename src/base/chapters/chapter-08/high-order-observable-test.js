/**
 * 再练习一下高阶 observable
 * 
 */
import {interval, concat} from "rxjs";
import {map, take, concatMap} from "rxjs/operators";
import log from "../../../util";
export default function testHo(){
    log(`testHo :: enter`);
   // testHo1();
    testHO2();
}

/**
 * 练习ob
 */
function testHo1(){
    log(`testHo1 :: enter`);
    const source$ = interval(500);
    const project = (value, index)=> {

    }
    const ho$ = source$.pipe(
        take(2),
        concatMap(x=> {
            log(`testHo1 :: (outer) map enter, x = ${x}`);
            return interval(800).pipe(take(5));
        }),
        //concatMap()
    );

    const innerObserver = {
        next(value){
            log(`testHo1 :: (inner) , in next, value = ${JSON.stringify(value)}`);
        },
        error(){
            log(`testHo1 :: (inner) , in error, error = ${JSON.stringify(error)}`);
        },
        complete(){
            log(`testHo1 :: (inner) , in complete~~~`)
        }
    }

    ho$.subscribe(
        value => {
             log(`testHo1 :: (outer) , in next, value = ${JSON.stringify(value)}`);
            //value.subscribe( innerObserver );
        },
        error => log(`testHo1 :: (outer) , in error, error = ${JSON.stringify(error)}`),
        ()=>log(`testHo1 :: (outer) , in complete~~~`)
    )
}

function testHO2(){
    log(`testHO2 :: enter.`);
    const project = (value, index)=>{
        log(`testHO2 :: project enter.`);
        return interval(200).pipe(take(5));
    }

    const source$ = interval(80).pipe(take(3));
    const newData$ = source$.pipe(map(project));
    newData$.subscribe(
        (value)=>{
            log(`testHO2 :: in next, value = ${value}`);
            value.subscribe(
                (vv)=>{
                    log(`testHO2 :: in next [inner], vv = ${vv}`);
                }
            )
        },
        (error)=>{
            log(`testHO2 :: error`);
        },
        ()=> {
            log(`testHO2 :: complete~~~`);
        }
    )
}
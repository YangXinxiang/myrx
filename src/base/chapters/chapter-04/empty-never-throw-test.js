import {Observable, of, range, generate,empty,throwError,never} from "rxjs";
import {map, filter, repeat} from "rxjs/operators";
import log from "../../../util/"
export default function testETN(){
    log(`testENT [empty,throw, never] :: enter.`);
    testEmpty();
    testNever();
    try{
        testThrow();
    }catch(e){
        log(`testENT [empty,throw, never] :: caught an error, ${e.message}.`);
    }
}
function testEmpty(){
    log(`testEmpty  :: enter.`);
    let sourse$ = empty();
    sourse$.subscribe(
        value => log(`testEmpty  :: next, value = ${value}`),
        error => log(`testEmpty  :: error, error = ${error}`),
        ()=> log(`testEmpty  :: complete~~`),
    )
}
function testThrow(){
    log(`testThrow  :: enter.`);
    let sourse$ = throwError(new Error("hahah~~ this is a test error"));
    sourse$.subscribe(
        value => log(`testThrow  :: next, value = ${value}`),
        error => log(`testThrow  :: error, error = ${error}`),
        ()=> log(`testThrow  :: complete~~`),
    )
}
function testNever(){
    log(`testNever  :: enter.`);
    let sourse$ = never()
    sourse$.subscribe(
        value => log(`testNever  :: next, value = ${value}`),
        error => log(`testNever  :: error, error = ${error}`),
        ()=> log(`testNever  :: complete~~`),
    )
}
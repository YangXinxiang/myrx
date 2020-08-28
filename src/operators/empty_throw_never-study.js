import {empty, throwError, never} from "rxjs"

export default function etn (){
    console.log(`etn :: This is a practice for empty, throwError, never`);
    const emptySource$ = empty();
    //emptySource$.pipe(throwError(new Error("Hahaha")));
    emptySource$.subscribe((info)=>{
        console.log(`ent :: next enter.`);
        
    },(error)=>{
        console.log(`ent :: error, ${error}`);
        
    },()=>{
        console.log(`ent :: complete`);
    });

}
import {fromEvent, f} from "rxjs";
import {map, filter, repeat} from "rxjs/operators";
import log from "../../../util/"
export default function testestFromEvent(){
    log(`testestFromEvent :: enter.`);
    testFromEvent1()
}
// 练习fromEvent
function testFromEvent1(){
    log(`testFromEvent1 :: enter.`);
    const event$ = fromEvent(document.querySelector("#myBtn"),"click");
    let num = 0;
    let textarea = document.querySelector("#myTextArea");
    event$.subscribe(
        value => {
                    log(`testFromEvent1 :: in next, enter, ${value}`);
                    num++;
                    textarea.value = num;
                },
        error => log(`testFromEvent1 :: in error, error, ${error}`),
        () =>{`testFromEvent1 :: in complete~~`}
    )
}

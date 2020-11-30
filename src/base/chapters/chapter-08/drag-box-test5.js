//dragbox
import { merge, fromEvent } from "rxjs";
import {concatMap, takeUntil, map, concatAll} from "rxjs/operators";
import log from "../../../util";
export default function testDragBox5(){
    log(`testDragBox5 :: enter.`);
    const dom = document.querySelector("#dragbox");
    const startEvent$ = fromEvent(dom, "mousedown");
    const moveEvent$ = fromEvent(dom, "mousemove");
    const mouseOutEvent$ = fromEvent(dom, "mouseout");
    const mouseUpEvet$ = fromEvent(dom, "mouseup");
    const stop$ = merge(mouseOutEvent$, mouseUpEvet$);
    const drags$ = startEvent$.pipe(
        //concatAll(),
        //concatMap = concatAll + map  
        concatMap(mouseDownEvent => {
            log(`testDragBox5 :: mouse down enter.`);
            const initX = dom.offsetLeft;
            const initY =  dom.offsetTop;
            return moveEvent$.pipe(
                takeUntil(stop$),
                map(moveEv=>{

                    return {
                        x: (moveEv.x - mouseDownEvent.x) + initX,
                        y: (moveEv.y - mouseDownEvent.y) + initY
                    }
                })
            )
        })
    );
    //const newDrag$ = drags$.pipe(concatAll());
    drags$.subscribe(
        (pos)=>{
            //log(`testDragBox5 :: draging(mouse down) , pos${pos}`),
           
            log(`testDragBox5 :: draging , pos.x= ${pos.x}, pos.y = ${pos.y}`),
            dom.style.left = pos.x +"px";
            dom.style.top = pos.y +"px";
        }
    )
    /*
    drags$.subscribe(
        (pos)=>{
            log(`testDragBox5 :: draging(mouse down) , pos${pos}`),
            pos.subscribe(
                (vvvv)=>{
                    log(`testDragBox5 :: draging , pos.x= ${vvvv.x}, pos.y = ${vvvv.y}`),
                    dom.style.left = vvvv.x +"px";
                    dom.style.top = vvvv.y +"px";
                }
            )
            
        },
        error => log(`testDragBox5 :: error, error = ${error}`),
        () => log(`testDragBox5 :: complete~~`)
    )
    */
}
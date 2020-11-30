import {fromEvent, merge} from "rxjs";
import {map, concatMap, takeUntil} from "rxjs/operators";
import log from "../../../util";
export default function testDragBox4(){
    log(`testDragBox4 :: enter.`);
    const dom = document.querySelector("#dragbox");
    const mouseDownEvents$ = fromEvent(dom, "mousedown");
    const mouseMoveEvents$ = fromEvent(dom, "mousemove");
    const mouseUpEvents$ = fromEvent(dom, "mouseup");
    const mouseOutEvents$ = fromEvent(dom, "mouseout");
    const stop$ = merge(mouseUpEvents$ ,mouseOutEvents$);
    const drag$ = mouseDownEvents$.pipe(
        concatMap(mouseDownEv => {
            const initLeft = dom.offsetLeft;
            const initTop = dom.offsetTop;
            log(`testDragBox4 :: mouse down, initLeft = ${initLeft}, initTop = ${initTop}`);
            return mouseMoveEvents$.pipe(
                takeUntil(stop$),
                map(mouseMoveEv => {
                    const x = initLeft + mouseMoveEv.x - mouseDownEv.x;
                    const y = initTop + mouseMoveEv.y - mouseDownEv.y;
                    return {x,y};
                })
            )
        })
    );
    drag$.subscribe(
        pos => {
            log(`testDragBox4 :: in next, pos.x = ${pos.x}, pos.y = ${pos.y}, pos = ${JSON.stringify(pos)}`);
            dom.style.left = pos.x + "px";
            dom.style.top = pos.y + "px";
        },
        error => log(`testDragBox4 :: in error, error = ${JSON.stringify(error)}`),
        ()=>log(`testDragBox4 :: in complete~~`)
    ) 
}
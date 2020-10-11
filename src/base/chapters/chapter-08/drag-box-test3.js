import {fromEvent, merge} from "rxjs";
import {concatMap,map, takeUntil} from "rxjs/operators";
import log from "../../../util";
export default function testDragBox3() {
    log(`testDragBox3 :: enter.`);
    const dom = document.querySelector("#dragbox");
    const mouseDownEvent$ = fromEvent(dom, "mousedown");
    const mouseMoveEvent$ = fromEvent(dom, "mousemove");
    const mouseMoveUp$ = fromEvent(dom, "mouseup");
    const mouseMoveOut$ = fromEvent(dom, "mouseout");
    const stop$ = merge(mouseMoveUp$, mouseMoveOut$); // 鼠标抬起或者离开了拖拽元素的时候，停止拖拽
    const drag$ = mouseDownEvent$.pipe(
        concatMap( (mouseDownEv)=>{
                log(`testDragBox3 :: mouseDown enter`);
                const initLeft = dom.offsetLeft;
                const initTop =  dom.offsetTop;
                return mouseMoveEvent$.pipe(
                    takeUntil(stop$),
                    map(moveEvent => {
                        return {
                            x: moveEvent.x - mouseDownEv.x + initLeft,  // 将需要拖拽移动的距离计算好了
                            y: moveEvent.y - mouseDownEv.y + initTop,
                        }
                    })
                )
            })
    );
    // 开始注册砸平了的drag$ 事件流，实现拖拽
    drag$.subscribe(
        value => {
            log(`testDragBox3 :: in next (drag$), dragging, value = ${JSON.stringify(value)}`);
            // 实现元素的拖拽
            dom.style.left = value.x + "px";
            dom.style.top = value.y + "px";
        },
        error => log(`testDragBox3 :: in error, error = ${JSON.stringify(error)} `),
        ()=>log(`testDragBox3 :: in complete~~~ `)
    )
}
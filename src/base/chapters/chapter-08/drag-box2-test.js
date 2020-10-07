/**
 * 用rxjs的思想来练习拖拽。
 * 这个示例是一个比较耗的示例。比较准确的处理移动。
 * 综合应用了concatMap、takeUntil、map、throttleTime、merge、fromEvent等操作符。
 */
import {fromEvent, merge} from "rxjs";
import {map, concatMap, takeUntil, throttleTime} from "rxjs/operators";
import log from "../../../util";
export default function testDragBox2(){
    log(`testDragBox2 :: enter.`);
    const dom = document.querySelector("#dragbox");
    const startEvent$ = fromEvent(dom, "mousedown");
    const mousemove$ = fromEvent(dom, "mousemove");
    const mouseup$ = fromEvent(dom, "mouseup");
    const mouseout$ = fromEvent(dom, "mouseout");
    const stop$ = merge(mouseup$, mouseout$);
    const drag$ = startEvent$.pipe(
        concatMap((downEvent)=>{
            const initLeft = dom.offsetLeft;
            const initTop = dom.offsetTop;
            return mousemove$.pipe(
                takeUntil(stop$),
                map((moveEvent)=>{
                    log(`testDragBox2 :: moving, ${JSON.stringify(moveEvent)}`);
                    return {
                        x: moveEvent.x - downEvent.x +initLeft,
                        y: moveEvent.y - downEvent.y+initTop 
                    }
                }),
                // 增加一个节流玩玩哈
                throttleTime(100)
            )
        })
    );
    // 只用注册一个事件即可，就能达到目的
    drag$.subscribe(
        value => {
            log(`testDragBox2 :: in next, value = ${JSON.stringify(value)}.`);
            dom.style.left = value.x + "px";
            dom.style.top = value.y + "px";
        },
        error => log(`testDragBox2 :: in error,  error= ${JSON.stringify(error)}.`),
        ()=>log(`testDragBox2 :: in complete~~`)
    )
}
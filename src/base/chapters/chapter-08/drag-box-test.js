/**
 * 用rxjs的思想来练习拖拽。
 * 这个示例主要是练习rxjs思想，但是选的操作符并不是很好，这里用windowToggle很难获得启动时候的初始数据，因为每次windowToggle启动初始数据都会变化。
 * 但是并不反感练习这种思想。
 */
 import {fromEvent, merge} from "rxjs";
import {map, windowToggle} from "rxjs/operators";
import log from "../../../util";
export default function testDragWithRxjs(){
    log(`testDragWithRxjs :: enter.`);
    const dom = document.querySelector("#dragbox");
    const startEvent$ = fromEvent(dom, "mousedown");
    const mousemove$ = fromEvent(dom, "mousemove");
    const mouseup$ = fromEvent(dom, "mouseup");
    const mouseout$ = fromEvent(dom, "mouseout");
    const stop$ = merge(mouseup$, mouseout$);
    let initTop = dom.offsetTop;
    let initLeft = dom.offsetLeft;
    let movedX = 0;
    let movedY = 0;
    // 用windowToggle也能基本实现，但是有比较大的误差，除非分别注册 startEvent$ 和 drag$ 
    // 否则很难拿到点击时候的初始位置。
    const drag$ = mousemove$.pipe(
        windowToggle(startEvent$,(ev)=>{
            log(`testDragWithRxjs :: in closing selector, ev.x = ${ev.x}`);
            initTop = dom.offsetTop;
            initLeft = dom.offsetLeft;
            movedX = ev.x - initLeft;
            movedY = ev.y - initTop;
            return stop$;
        })
        // ,
        // map(event=>{
        //     log(`testDragWithRxjs :: in map, event = ${JSON.stringify(event)}`);
        //     return {
        //         x: event.x - initLeft,
        //         y: event.y - initTop,
        //     }
        // })
    )
    drag$.subscribe(
        value => {
            log(`testDragWithRxjs :: in next, value = ${JSON.stringify(value)}`);
            value.subscribe(vv=>{
                log(`testDragWithRxjs :: (inner ) in next, value = ${JSON.stringify(vv)}`);
                dom.style.left = vv.x+"px";
                dom.style.top = vv.y+"px";
            })
            //dom.style.left = value.x+"px";
            // dom.style.top = value.y+"px";           
        },
        error => log(`testDragWithRxjs :: in error, error = ${error}`),
        ()=>log(`testDragWithRxjs :: in complete~~`)
    )
}
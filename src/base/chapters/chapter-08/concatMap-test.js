/**
 * 练习第8章高阶操作符 concatMap
 * concatMap = map + concatAll
 * 
 */
import {fromEvent, merge} from "rxjs";
import {concatMap, takeUntil, map} from "rxjs/operators";
import log from "../../../util";
export default function testConcatMap(){
    log(`testConcatMap :: enter.`);
    testDragByRxjs();
}
/**
 * testDragByRxjs
 * 用rxjs的思想来实现拖拽 dom元素
 */
function testDragByRxjs(){
    log(`testDragByRxjs :: enter.`);
    const dom = document.querySelector("#dragbox"); // dragbox 是一个position为absolute的div
    const mouseDown$ = fromEvent(dom, "mousedown");
    const mouseMove$ = fromEvent(dom, "mousemove");
    const mouseUp$ = fromEvent(dom, "mouseup");
    const mouseOut$ = fromEvent(dom, "mouseout");

    // 整合的触发鼠标移动的数据流observable
    const drag$ = mouseDown$.pipe(
        concatMap( (startEvent)=>{
            const initLeft = dom.offsetLeft;
            const initTop = dom.offsetTop;
            return mouseMove$.pipe(
                takeUntil(
                    merge(mouseUp$, mouseOut$) // 鼠标弹起或者鼠标离开拖拽的目标对象的时候，停止捕获鼠标事件。
                ),
                map(mouseMoveEvent=>{
                    return {
                        x : mouseMoveEvent.x - startEvent.x + initLeft,
                        y : mouseMoveEvent.y - startEvent.y + initTop
                    }
                })
            )
        } )
    );
    // 注册数据，实现拖拽效果
    drag$.subscribe(
        value => {
            log(`testDragByRxjs :: [drag$] in next, value = ${JSON.stringify(value)}`);
            dom.style.left = value.x + "px";
            dom.style.top = value.y + "px";
        },
        error =>log(`testDragByRxjs :: [drag$] in error, error = ${error}`),
        () => log(`testDragByRxjs :: [drag$] in complete~~~`)
    )
}
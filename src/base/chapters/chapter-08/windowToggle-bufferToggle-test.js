// 练习 windowToggle 和 bufferToggle
import {of, interval,timer} from "rxjs";
import {windowToggle, bufferToggle, take} from "rxjs/operators";
import log from "../../../util";
export default function testWindowAndBufferToggle(){
    log(`testWindowAndBufferToggle :: enter.`);
    // testWindowToggle();
    testBufferToggle()
}

// 练习 windowToggle
function testWindowToggle(){
    log(`testWindowToggle :: enter.`);
    const source$ = timer(0, 100);  // 数据源，每100ms产生一个数据
    // 控制windowToggle启动的observalbe
    const opennings$ = timer(0, 1000); // 从0毫秒开始，每1000ms向下游转发一个新生成的observable对象中，上游数据封装在里面。

    // 控制windowToggle 结束的一个函数，该函数接收1个参数，是opennings$吐出的数据。
    // closingSelector返回一个observable对象，该对象控制结束的时机。产生任何一个数据或者完结的时候，该缓存期间就结束。
    const closingSelector = value =>{
        log(`testWindowToggle :: closingSelector enter, value = ${value}`);
        return timer(500);
    };

    const newData$ = source$.pipe(
        windowToggle(opennings$, closingSelector),
        take(6)
    )
    // 内部observable的 观察者
    const innerObserver = {
        next(value) {
            log(`testWindowToggle (inner) :: in next, value = ${value}`);
        },
        error(er) {
            log(`testWindowToggle (inner) :: in error, error = ${er}`);
        },
        complete() {
            log(`testWindowToggle (inner) :: in complete~~`);
        }
    }
    newData$.subscribe(
        value => {
            log(`testWindowToggle (outer) :: in next, value = ${value}`);
            // value.subscribe( innerObserver );
            value.subscribe({
                next(value) {
                    log(`testWindowToggle (inner) :: in next, value = ${value}`);
                },
                error(er) {
                    log(`testWindowToggle (inner) :: in error, error = ${er}`);
                },
                complete() {
                    log(`testWindowToggle (inner) :: in complete~~`);
                }
            })
        },

        error => {
            log(`testWindowToggle (outer) :: in error, error = ${error}`)
        },

        ()=> log(`testWindowToggle (outer) :: in complete~~~`)
    )

}

// 练习 bufferToggle

function testBufferToggle(){
    log(`testBufferToggle :: enter.`);
    const source$ = timer(0, 100);
    const opennings$ = timer(0, 1000);
    const closingSelector = value =>{
        return timer(500);
    }
    const newData$ = source$.pipe(
        bufferToggle(opennings$, closingSelector),
        take(6)
    );

    newData$.subscribe(
        value => log(`testBufferToggle :: in next, value = ${value}`),
        error => log(`testBufferToggle :: in error, error = ${error}`),
        () => log(`testBufferToggle :: in complete~~~`),
    )
}
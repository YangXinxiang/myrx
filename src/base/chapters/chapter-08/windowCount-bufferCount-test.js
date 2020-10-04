// 练习 windowCount 和 bufferCount
import {of, interval,timer} from "rxjs";
import {windowCount, bufferCount, take} from "rxjs/operators";
import log from "../../../util";
export default function testWindowAndBufferCount(){
    log(`testWindowAndBufferCount :: enter.`);
    // testWindowCount();
    testBufferCount()

}
// 练习 windowCount
function testWindowCount(){
    log(`testWindowCount :: enter.`);
    const source$ = interval(200);
    const newData$ = source$.pipe(
        windowCount(5, 6), // 第二个参数startWindowEvery，表示每隔多少个数据重新开启一个新的 observable区域来存储数据
        take(6)
    );
    // 内部observable的监听处理器。
    const observer = {
        next(val){
            log(`testWindowCount :: (inner) in next , value = ${val}`);
        },
        error(val){
            log(`testWindowCount :: (inner) in error , error = ${error}`);
        },
        complete(){
            log(`testWindowCount :: (inner) in complete~~~`);
        }
    };
    newData$.subscribe(
        value =>{
            log(`testWindowCount :: (outer) in next , value = ${value}`);
            value.subscribe(observer);
        },

        error => {
            log(`testWindowCount :: (outer) in error , error = ${error}`)
        },
        () => log(`testWindowCount :: (outer) in complete~~~`)
    )
}

// bufferCount, 缓存参数指定个的数据在数组中，到达参数指定的数量之后一次性封装在数组中传给下游。
function testBufferCount(){
    log(`testBufferCount :: enter.`);
    const source$ = interval(200);
    const newData$ = source$.pipe(
        bufferCount(5, 6), // 第二个参数startWindowEvery，表示每隔多少个数据重新开启一个新的 observable区域来存储数据
        take(6)
    );

    newData$.subscribe(
        value =>{
            log(`testBufferCount :: (outer) in next , value = ${value}`);
            // value.subscribe(observer);
        },

        error => {
            log(`testBufferCount :: (outer) in error , error = ${error}`)
        },
        () => log(`testBufferCount :: (outer) in complete~~~`)
    )

}
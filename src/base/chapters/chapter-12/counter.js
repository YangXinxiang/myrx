/**
 * 这个是为了测试一个真实功能的功能实现。
 * 源码参照 《深入浅出RxJS》 程墨， P330
 * 该文件实现的是一个点击 加减号，做加减法的功能。
 * 拆分逻辑，让核心逻辑可测试。。。
 * 
 * 依赖页面元素， id： plus 、 minus 、 plusResult
 */
import {fromEvent, merge} from "rxjs"
import {map,mapTo, scan} from "rxjs/operators"
// 创建点击事件流
const createClickObservable = (id)=>{
    const dom = document.querySelector("#"+id);
    return fromEvent(dom, "click");
}

/**
 * 观察者函数
 * @param {Observable} source$ 
 * @param {string} id 
 */
const observe = (source$, id)=>{
    source$.subscribe(
        (value) => document.querySelector(`#${id}`).value = value
    )
}

/**
 * 计算加、减的核心逻辑，用rx数据流的方式实现。
 * @param {Observable} plus$ 加号数据流 observable
 * @param {Observable} minius$ 减号数据流 observable
 */
const counterPipe = (plus$, minius$)=>{
    return merge(
        plus$.pipe(mapTo(1)), // 映射成+1
        minius$.pipe(mapTo(-1)), // 映射成-1
    ).pipe(
        scan((acc, value)=>{
            return acc + value;
        }, 0)
    )
}

const startCount = ()=>{
    // ids: plus 、 minus 、 plusResult
    const plus$ = createClickObservable("plus");
    const minus$ = createClickObservable("minus");
    const counter$ = counterPipe(plus$,minus$);
    observe(counter$, "plusResult");
}
export default startCount;
export {
    createClickObservable,
    observe,
    counterPipe,
    startCount,
}
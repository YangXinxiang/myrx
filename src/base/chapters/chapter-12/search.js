/**
 * 这个是为了测试一个真实功能的功能实现。
 * 源码参照 《深入浅出RxJS》 程墨， P333
 * 该文件实现搜索git代码仓库逻辑
 * 拆分逻辑，让核心逻辑可测试。。。
 * 
 * 依赖页面元素， id： searchGit 、 searchResult
 */
import {fromEvent, merge} from "rxjs";
import {map,mapTo, scan, debounceTime, filter, switchMap, tap} from "rxjs/operators";
import {ajax, AjaxRequest} from "rxjs/ajax";
import log from "../../../util/index";
/**
 * 创建dom事件，这是整个事件流的源头。
 * @param {string} domId , dom的id
 * @param {string} eventName , 需要监听的事件名字
 */
function createDomEvent$(domId, eventName){
    log(`serach.js createDomEvent$ enter, domId = ${domId}, eventName = ${eventName}`);
    const dom = document.querySelector("#"+domId);
    return fromEvent(dom, eventName)
}

/**
 * 到github去请求数据
 * @param {string} query 查询的字段
 */
function fetch(query){
    log(`serach.js fetch enter, query = ${query}`);
    const url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`;
    return ajax(url,{reponseType:"json"});
}

/**
 * 数据处理核心管道方法，将keyup$事件流映射处理成ajax数据流，供下游订阅。
 * @param {Observable} keyup$ 
 * @param {int} duration 
 * @param {Scheduler} scheduler 
 */
function createSearchPipe(keyup$, fetch, duration, scheduler){
    return keyup$.pipe(
        // duration时段内喜新厌旧，duration结束的时候才吐出数据
        // duration不结束上游就来数据，会重启计算一段新的duration节流期，丢弃旧的数据。
        debounceTime(duration, scheduler),  
        map(event=>event.target.value.trim()),
        filter(query=>query.length>0),
        switchMap(fetch)
    )
}

/**
 * 监听处理请求结果。
 * @param {AJAX Observable} souce$ 请求结果数据流
 */
function observeResult(souce$){
    souce$.subscribe(
        responseInfo=>{
            const items = responseInfo.response.items
            log(`serach.js observeResult in next, value = ${JSON.stringify(items[0])}`);
            document.querySelector(`#searchResult`).value = JSON.stringify(items[0]);
        }
    )
}
/**
 * RxJS三部曲： 
 * 1，找数据源
 * 2，管道的方式处理数据流（核心）
 * 3，监听、处理结果数据
 */
function startSearch(){
    const keyup$ = createDomEvent$("searchGit", "keyup");
    const searchResult$ = createSearchPipe(keyup$, fetch, 300);
    observeResult(searchResult$);
}

export {
    createDomEvent$,
    fetch,
    observeResult,
    createSearchPipe,
    startSearch,
}
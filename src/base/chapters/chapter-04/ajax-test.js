/**
 * 测试没有成功，呃呃，不支持了么？
 */
import { fromEvent,Observable,} from "rxjs";
import {ajax,AjaxError,AjaxRequest,AjaxTimeoutError,AjaxResponse} from "rxjs/ajax";
import log from "../../../util/"
export default function tesAjax(){
    log(`tesAjax :: enter.`);
    // Observable.ajax("www.souhu",{reponseType:"json"});
    
    let source$ = ajax("http://wwww.baidu.com",);
    source$.subscribe({
        next(value){log(`tesAjax :: in next, value = ${value}`)},
        error(value){log(`tesAjax :: in error, error = ${value}`)},
        complete(){log(`tesAjax :: in complete~~~`)}
    });
    log(`tesAjax :: end.`);
}
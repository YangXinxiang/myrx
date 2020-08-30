/**
 * 测试没有成功，呃呃，不支持了么？
 */
import {ajax, fromEvent,Observable} from "rxjs";
import log from "../../../util/"
export default function tesAjax(){
    log(`tesAjax :: enter.`);
    // Observable.ajax("www.souhu",{reponseType:"json"});
    let source$ = ajax("wwww.baidu.com",{reponseType:"json"});
    source$.subscribe({
        next(value){log(`tesAjax :: in next, value = ${value}`)},
        error(value){log(`tesAjax :: in error, error = ${error}`)},
        complete(){log(`tesAjax :: in complete~~~`)}
    });
    log(`tesAjax :: end.`);
}
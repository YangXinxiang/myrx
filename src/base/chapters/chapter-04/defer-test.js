/**
 * 练习使用defer操作符，延迟创建obserable对象，节约资源。
 * defer操作符接收一个工厂方法：
 * 1，该方法返回一个真正的 observable 
 * 2，或者一个pormise， 如果是promise, promise resolve回去的值讲成为next方法的参数。
 * 
 * 在调用完defer之后，返回的只是一个 代理 ： const source2$ = defer(observableFactory2);
 * 真正observalbe的创建是在代理被 subscribe的时候。
 * 
 * 2020.08.30
 */
import {of, defer} from "rxjs";
import log from "../../../util/";
export default function testDefer() {
    log(`testDefer :: enter.`);

    const observableFactory = ()=> of(8, 9, 10);
    const source$ = defer(observableFactory);
    source$.subscribe(
        value => log(`testDefer :: in next ,value = ${value}`),
        error => log(`testDefer :: in error ,error = ${error}`),
        () => log(`testDefer :: in complete~~~`),
    );

    const observableFactory2 = ()=>{
        return new Promise((resolve,reject)=>{
            log(`testDefer :: observableFactory2, creating promise.`);
            setTimeout(()=>{
                log(`testDefer :: observableFactory2, will resolve observale.`);
                resolve(
                    // of(11,12,13) // 不建议在这里of一个observable
                    "hahah~~~"
                    // {name:"yxx",email:"xxx@xxx.xx"}
                );
            },3000)
        })
    }
    const source2$ = defer(observableFactory2);
    source2$.subscribe(
        value => log(`testDefer 2 :: in next ,value = ${JSON.stringify(value)}`),
        error => log(`testDefer 2 :: in error ,error = ${error}`),
        () => log(`testDefer 2 :: in complete~~~`),
    );
}
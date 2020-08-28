// 使用方式: mockMap(x=>x*2);
import log from "../../../util/index";
import {Observable} from "rxjs";
/**
 * 
 * @param {*} project 
 */
function mockMap(project){
    return new Observable((observer)=>{
        // observer.next(project(value));
        // 这里假定 this 是上游的 obserable 对象
        const subscribtion = this.subscribe(
            (value)=> {
                try{
                    observer.next(project(value)); // next
                }catch(e){
                    observer.error(e);
                }
            }, // next
            (error) => observer.error(error), // error
            ()=> observer.complete() // complete
        );

        // 也可以写成对象的形式，二者是等价的。。。
        /*
        const subscribtion = this.subscribe({
            next     : value => observer.next(project(value)),
            error    : error=>observer.error(error),
            complete : ()=>observer.complete()
        })
        */

        return {
            unsubscribe(){
                subscribtion.unsubscribe();
            }
        }
    })
}

export {
    mockMap,
}
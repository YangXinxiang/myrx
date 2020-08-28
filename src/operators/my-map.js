import {Observable, of} from "rxjs"
Observable.prototype.myCustomerMap = myCustomerMap
export default function myCustomerMap(project){
    return  Observable.create(observer=>{
        const sub = this.subscribe(item=>{
                try{
                    observer.next(project(item))
                }catch(err){
                    observer.error(err)
                }
                
            },
            error =>{
                observer.error(error)
            },
            () => observer.complete
        );
        return {
            unsubscribe:()=>{
                sub.unsubscribe()
            }
        }
    })
    
}
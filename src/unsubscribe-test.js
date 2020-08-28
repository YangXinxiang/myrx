import {Observable} from "rxjs";
export default function unSubscribeTest(){
    const subscriber = oberver => {
        oberver.next("Hello");
        oberver.next("Hi");
        oberver.next("你好");
        let num =1;
        let tid = setInterval(()=>{
            if(num<8){
                console.log(`unsubscribe-test.js :: subscriber, will call next num = ${num}.`);
                oberver.next(num);
                num++;
            }else{
                console.log(`unsubscribe-test.js :: subscriber, will call complete num = ${num}.`);
                oberver.complete();
            }
        },500)
        return {
            unsubscribe : ()=> {
                console.log(`unsubscribe-test.js :: unsubscribe, enter, num = ${num}`);
                clearInterval(tid);
            }
        }
    };

    const obable = Observable.create(subscriber);
    const mySubscribe = obable.subscribe((nextValue)=>{
        console.log(`unsubscribe-test.js :: on handler  mySubscribe, next, value = ${nextValue}.`);
        if(nextValue==5){
            mySubscribe.unsubscribe();
        }
    },(error)=>{
        console.log(`unsubscribe-test.js :: on handler  mySubscribe, error, ${error}.`);
        
    },()=>{
        console.log("unsubscribe-test.js :: on handler  mySubscribe, complete.");
        
    });


}

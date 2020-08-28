function Observable(fn){
    fn();
}
Observable.prototype.subscribe = function(p){
    console.log(`subscribe :: enter. p=${p}`);
    return {
        unsubscribe:function(){

        },
        next:function(){

        },
        error:function(){

        },
        complete:function(){

        }
    }
    console.log()
}

function map1(obj){
    return function (obser$){
        return new Observable(observer =>{
            return obser$.subscribe();
        })
    }
}

const obs$ = new Observable(x=>x+" hello");
map1(x=>x+" hello")(obs$).subscribe(` xxx`);

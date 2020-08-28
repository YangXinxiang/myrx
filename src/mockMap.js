import {Observable} from "rxjs";

function mMap (project) {
    return Observable.create((observer) => {
        const sub = this.subscribe({
            next: (value)=> observer.next(project(value)),
            error: (err) => observer.error(err),
            complete: () => observer.complete()
        });

        return {
            unsubscribe : () => {
                console.log(`mMap.unsubscribe :: enter.`);
                sub.unsubscribe();
            }
        }
    })
}


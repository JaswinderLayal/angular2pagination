import {Injectable} from '@angular/core';
import {Http,RequestOptions,Headers} from '@angular/http';
import 'rxjs/operator';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/observable';

@Injectable()
export class PortionService {

    constructor(public http:Http) {
        console.log("PortionService instantiated");
    }

    loadPortions() {
        console.log("loading porions");
        return this.http.get('http://localhost:3000/portions').map(res=>res.json());
    }
    incrementLog(portionname){
        console.log("inserting and increnenting");
        console.log("portion name in maincomponent is ",portionname);
        let body=JSON.stringify({name:portionname});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:3000/log',body,options).map(res=>res.json());

    }

    filterPortions(searchArray){
        let body=JSON.stringify(searchArray);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/filterportions',body,options).map(res=>{
            console.log("main rses ",res);
        return    res.json()
        });

    }


}
import {Injectable} from '@angular/core';
import {Http,URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ListResult} from "../services/api/list-result.interface";
import {Post} from "./post.entity";

@Injectable()
export class PostService{
    constructor(public http:Http){}

    getList(search,page):Observable<ListResult<Post>>{
       var params=new URLSearchParams();
      if(search)  params.set('search',search);
        if(page)  params.set('page',page);
       return this.http.get('/postData',{search:params}).map(res=>res.json())
    }
}
import {Component,OnInit} from '@angular/core';
 import 'rxjs/Rx';
 import {Subject} from 'rxjs/Subject'
//import    'rxjs/add/operator/debounceTime';
//import    'rxjs/add/operator/distinctUntilChanged';
//import    'rxjs/add/operator/mergeMap';
//import    'rxjs/add/operator/pluck';
//import    'rxjs/add/operator/share';
//import    'rxjs/add/operator/merge';
//import    'rxjs/add/operator/startWith';
import {PostService} from "./post.service";
import {Post} from "./post.entity";
import {Pagination} from "./pagination.component";


@Component({
    selector: 'my-list',
    template: `
    <input type="text" #mysearch (keyup)="loadSearch(mysearch.value)" class="form-control"/>
    <button class="btn btn-primary" (click)="changePage()">Change Page</button>
    <pagination [page]="activePage" [btnShow]="4" [toshow]="20" [total]="total|async" (changePage)="goToPage($event)"></pagination>
   <ul>
   <li *ngFor="let item of items|async">{{item.title}}</li>
   </ul>
    <pagination [page]="activePage" [btnShow]="4" [toshow]="20" [total]="total|async"></pagination>

    `,
    providers: [PostService],
    directives:[Pagination]
})

export class PostListComponent implements OnInit {
    private searchStream = new Subject<string>();
    private  searchItem:string = "";
    public items;
    public total;
    public activePage=1;
    private pageStream=new Subject<number>();
    constructor(private postService:PostService) {

    }

    ngOnInit() {
        console.log("in on init");


       //  let mysub = this.searchStream.debounceTime(1000).distinctUntilChanged().mergeMap(search=> {
       //     console.log("from observable ", search);
//
       //     this.searchItem = search;
       //    return this.postService.getList(search, 1);
       // }).share();
//
        let pageObs=this.pageStream.map(page=>{
            this.activePage=page;
           return {search:this.searchItem,page:this.activePage};
        });
        let searchStream = this.searchStream.debounceTime(1000).distinctUntilChanged().map(search=> {
            this.searchItem=search;
            this.activePage=1;
            return {search:this.searchItem,page: this.activePage};

        });
      var cbObs=  pageObs.merge(searchStream).startWith({search:"", page: 1}).flatMap(cbData=>{
          console.log("cb data",cbData);
            return this.postService.getList(cbData.search, cbData.page);
        });

   this.items=  cbObs.pluck("items");
        this.total=  cbObs.pluck("total");
        //mysub.subscribe(data[]:Post=> {
        //    console.log("from observable ", data.items);
//
        //});
      //  mysub.subscribe(data=> {
      //      console.log("from observable ", data);
      //      this.items=
      //  });
      //  this.searchStream.next("tets");
    }
  changePage(){

  }
    goToPage(value){
        console.log("Page changed in goto",value);
        this.pageStream.next(value);
    }

    loadSearch(value) {
        console.log("search is ", value);
        this.searchStream.next(value);
        setTimeout(function () {
            console.log(this.items);
        },2000);
    }
}
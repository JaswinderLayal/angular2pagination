/**
 * Created by Jaswinder on 8/14/2016.
 */
import {OnInit,Component,EventEmitter,Input,Output,OnChanges, SimpleChange} from '@angular/core';

 


@Component({
    selector:'pagination',
    host: {
        '(document:keyup)': 'documentkey($event)',
    },
    template:`
   <div class="container">
<ul class="pagination">
<h3>Showing page {{page}} of {{getpages()}} total {{total}}</h3>
              <li [class.disabled]="page==1"><button  [disabled]="page==1" (click)="prevPage()" href="#">«</button></li>

              <li  [class.active]="page==mypage" *ngFor="let mypage of pages"><a href="javascript:void(0)" (click)="pageClick(mypage)">{{mypage}}</a></li>
              <li    (click)="nextPage()" [class.disabled]="page>=getpages()"><button [disabled]="page>=getpages()" href="#">»</button></li>
            </ul>
</div>

    `,
    styles:[`
    .pagination>li>a, .pagination>li>span { border-radius: 50% !important;margin: 0 5px;}

    `]
})

export class  Pagination{
    pages=[];
    @Input() page:number=1;
    @Input() total:number=0;
    @Input() btnShow:number=3;
     @Input() toshow:number;
    @Output() changePage:EventEmitter<number>=new EventEmitter<number>();
    constructor(){

    }
    getpages(){
        return Math.ceil(this.total/this.toshow);
    }
    getMinVal(){
        var totalpages=this.getpages();
        console.log("total pages ",totalpages);
        var min;
        var offset=Math.ceil(Math.abs(totalpages-this.btnShow));
        console.log("offset ",offset);
        if(this.page>offset){
            console.log("in if ",offset);
            console.log("in if ",this.page);

            min=offset==0?1:offset;
        }
        else if(this.page==1){
            min=1;
        }
        else{

           var minVal=this.page-(Math.ceil(this.btnShow/2));
          min=  minVal>0?minVal:1
        }
        return min;
    }
    makePageBar(){
        var totalpages=this.getpages();
       var min= this.getMinVal();
        var max=min+this.btnShow;
        if(max>totalpages)
        {
            max=totalpages;
        }
        this.pages=[];
        console.log("make page bar");
        console.log(min);
        console.log(max);
        for(var i=min;i<=max;i++)
        {
          this.pages.push(i);
        }

    }
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {

        for (let propName in changes) {
            let changedProp = changes[propName];
            console.log("prop name",propName);
            console.log("changed prop ",changedProp);
             if(propName=="total" || propName=="page"){
                 console.warn("page no ",this.page);
                this.makePageBar();
             }
        }

    }

    prevPage(){
        this.changePage.next(this.page-1);
    }
    nextPage(){
        this.changePage.next(this.page+1);
    }
    pageClick(i:number){
        console.log("page Clicked ",i);


        this.changePage.next(i);
    }

    public documentkey($event) {
        console.warn("Key up ",$event);
        if($event.keyCode==39)
        {
            if(!(this.page>=this.getpages()))
            this.changePage.next(this.page+1);


        }
        if($event.keyCode==37)
        {
            if((this.page>1))
                this.changePage.next(this.page-1);


        }


    }
}
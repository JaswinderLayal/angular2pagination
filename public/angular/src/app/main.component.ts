/**
 * Created by Jaswinder on 8/9/2016.
 */
import {Component,OnInit} from '@angular/core';
import {PortionService} from './portions.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/operator/distinct';
import 'rxjs/add/observable/from';
import 'rxjs/operator/map';
import 'rxjs/add/operator/distinct';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import 'rxjs/observable/interval';
import 'rxjs/observable/forkJoin';
import 'rxjs/observable/fromEvent';
import {PostListComponent} from "./components/postlist.component";
@Component({
    selector: 'main-app',
    templateUrl: '/angular/src/app/main.component.html',
    directives:[PostListComponent],
    providers: [PortionService]
})

export class MainComponent implements OnInit {
    portions:any;
    vendors = [];
    prices = [
        {text: "below 200", value: 200, equality: '<'},
        {text: "above 200", value: 200, equality: '>'}
    ];
    selectedPrice:any;
    vendorsSelected = [];

    constructor(public portionService:PortionService) {
        console.log("instantiated");
    }

    ngOnInit() {
        var $this = this;

        this.portionService.loadPortions().subscribe(data=> {
            console.log("data is ", data);
            this.portions = data;
            var portions:any[] = data;
            var distinctPortions = Observable.from(portions).map(portion=> {

                return portion.vendor;
            }).distinct();
            distinctPortions.subscribe(data=> {

                $this.vendors.push(data);
            });
        });
    }

    sayHello(checked) {
        alert(checked);
    }

    vendorSearch(vendor, checked) {
        console.log("vendor ", vendor);
        console.log("checked ", checked);
        if (checked) {
            this.vendorsSelected.push(vendor);
        }
        else {
            console.log(this.vendorsSelected.indexOf(vendor));
            this.vendorsSelected.splice(this.vendorsSelected.indexOf(vendor), 1);
        }
        var filterCriteria = {
            vendors: this.vendorsSelected,
            price:[this.selectedPrice]
        }

        console.log("filterCriteria", filterCriteria);
        this.portionService.filterPortions(filterCriteria).subscribe(data=> {
            console.log("filtered data is ", data);
            this.portions = data;
        });
    }

    updateLog(portionName:string) {
        console.log("portion name in maincomponent is ", portionName);
        this.portionService.incrementLog(portionName).subscribe(data=> {
            console.log("data recieved ", data);

        });
    }

    priceAlert(price,isSelected) {
         this.selectedPrice=price;
        console.log("is selected",isSelected);
        if(!isSelected)
            this.selectedPrice=null;
        console.log("price ", price);
        var filterCriteria = {
            vendors: this.vendorsSelected,
            price: this.selectedPrice?[this.selectedPrice]:[]
        }

        console.log("filterCriteria", filterCriteria);
        this.portionService.filterPortions(filterCriteria).subscribe(data=> {
            console.log("filtered data is ", data);
            this.portions = data;
        });
    }
}

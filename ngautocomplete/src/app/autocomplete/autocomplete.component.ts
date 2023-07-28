
import { Component, OnInit ,ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { of, fromEvent,Observable } from "rxjs";
import { debounceTime, map,distinctUntilChanged,switchMap,tap } from "rxjs/operators";


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})


export class AutocompleteComponent implements OnInit {
  @ViewChild('carSearchInput') carSearchInput!: ElementRef;
  @Output() setcarNameEvent = new EventEmitter<{name: string}>();

  carSearch() {
    const search$ = fromEvent(this.carSearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(500),  
      distinctUntilChanged(),
      tap(()=> this.isSearching = true),
      switchMap((term) => term ? this.getCars(term) : of<any>(this.cars)),
      tap(() => {
        this.isSearching = false,
        this.showSearches = true;
      }));

      search$.subscribe(data => {
        this.isSearching = false
        this.searchedCars = data;
      })
  }
  ngAfterViewInit() {
    this.carSearch(); // Call carSearch after the view is fully initialized
  }










  cars: any = [];
  carsid: any = [];
  showSearches: boolean = false;
  isSearching:boolean = false;
  searchedCars: any = [];

  constructor() {
    this.cars = ['Audi','alexa', 'BMW', 'Bugatti', 'Ferrari', 'Ford', 'Lamborghini', 'land cruse','Mercedes Benz','mclaren', 'Porsche','panerma', 'Rolls-Royce','rx8', 'Volkswagen','vlan'];
    this.carsid = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    this.searchedCars = this.cars;
  }

  ngOnInit() {
  	this.carSearch();
  }

  getCars(name:string): Observable<any> {
    return of(this.filterCars(name))
  }

  filterCars(name:string) {
    return this.cars.filter((val:any) => val.toLowerCase().includes(name.toLowerCase()) == true )
  }

 

  setCarName(name:any) {
    this.searchedCars = this.filterCars(name);
    this.setcarNameEvent.emit({name});
    this.carSearchInput.nativeElement.value = name;
    this.showSearches = false;
  }

  trackById(index:any,item:any):void{
    return item._id;
  }

  closeDropDown():void {
    this.showSearches = false;
  }

}

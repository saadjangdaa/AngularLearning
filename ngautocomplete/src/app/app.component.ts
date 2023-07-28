import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myfirstapp';
  somevalue = "";
  somevalues:Array<string> = new Array<string>;

 

  clickfunction(){
    this.somevalues.push(this.somevalue);
    this.somevalue="";
  }

  //autocompletge
  car: string = '';

  setCarName($event:any) {
  	this.car = $event.name;
  }
}

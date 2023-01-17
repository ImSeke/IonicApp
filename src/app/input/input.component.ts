import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  result = "" ;
  whiteList: Array<string> = [] ;
  blackList: Array<string> = [] ;



  constructor() { }

  ngOnInit() {
    this.whiteList = ["1234","4321","5678"];
    this.blackList = ["9"];
  }

  submit(value:string) {
    this.result = "Incorrect input";
    if(this.whiteList.includes(value)){
      if(!this.blackList.includes(value)){
        this.blackList.push(value);
        this.result = "Correct input" ;
      } 
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'PaginatorByMoving';
  items : any[];
  p=1;
  _idd = null;
  itemsPerPageAre = 2;
  itemsArray : any[]=[1];
  onLoad=true;
  constructor(private _http : HttpClient){}

  ngOnInit() : void {
    let obj={
      p : this.p,
      createdAt : null,
      onLoad : this.onLoad
    };
    this.getData(obj).subscribe((res:any)=>{
      console.log(res.data);
      if(this._idd === null && res.data.length>=1){
        this._idd=res.data[res.data.length-1].createdAt;
      }
      this.items=res.data;
    });
  }

  getData(obj){
    return this._http.post("http://localhost:3000/getData",obj);
  }

  handlePagination($event){
    if(this.itemsArray.indexOf($event) !== -1){
      this.p=$event;
      return ;
    }
    this.p=$event;
    this.itemsArray.push($event);
    let obj={
      p : this.p,
      createdAt : this._idd
    };
    this._idd=null;
    this.getData(obj).subscribe((res:any)=>{
      console.log(res.data);
      if(this._idd === null && res.data.length>=1){
        this._idd=res.data[res.data.length-1].createdAt;
      }
      this.items=[...this.items, ...res.data];
    });
  }

}

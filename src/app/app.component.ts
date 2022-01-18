import { Component } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee';
  product!:any[]
  value:string= "hello";
  constructor( private api:ApiService) { }

 /* detail=[{
    name:"vojeer",
    age:23,
    email:"vojeerali@gmail.com"

  }]*/
  ngOnInit(): void {
  
  }
 

 form= new FormGroup({
  name: new FormControl("",[Validators.required]),
  password: new FormControl("")
})
  formvalue(data:any){
    console.log(data)
  }
get val(){
  return this.form.get("name")
}

}


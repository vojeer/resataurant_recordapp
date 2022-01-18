import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private formbuilder:FormBuilder, private router:Router, private http:HttpClient) { }
   
  loginform!: FormGroup;
  //userdata!:any[]
  logindetail:any=[]

  ngOnInit(): void {
  
    this.loginform = this.formbuilder.group({
    
      email:["",[Validators.required,Validators.email]],
      password:[""]

    })
  
  }

  login(){

    this.http.get<any>("https://vojeer-ansari-default-rtdb.asia-southeast1.firebasedatabase.app/signup.json").subscribe(res =>{
        
      
       
       this.logindetail= (Object.values(res))
       console.log("login value is ",this.logindetail)

        const hello = this.logindetail.find((a:any)=>{
      
        return a.email === this.loginform.value.email && a.password === this.loginform.value.password;
        
     })
     if(hello){
      alert(" login successful");
      this.loginform.reset();
      this.router.navigate(['restaurent'])
    }
    else{
      alert(' Please enter valid inputs')
    }
    })
   



   
  
      
  }


}

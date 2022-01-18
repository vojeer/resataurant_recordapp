import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private formbuilder:FormBuilder, private http:HttpClient, private router:Router) { }


  signupform!: FormGroup;

  ngOnInit(): void {


  this.signupform = this.formbuilder.group({
   
   name:["",Validators.required],
   mobile:["",Validators.required],
   email:["",Validators.required],
   password:["",Validators.required]
  })
      }

      signup(){

        this.http.post("https://vojeer-ansari-default-rtdb.asia-southeast1.firebasedatabase.app/signup.json",this.signupform.value).subscribe( res =>{
        

         alert("signup succesfully");
        this.signupform.reset();
         this.router.navigate(['login'])

        
      })
      


      }



}

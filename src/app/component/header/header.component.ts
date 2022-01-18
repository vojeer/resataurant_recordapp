import { HttpClient } from '@angular/common/http';
import { Restaurentdata } from './../../restaurent.model';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { map } from 'rxjs';
import { observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  restaurentmodelobj = new Restaurentdata
  restodata: any = [];
  showadd!: boolean
  showupdate!: boolean
  edituserid!:any;
  id!:any;



  formvalue!: FormGroup;

  constructor(private formbuilder: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      name: [""],
      email: [""],
      mobile: [""],
      address: [""],
      service: [""],



    })
    this.allrestodata();

  }

  //   FOR POSTING THE DATA  

  addresto() {

    this.restaurentmodelobj.name = this.formvalue.value.name
    this.restaurentmodelobj.email = this.formvalue.value.email
    this.restaurentmodelobj.mobile = this.formvalue.value.mobile
    this.restaurentmodelobj.address = this.formvalue.value.address
    this.restaurentmodelobj.service = this.formvalue.value.service

    this.api.postrestaurent(this.restaurentmodelobj).subscribe(res => {
      console.log("this is the post data", (Object.values(res)));
      for (const key in res) {
        console.log("this is key ", key)
      }
      this.formvalue.reset();
      this.allrestodata();
      alert("added successfully")
    }

    )
  }

  //  FOR GET METHOD  ..............

  allrestodata(): any {
    let userid: any;

    this.api.getrestaurent(this.restaurentmodelobj)
      .pipe(map((resdata: any) => {
        console.log(resdata)
        const userarray: any = [];
        for (const key in resdata) {
          /* checking the restdata has unique key or not and transforming the data in desire form lik
          
          userid: "randomekey,   name:"  "  vice versa* AND*/
          if (resdata.hasOwnProperty(key)) {

            userarray.push({ userid: key, ...resdata[key] })
          }

        }
        return userarray
      }))
      .subscribe(res => {
          /*data convert in array */ this.restodata = (Object.values(res))

        console.log("this is final data", this.restodata)
      })



  }

  //FOR DELTE THE DATA ....

  deleteresto(userid:any) {
    
    if(confirm("do you want to delete")){
      console.log(userid)
    }

    this.api.deleterestaurent(userid).subscribe(res => {

     this.allrestodata();

    
    })
  }

  // DISAABLE THE ADD OR UPDATE BUTTON USING THE FUNCTION ON ADD RESTAURENT BUTTON

  clickonaddrestaurent() {

    this.formvalue.reset()
    this.showupdate = false;
    this.showadd = true;
  }

  // FOR EDIT THE DATA

  onedit(edituserid:any,id:any) {
    console.log("edit id data",edituserid)
    //THE SAME ID USED IN THE UPDATE METHOD 
    this.edituserid=edituserid;


    console.log("edit data is ",this.restodata[id])
     
    //this.restaurentmodelobj.id = data.id;
    this.formvalue.controls['name'].setValue(this.restodata[id].name);
    this.formvalue.controls['email'].setValue(this.restodata[id].email);
    this.formvalue.controls['mobile'].setValue(this.restodata[id].mobile);
    this.formvalue.controls['address'].setValue(this.restodata[id].address);
    this.formvalue.controls['service'].setValue(this.restodata[id].service);
  
    this.showupdate = true;
    this.showadd = false;



  }
  //  FOR UPDATE THE DATA OF FORM 

  update() {

    console.log( "update id",this.edituserid)
     this.restodata.name = this.formvalue.value.name;
    this.restodata.email = this.formvalue.value.email;
    this.restodata.mobile = this.formvalue.value.mobile;
    this.restodata.address = this.formvalue.value.address;
    this.restodata.service = this.formvalue.value.service;
    console.log("upadare data",this.restodata)

    this.api.updaterestaurent(this.edituserid,this.restodata).subscribe(res => {
      alert("update succesfully")
      this.formvalue.reset();
      this.allrestodata();



    })  
  
  }

  //FOR LOGOUT THE USER

  logout() {

    this.router.navigate(['login'])
  }
  




}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { map, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   url:any="https://vojeer-ansari-default-rtdb.asia-southeast1.firebasedatabase.app/user.json";
   url2:any="https://vojeer-ansari-default-rtdb.asia-southeast1.firebasedatabase.app/user/";
   
   


  constructor(private http:HttpClient) { }

  postrestaurent(data:any){

     return this.http.post<any>(this.url,data).pipe(map(res =>{
       return (Object.values(res))
     }))
  }

  getrestaurent(data:any){

    return this.http.get(this.url).pipe(map(res=>{
      return res;
    }))
 }

 deleterestaurent( userid:any){

  return this.http.delete(this.url2+userid+".json").pipe(map(res=>{
    return res;
    
    
    
  }))
}

updaterestaurent(userid:any,data:any){
  console.log("this is the update id",userid)

  return this.http.put(this.url2+userid+".json",data).pipe(map(res=>{
    
    return res;
  }))
}

 
  
}

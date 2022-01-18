import { ApiService } from 'src/app/shared/api.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor( private api:ApiService) { }
  

  ngOnInit(): void {

   }

   @ Input() heading!:String
  

}

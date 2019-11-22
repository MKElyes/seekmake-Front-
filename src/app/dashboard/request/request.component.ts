import { Component, OnInit } from '@angular/core';
import { SeekServiceService } from 'src/app/seek-service.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  requests =[];

  constructor(private service : SeekServiceService) { }

  ngOnInit() {

     this.service.getallrequest().subscribe((data :any)=>{

      this.requests=data.data;
      console.log(data);
    })
  }
  accept(){
    this.service.updateStauts().subscribe((data:any)=>{
      console.log(data);
      
    })
  }
}

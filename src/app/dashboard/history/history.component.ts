import { Component, OnInit } from '@angular/core';
import { SeekServiceService } from 'src/app/seek-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  requests =[];

  constructor(private service :SeekServiceService) { }

  ngOnInit() {


    this.service.getallrequest().subscribe((data :any)=>{

      this.requests=data.data;
      console.log(data);
    })
  }

  

}

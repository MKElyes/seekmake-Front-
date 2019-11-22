import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const host : string ="http://localhost:3000/";
let headears = new HttpHeaders

headears.append("Content-Type", "application/base64");


@Injectable({
  providedIn: 'root'
})
export class SeekServiceService {

  constructor( private http : HttpClient) { }

  fileUpload(body){
    
    return this.http.post(host+'file/upload',body,{headers:headears})
  }

  sendRequest(body){
    return this.http.post(host+'api/request',body)
  }
  getallrequest(){
    return this.http.get(host+'api/request/all')
  }
  updateStauts(){
    return this.http.get(host + 'request/updateStatus/:id/:status')
  }


}


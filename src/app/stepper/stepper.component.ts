import { Component, OnInit , EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { FileUploader,  FileSelectDirective} from 'ng2-file-upload';
import { requestmodel } from '../Model/requestmodel';
import { SeekServiceService } from '../seek-service.service';

const URL = 'http://localhost:3000/file/upload';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})

export class StepperComponent implements OnInit {
  fileName;
  file;
  obj;
  userFileName:string;
  fileObject: any;
  public uploader :FileUploader = new FileUploader ({url:URL
  
  })
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
    
  constructor(private _formBuilder: FormBuilder , private serv : SeekServiceService) { 
    

  }
  
  form = this._formBuilder.group({
    product: ['',Validators.required],
    epaisseur: [''],
    drop: [''],
    name: [''],
    email: [''],
    phonneNumber: [''],
    address: ['']

  });
  
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      product: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      file:['', Validators.required],
      epaisseur:['', Validators.required],
      drop:['', Validators.required],
     
    });
    this.thirdFormGroup = this._formBuilder.group({
      name:['', Validators.required],
      email:['', Validators.required],
      phonneNumber:['', Validators.required],
      address:['', Validators.required],
     
    });
  }
    click(){
      this.serv.fileUpload(this.file).subscribe( data => {
        
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
          //data contains the file as base64 
       
          
      });
    }

   onFileSelected(event: EventEmitter<File[]>) {
    let that = this;
    const file: File = event[0];
    this.userFileName=file.name
    console.log(file);

    this.readBase64(file)
      .then(function(data) {
        console.log(data);
      
      that.obj= data;
      console.log('---------',that.obj);
      that.serv.fileUpload(data).subscribe( data => {
        
        console.log(data);
          //data contains the file as base64 
       
          
      });
 
      
    }) ;

  }  
  
  // sending form.value
  sendForm(){
    this.serv.sendRequest(this.form.value).subscribe(data => {
      console.log(data);
      
    } ) 
  }


  Show(){
    let prepareRequest:requestmodel
    prepareRequest.epaisseur=this.form.value.epaisseur,




    prepareRequest.file= URL+"/upload/"+this.userFileName;
    console.log(this.form.value);
    
  }
//   fileProgress(fileInput: any) {
//     this.fileData = <File>fileInput.target.files[0];
//     this.preview();
// }
// preview() {
//     // Show preview 
//     var mimeType = this.fileData.type;
//     if (mimeType.match(/image\/*/) == null) {
//       return;
//     }
 
//     var reader = new FileReader();      
//     reader.readAsDataURL(this.fileData); 
//     reader.onload = (_event) => { 
//       this.previewUrl = reader.result; 

//     }
// }

//read file as base64



 readBase64(file): Promise<any> {
  var reader  = new FileReader();
  var future = new Promise((resolve, reject) => {
    reader.addEventListener("load", function () {
      resolve(reader.result);
    }, false);

    reader.addEventListener("error", function (event) {
      reject(event);
    }, false);

    reader.readAsDataURL(file);
  });
  return future;
}

public onFileChange(event) {
  const reader = new FileReader();

  if (event.target.files && event.target.files.length) {
    this.fileName = event.target.files[0].name;
    const [file] = event.target.files;
    reader.readAsDataURL(file);
   
    reader.onload = () => {
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      
console.log(reader.result);
this.file=reader.result
    };
  }
} 

}

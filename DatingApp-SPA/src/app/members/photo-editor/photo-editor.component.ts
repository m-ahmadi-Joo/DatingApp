import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AlertifyService } from 'src/app/_services/alertify.service';

type picurl = string;

type picUrl = string;

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() declare photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  declare uploader:FileUploader;
  declare hasBaseDropZoneOver:boolean;
  declare hasAnotherDropZoneOver:boolean;
  declare response:string;

  // const URL = '/api/';
  baseUrl = environment.apiUrl;
  currentMain: Photo | undefined;
  constructor(private authService: AuthService, private userService: UserService,
    private alertify: AlertifyService) {
    this.uploader = new FileUploader({
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item: any) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe( res => this.response = res );
  }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken : 'Bearer ' + localStorage.getItem('token'),
      isHTML5 : true,
      allowedFileType : ['image'],
      autoUpload : false,
      maxFileSize : 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;}

    this.uploader.onSuccessItem = (item : any, response, status, headers) => {
      if(response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded : res.dateAdded,
          description : res.description,
          isMain : res.isMain
        };
        this.photos.push(photo)
      }

    }
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      // console.log('Successfully set to main');
      this.currentMain = this.photos.filter(p=> p.isMain === true)[0];
      this.currentMain.isMain = false;
      this.getMemberPhotoChange.emit(photo.url)
    }, error => {

      this.alertify.error(error);
    });
  }
}

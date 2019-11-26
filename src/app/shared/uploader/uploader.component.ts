import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UploaderService } from './uploader.service';
import S3 from 'aws-sdk/clients/s3';
import { s3Credentials } from '../../models/auth_config';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  selectedFiles: FileList;
  uploadCounter = 0;
  selectedFilesSource: Array<string> = [];
  @Output() completedUploadEvent = new EventEmitter<Array<string>>();


  constructor(private uploaderService: UploaderService, private alertService: ToastrService) {}

  ngOnInit() {}

  upload() {
    const files = this.selectedFiles;
    for (let i = 0; i < files.length; i++) {
      let file = files.item(i);
      this.uploadFile(file, files.length);
    }
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadFile(file, totalFiles: number) {
    this.uploadCounter++;
    const contentType = file.type;
    const bucket = new S3({
      accessKeyId: s3Credentials.accessKeyId,
      secretAccessKey: s3Credentials.secretAccessKey,
      region: s3Credentials.region
    });
    const params = {
      Bucket: `plan-pack-repeat`,
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      this.uploadCounter--;
      if (this.uploadCounter === 0) {
        this.alertService.success('Successfully uploaded the photo(s)!');
        this.completedUploadEvent.emit(this.selectedFilesSource);
        this.selectedFilesSource = [];
      }
      console.log('Successfully uploaded file.', data);
      this.selectedFilesSource.push(data.Location);
      return true;
    });

    // for upload progress
    bucket.upload(params).on('httpUploadProgress', (evt) => {
          console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
      }).send((err, data) => {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
      });
  }
}

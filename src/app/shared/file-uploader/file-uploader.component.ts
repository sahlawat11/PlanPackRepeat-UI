// import { Component, OnInit, OnDestroy, Output, Input, ViewChildren, QueryList, ElementRef, EventEmitter } from '@angular/core';
// import { Subject } from 'rxjs/Subject';
// import { FileUploader } from 'ng2-file-upload';
// import { UserService } from '../../services/user.service';
// import { UtilityService } from '../../services/utility.service';
// import { AwsS3ConfigService } from '../../services/aws-s3-config.service';
// import { FileUploaderService } from './file-uploader.service';
// import { ConfigService } from '../../services/config.service';
// import { find, indexOf } from 'lodash';
// import * as moment from 'moment/moment';
// import * as AWS from 'aws-sdk/global';
// import * as S3 from 'aws-sdk/clients/s3';
// import { Subscription } from 'rxjs/Rx';

// const URL = '';
// const fileTypes = [
//   { extension: 'jpg', label: 'image/jpeg', icon: 'img', displayType: 'JPEG' },
//   { extension: 'png', label: 'image/png', icon: 'img', displayType: 'PNG' },
//   { extension: 'gif', label: 'image/gif', icon: 'img', displayType: 'GIF' },
//   { extension: 'svg', label: 'image/svg+xml', icon: 'img', displayType: 'SVG' },
//   { extension: 'pdf', label: 'application/pdf', icon: 'pdf', displayType: 'PDF' },
//   { extension: 'zip', label: 'application/zip', icon: 'zip', displayType: 'ZIP' },
//   { extension: 'doc', label: 'application/msword', icon: 'word', displayType: 'Word Document' },
//   { extension: 'docx', label: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', icon: 'word', displayType: 'Word Document' },
//   { extension: 'xls', label: 'application/vnd.ms-excel', icon: 'excel', displayType: 'Excel Spreadsheet' },
//   { extension: 'xlsx', label: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', icon: 'excel', displayType: 'Excel Workbook' },
//   { extension: 'psd', label: 'image/vnd.adobe.photoshop', icon: 'generic', displayType: 'Photoshop File' },
//   { extension: 'ai', label: 'application/postscript', icon: 'generic', displayType: 'Illustrator File' },
//   { extension: 'prproj', label: '', icon: 'generic', displayType: 'Premiere Pro Project' },
//   { extension: 'xml', label: 'application/xml', icon: 'generic', displayType: 'XML' },
//   { extension: 'indd', label: '', icon: 'generic', displayType: 'InDesign File' },
//   { extension: 'aep', label: '', icon: 'generic', displayType: 'After Effects Project' },
//   { extension: 'scc', label: '', icon: 'generic', displayType: 'SCC' },
//   { extension: 'srt', label: '', icon: 'generic', displayType: 'SRT' },
//   { extension: 'dfxp', label: '', icon: 'generic', displayType: 'DFXP' },
//   { extension: 'ttml', label: '', icon: 'generic', displayType: 'TTML' },
//   { extension: 'vtt', label: '', icon: 'generic', displayType: 'VTT' }
// ];

// @Component({
//   selector: 'app-file-uploader',
//   templateUrl: './file-uploader.component.html',
//   styleUrls: ['./file-uploader.component.scss']
// })

// export class FileUploaderComponent implements OnInit, OnDestroy {
//   @ViewChildren('downloadLink') downloadLink: QueryList<ElementRef>;
//   @Input() uploadedFileQueue: Array<any>;
//   @Input() showAttachmentsHeader: boolean;
//   @Input() isReadOnly: boolean;
//   @Input() showDownloadAll: boolean; // download all at bottom
//   @Input() hideAttachmentControls: boolean; // download all with attachment header on top
//   @Input() disableFilePreview: boolean = false;
//   @Input('parentComponent') parentComponent;
//   @Output() onContentChange = new EventEmitter<any>();
//   @Output() filesMetadata = new EventEmitter<any>();

//   subscriptions = new Subscription();
//   progress;
//   uploader: FileUploader = new FileUploader({
//     url: URL,
//     autoUpload: true,
//     maxFileSize: 20 * 1024 * 1024, // 20 MB
//     allowedMimeType: this.getFileTypes()
//   });
//   queueLimit = 20;
//   noticeWaitTime = 10000;
//   userName: string;
//   userEmail: string;
//   hasBaseDropZoneOver = false;
//   hasInvalidType = false;
//   exceedMaxSize = false;
//   exceedMaxCount = false;
//   hasError = false;
//   timeoutType;
//   timeoutSize;
//   timeoutCount;
//   timeoutError;
//   isNewUpload = true; // timer for showing errors for multiple files
//   timeoutUpload;
//   fileItemsArray: Array<any> = [];
//   inProgressFileQueue: Array<any> = [];
//   previewFileSubject: Subject<File> = new Subject();
//   fileUploadRequests: Array<AWS.Request<S3.PutObjectOutput, AWS.AWSError>> = [];

//   constructor(private fileUploaderService: FileUploaderService, private userService: UserService, private utilityService: UtilityService,
//     private awsS3Service: AwsS3ConfigService, private configService: ConfigService) { }

//   getFileTypes(): Array<string> {
//     const list = [];
//     fileTypes.forEach(type => list.push(type.label));
//     return list;
//   }

//   getFileIcon(targetType: string) {
//     let icon = 'generic';
//     fileTypes.forEach(type => {
//       if (type.extension === targetType || type.label === targetType) {
//         icon = type.icon;
//       }
//     });
//     return '/assets/images/placeholder-img-' + icon + '.png';
//   }

//   getFileExtension(name: string) {
//     return name.substr(name.lastIndexOf('.') + 1);
//   }

//   getFileTypeName(extension: string) {
//     const fileTypeObj = find(fileTypes, (fileType) => {
//       return (fileType.extension === extension);
//     });
//     if (!fileTypeObj) {
//       return '';
//     }
//     return fileTypeObj.displayType;
//   }

//   fileOverBase(e: any): void {
//     if (!this.isReadOnly) {
//       this.hasBaseDropZoneOver = e;
//     }
//   }

//   handleUploading(fileItemsObj) {
//     this.fileItemsArray.push.apply(this.fileItemsArray, fileItemsObj);
//     this.fileItemsArray.forEach((fileItem, index) => {
//       if (!fileItem.isFileUploaded && !fileItem.isFileUploading) {
//         fileItem.isFileUploading = true;
//         this.inProgressFileQueue.push(fileItem);
//         if (this.isNewUpload) {
//           this.clearErrorFlags();
//         }
//         fileItem.file.createdDate = moment().format();
//         fileItem.file.uploaderEmail = this.userEmail;
//         fileItem.file.uploaderName = this.userName;
//         let removed = false;
//         if (fileItem.file.type === '') {
//           if (!fileTypes.find(type => {
//             return type.extension === this.getFileExtension(fileItem.file.name);
//           })) {
//             this.clearErrorFlags();
//             this.uploader.removeFromQueue(fileItem);
//             removed = true;
//             this.hasInvalidType = true;
//             this.timeoutType = setTimeout(() => { this.hasInvalidType = false; }, this.noticeWaitTime);
//           }
//         }
//         // file count validation
//         const fileCount = this.uploadedFileQueue.length + this.uploader.queue.length;
//         if (fileCount > this.queueLimit) {
//           if (!removed) {
//             this.clearErrorFlags();
//             this.uploader.removeFromQueue(fileItem);
//           }
//           this.exceedMaxCount = true;
//           this.timeoutCount = setTimeout(() => { this.exceedMaxCount = false; }, this.noticeWaitTime);
//         }
//         clearTimeout(this.timeoutUpload);
//         this.isNewUpload = false;
//         // this.timeoutUpload = setTimeout(() => {this.isNewUpload = true; }, 100);
//         this.filesMetadata.emit(this.getCurrentStatus());
//         // this.onContentChange.emit(this.getStatus());
//       }
//     });
//     this.uploadFile(this.inProgressFileQueue);
//   }

//   getRawFiles(filesObj): Array<File> {
//     let rawFilesArray: Array<File> = [];
//     for (let fileObj of filesObj) {
//       rawFilesArray.push(fileObj.file.rawFile);
//     }
//     return rawFilesArray;
//   }

//   handleFailedFile(fileItem, filter) {
//     clearTimeout(this.timeoutUpload);
//     this.isNewUpload = false;
//     this.clearErrorFlags();
//     this.timeoutUpload = setTimeout(() => { this.isNewUpload = true; }, 100);
//     switch (filter.name) {
//       case 'fileSize':
//         this.exceedMaxSize = true;
//         this.timeoutSize = setTimeout(() => { this.exceedMaxSize = false; }, this.noticeWaitTime);
//         break;
//       case 'mimeType':
//         this.hasInvalidType = true;
//         this.timeoutType = setTimeout(() => { this.hasInvalidType = false; }, this.noticeWaitTime);
//         break;
//       default:
//         this.hasError = true;
//         this.timeoutError = setTimeout(() => { this.hasError = false; }, this.noticeWaitTime);
//         break;
//     }
//   }

//   downloadAllFiles() {
//     let attachmentsIdArray = this.uploadedFileQueue.map(uploadedFile => uploadedFile.id);
//     this.subscriptions.add(this.fileUploaderService.downloadAllAttachedFiles(attachmentsIdArray).subscribe((data) => {
//       const a = document.createElement('a');
//       document.body.appendChild(a);
//       const blob = new Blob([data], { type: data.type });
//       const url = window.URL.createObjectURL(blob);
//       a.href = url;
//       a.download = 'attachments';
//       a.click();
//       window.URL.revokeObjectURL(url);
//     }));
//   }

//   downloadFile(fileItem) {
//     this.subscriptions.add(this.fileUploaderService.downloadAttachedFile(fileItem.id).subscribe((data) => {
//       const a = document.createElement('a');
//       document.body.appendChild(a);
//       const blob = new Blob([data], { type: data.type });
//       const url = window.URL.createObjectURL(blob);
//       a.href = url;
//       a.download = fileItem.originalName;
//       a.click();
//       window.URL.revokeObjectURL(url);
//     }));
//   }

//   clearErrorFlags() {
//     clearTimeout(this.timeoutType);
//     clearTimeout(this.timeoutSize);
//     clearTimeout(this.timeoutCount);
//     clearTimeout(this.timeoutError);
//     this.hasInvalidType = false;
//     this.exceedMaxSize = false;
//     this.exceedMaxCount = false;
//     this.hasError = false;
//   }

//   ngOnInit() {
//     this.userEmail = this.userService.getUserLoginInfo().email;
//     this.userName = this.userService.getUserLoginInfo().displayName;
//     if (this.isReadOnly) {
//       this.uploader.setOptions({ queueLimit: 0 });
//     }
//     if (!this.uploadedFileQueue) {
//       this.uploadedFileQueue = [];
//     }
//     this.uploader.onAfterAddingAll = this.handleUploading.bind(this);
//     this.uploader.onWhenAddingFileFailed = this.handleFailedFile.bind(this);
//   }

//   uploadFile(files: Array<any>) {
//     this.subscriptions.add(this.awsS3Service.getAWSCognitoCredentials().subscribe(
//       (data) => {
//         const awsS3Credentails = this.awsS3Service.getAWSS3Credentials();
//         const bucket = new S3(
//         {
//           accessKeyId: awsS3Credentails.accessKeyId,
//           secretAccessKey: awsS3Credentails.secretAccessKey,
//           sessionToken: awsS3Credentails.sessionToken,
//           region: 'us-east-1'
//         });
//         for (const fileItem of files) {
//           if (fileItem.isFileUploading && !fileItem.isUploadingToS3) {
//             fileItem.isUploadingToS3 = true;
//             fileItem.file.originalName = fileItem.file.name;
//             fileItem.file.name = `${this.utilityService.generateGuid()}-${moment().format()}-${fileItem.file.rawFile.name}`;
//             fileItem.uploadProgress = 0;
//             const params = {
//               Bucket: this.awsS3Service.getS3BucketName(),
//               Key: fileItem.file.name,
//               Body: fileItem.file.rawFile
//             };
//             // let fileUploadRequest = bucket.upload(params, (error, data) => {
//             const fileUploadRequest = bucket.putObject(params, (error, data) => {
//               if (error) {
//                 console.log('AWS ERROR: There was an error uploading your file:', error);
//               } else {
//                 console.log('AWS: Successfully uploaded file.', data);
//                 fileItem.isFileUploading = false;
//                 fileItem.isFileUploaded = true;
//                 const payload = {
//                   originalName: fileItem.file.originalName,
//                   name: fileItem.file.name,
//                   type: this.getFileExtension(fileItem.file.name),
//                   contentLength: fileItem.file.size,
//                   createdBy: fileItem.file['uploaderEmail'],
//                   createdDate: fileItem.file['createdDate']
//                 };
//                 this.fileUploadRequests.splice(this.fileUploadRequests.indexOf(fileUploadRequest), 1);
//                 this.uploadedFileQueue.push(payload);
//                 this.uploader.removeFromQueue(fileItem);
//                 this.onContentChange.emit(payload);
//                 // delete payload.createdDate;
//                 this.filesMetadata.emit(this.getCurrentStatus());
//               }
//             }).on('httpUploadProgress', (uploadProgress) => {
//               fileItem.uploadProgress = Math.round(uploadProgress.loaded / uploadProgress.total * 100);
//             });
//             fileUploadRequest['params'].Body.originalName = params.Key;
//             this.fileUploadRequests.push(fileUploadRequest);
//           }
//         }
//       }
//     ));
//   }

//   getCurrentStatus() {
//     return {
//       'uploadedFileQueue': this.uploadedFileQueue,
//       'uploadingInProgressQueue': this.uploader.queue
//     };
//   }

//   abortUpload(fileItem) {
//     const fileItemIndex = indexOf(this.fileUploadRequests, find(this.fileUploadRequests, (fileUploadRequest) => {
//       return (fileUploadRequest['params'].Body.originalName === fileItem.file.name);
//     }));
//     if (fileItemIndex < 0) {
//       this.uploader.queue.splice(indexOf(this.uploader.queue, fileItem), 1);
//     } else {
//       if (fileItem && fileItemIndex >= 0) {
//         this.fileUploadRequests[fileItemIndex].abort();
//         this.fileUploadRequests.splice(fileItemIndex, 1);
//         this.uploader.removeFromQueue(fileItem);
//         this.filesMetadata.emit(this.getCurrentStatus());
//       }
//     }
//   }

//   deleteFilesWithMetaData(fileItem) {
//     this.fileUploaderService.deleteUploadedFileMetadata(fileItem, this.uploadedFileQueue);
//     this.clearErrorFlags();
//   }

//   /* deleteUploadedFileMetadata(fileItem) {
//     fileItem.isDeleted = true;
//     if (typeof fileItem.id === 'undefined') {
//       this.deleteUploadedFileFromS3(fileItem);
//     } else {
//       this.subscriptions.add(this.fileUploaderService.deleteAttachedFile(fileItem.id).subscribe(
//         (data) => {
//           console.log('Successfully deleted file metadata');
//           this.deleteUploadedFileFromS3(fileItem);
//         },
//         (error) => {
//           console.log('Error: delete file request failed.');
//           fileItem.isDeleted = false;
//         }
//       ));
//     }
//   }

//   deleteUploadedFileFromS3(fileItem) {
//     // deleting file from S3 now
//     this.subscriptions.add(this.awsS3Service.getAWSCognitoCredentials().subscribe(
//       (data) => {
//         const awsS3Credentails = this.awsS3Service.getAWSS3Credentials();
//         const bucket = new S3({
//           accessKeyId: awsS3Credentails.accessKeyId,
//           secretAccessKey: awsS3Credentails.secretAccessKey,
//           sessionToken: awsS3Credentails.sessionToken,
//           region: 'us-east-1'
//         });
//         const params = {
//           Bucket: this.awsS3Service.getS3BucketName(),
//           Key: fileItem.name,
//         };
//         bucket.deleteObject(params, (error, data) => {
//           if (error) {
//             console.log('AWS ERROR: The request file could not be deleted.', error);
//             fileItem.isDeleted = false;
//           } else {
//             console.log('AWS: Successfully deleted the requested file.', data);
//             this.uploadedFileQueue.forEach((file, index, object) => {
//               if (file.name === fileItem.name) {
//                 object.splice(index, 1);
//               }
//             });
//             this.clearErrorFlags();
//           }
//         });
//       }
//     ));
//   } */

//   getDisplayNameFromEmail(email: string): string {
//     return this.utilityService.getDisplayNameFromEmail(email);
//   }

//   selectFile(fileItem) {
//     const fileType = find(fileTypes, (fileType) => {
//       return fileType.extension.toLowerCase() === fileItem.type.toLowerCase();
//     });
//     if (fileType.icon === 'img') {
//       this.previewFileSubject.next(fileItem);
//     } else {
//       this.downloadFile(fileItem);
//     }
//   }

//   ngOnDestroy() {
//     this.fileUploadRequests.forEach((fileUploadRequest) => {
//       fileUploadRequest.abort();
//     });
//     if (this.previewFileSubject) {
//       this.previewFileSubject.unsubscribe();
//     }
//     this.subscriptions.unsubscribe();
//   }

// }

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs/Rx';
// import { AwsS3ConfigService } from '../../services/aws-s3-config.service';
// import * as S3 from 'aws-sdk/clients/s3';
// import 'rxjs/add/observable/of';

// import { ConfigService } from '../../services/config.service';

// @Injectable()
// export class FileUploaderService {

//   subscriptions = new Subscription();
  
//   constructor(private httpClient: HttpClient, private configService: ConfigService, private awsS3Service: AwsS3ConfigService) { }

//   downloadAttachedFile(fileId) {
//     return this.httpClient.get(`${this.configService.fileHandlerUrl}/${fileId}`, {responseType: 'blob'}).map(response => <Blob>response);
//   }

//   downloadAllAttachedFiles(fileIdArray: Array<string>) {
//     return this.httpClient.get(`${this.configService.fileHandlerUrl}?ids=${fileIdArray.join(',')}`,
//     {responseType: 'blob'}).map(response => <Blob>response);
//   }

//   deleteAttachedFile(fileId) {
//     return this.httpClient.delete(`${this.configService.fileHandlerUrl}-metadata/${fileId}`, { responseType: 'text' }).retryWhen(error => {
//       return error.flatMap((error) => {
//         return Observable.of(error.status).delay(200);
//       }).take(5).concat(Observable.throw({error}));
//     });
//   }


//   deleteUploadedFileMetadata(fileItem, uploadedFileQueue) {
//     fileItem.isDeleted = true;
//     if (typeof fileItem.id === 'undefined') {
//       this.deleteUploadedFileFromS3(fileItem, uploadedFileQueue);
//     } else {
//       this.subscriptions.add(this.deleteAttachedFile(fileItem.id).subscribe(
//         (data) => {
//           console.log('Successfully deleted file metadata');
//           this.deleteUploadedFileFromS3(fileItem, uploadedFileQueue);
//         },
//         (error) => {
//           console.log('Error: delete file request failed.');
//           fileItem.isDeleted = false;
//         }
//       ));
//     }
//   }

//   deleteUploadedFileFromS3(fileItem, uploadedFileQueue) {
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
//             uploadedFileQueue.forEach((file, index, object) => {
//               if (file.name === fileItem.name) {
//                 object.splice(index, 1);
//               }
//             });
//             //this.clearErrorFlags();
//           }
//         });
//       }
//     ));
//   }

//   ngOnDestroy() {
//     this.subscriptions.unsubscribe();
//   }

// }

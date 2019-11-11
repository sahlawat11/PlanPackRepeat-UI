import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit {

  @Output() dialogRef = new EventEmitter<any>();
  @Input() content: string;

  @ViewChild('dialog', {static: false}) dialog: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dialogRef.emit(this.dialog);
  }

}

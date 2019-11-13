import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
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

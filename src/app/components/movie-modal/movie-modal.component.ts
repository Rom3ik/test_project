import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss']
})
export class MovieModalComponent implements OnInit {
  character = [];
  propsData = {};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<MatDialog>) {
    this.propsData = this.data.data;
  }

  ngOnInit(): void {
  }


  closeDialog() {
    this.dialogRef.close();
  }

}

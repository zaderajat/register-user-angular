import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService, Data } from '../data.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public isAvailable$ = new BehaviorSubject<boolean>(false);
  public state$: Observable<Data> | undefined;
  data: any;
  selectedImage: any;
  fileimage: any;
  data1: any;

  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.state$ = this.dataService.getState();
    this.data = this.state$;
    this.selectedImage = this.data.source._value.image?.name;

    if (this.data.source._value.image) {
      const reader = new FileReader();
      reader.readAsDataURL(this.data.source._value.image);
      reader.onload = (e: any) => {
        const img = new Image();
        this.selectedImage = e.target.result;
      };
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileimage = file;
    let obj = {
      first_name: this.data.source._value.first_name,
      last_name: this.data.source._value.last_name,
      mob_no: this.data.source._value.mob_no,
      email: this.data.source._value.email,
      age: this.data.source._value.age,
      country: this.data.source._value.country,
      state: this.data.source._value.state,
      address: this.data.source._value.address,
      tags: this.data.source._value.tags,
      newsLetter: this.data.source._value.newsLetter,
      image: this.fileimage,
    };
    this.data1 = obj;
    this.dataService.setState(this.data1);
    this.toastr.success('Image updated successfully');
    this.state$ = this.dataService.getState();
    this.data = this.state$;
    this.selectedImage = this.data.source._value.image?.name;

    if (this.data.source._value.image) {
      const reader = new FileReader();
      reader.readAsDataURL(this.data.source._value.image);
      reader.onload = (e: any) => {
        const img = new Image();
        this.selectedImage = e.target.result;
      };
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: this.data.source._value,
      width: '640px',
      disableClose: true,
    });
  }
}

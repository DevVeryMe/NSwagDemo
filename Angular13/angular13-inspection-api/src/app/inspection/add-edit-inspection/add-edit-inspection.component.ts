import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';
import { Inspection, InspectionsServiceProxy } from 'src/shared/service-proxies/service-proxies';

@Component({
  selector: 'app-add-edit-inspection',
  templateUrl: './add-edit-inspection.component.html',
  styleUrls: ['./add-edit-inspection.component.css']
})
export class AddEditInspectionComponent implements OnInit {

  @Input() inspection:any;
  id: number = 0;
  status: string = "";
  comments: string = "";
  inspectionTypeId!: number;


  inspectionList$!: Observable<any[]>;
  statusList$!: Observable<any[]>;
  inspectionTypesList$!: Observable<any[]>;

  constructor(private service:InspectionApiService, private nswagService: InspectionsServiceProxy) { }
  ngOnInit(): void {
    
    this.id = this.inspection.id;
    this.status = this.inspection.status;
    this.comments = this.inspection.comments;
    this.inspectionTypeId = this.inspection.inspectionTypeId;
    this.statusList$ = this.service.getStatusList();
    this.inspectionList$ = this.service.getInspectionList();
    this.inspectionTypesList$ = this.service.getInspectionTypesList();

  }

  addInspection() {
    var inspection : Inspection = {
      status:this.status,
      comments:this.comments,
      inspectionTypeId:this.inspectionTypeId
    }

    // this.service.addInspection(inspection).subscribe(res => {
    //   var closeModalBtn = document.getElementById('add-edit-modal-close');

    //   if(closeModalBtn) {
    //     closeModalBtn.click();
    //   }

    //   var showAddSuccess = document.getElementById('add-success-alert');
    //   if(showAddSuccess) {
    //     showAddSuccess.style.display = "block";
    //   }

    //   setTimeout(function() {
    //     if(showAddSuccess) {
    //       showAddSuccess.style.display = "none"
    //     }
    //   }, 4000);
    // })

    this.nswagService.inspectionsPOST(inspection).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');

      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }

      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    })

  }

  updateInspection() {
    var inspection = {
      id: this.id,
      status:this.status,
      comments:this.comments,
      inspectionTypeId:this.inspectionTypeId
    }
    var id:number = this.id;
    this.service.updateInspection(id,inspection).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    })

  }

}
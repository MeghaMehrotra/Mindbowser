import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('myButton', {static: true}) myButton: ElementRef;
  @ViewChild('closeEditModal', {static: true}) closeEditModal: ElementRef;


  empDetail: FormGroup;
  empAdd: FormGroup;
  details: any = {};
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  mobile: FormControl;
  city: FormControl;
  dob: FormControl;
  address: FormControl;
  id: FormControl;
  updatedEmp = {};

  empList: any = [];

  constructor(private formsBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { }


  ngOnInit() {
    this.createFormControls();
    this.createEmpForm();
    this.getEmployees(localStorage.getItem('id'));
  }
  getEmployees(id) {
    this.httpClient.get('http://localhost:8080/employee/manager/' + id,
    {
      headers: new HttpHeaders()
        .append(
          'Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
    }).subscribe(res => {
      console.log(res);
      this.empList = res;
    });
  }
  createFormControls() {
    this.firstName = new FormControl('', [
      Validators.required
    ]);
    this.lastName = new FormControl('', [
      Validators.required
    ]);
    this.address = new FormControl('', [
      Validators.required
    ]);
    this.dob = new FormControl('', [
      Validators.required
    ]);
    this.mobile = new FormControl('', [
      Validators.required
    ]);
    this.city = new FormControl('', [
      Validators.required
    ]);
    this.id = new FormControl([
      Validators.required
    ]);
  }

  createEmpForm() {
    this.empDetail = this.formsBuilder.group({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      dob: this.dob,
      mobile: this.mobile,
      city: this.city
    });
  }

  editEmp(emp) {
    this.httpClient.get(`http://localhost:8080/`);
    const obj = {
      firstName: emp.firstName,
      lastName: emp.lastName,
      address: emp.address,
      dob: emp.dob,
      mobile: emp.mobile,
      city: emp.city,
      id: emp.id
    };
    this.empDetail.setValue(obj);
  }
  addEmp() {
    this.myButton.nativeElement.click();
    this.httpClient.post(`http://localhost:8080/employee/` + localStorage.getItem('username'), this.empDetail.value,
      {
        headers: new HttpHeaders()
          .append(
            'Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
      }).subscribe((res: any ) => {
      if (res.Status === true) {
      alert(res.responseMessage);
       }
      this.getEmployees(localStorage.getItem('id'));
      });
  }
  updateEmp() {
    this.closeEditModal.nativeElement.click();
    this.httpClient.post(`http://localhost:8080/employee/update`, this.empDetail.value,
      {
        headers: new HttpHeaders()
          .append(
            'Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
      }).subscribe((res: any ) => {
        alert(res.responseMessage);
        this.getEmployees(localStorage.getItem('id'));
      });
  }

  deleteEmployee(emp) {
    const filterList = this.empList.filter(item => {
      return emp.mobile !== item.mobile;
    });
    console.log(filterList);
    this.empList = filterList;

    this.httpClient.get('http://localhost:8080/employee/delete/' + emp.id,
    {
      headers: new HttpHeaders()
        .append(
          'Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
    }).subscribe((res: any ) => {
      alert(res.responseMessage);
      this.getEmployees(localStorage.getItem('id'));
    });
}

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);

  }

}

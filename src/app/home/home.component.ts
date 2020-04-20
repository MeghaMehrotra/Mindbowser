import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  empDetail: FormGroup;
  details: any = {};
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  mobile: FormControl;
  city: FormControl;
  dob: FormControl;
  address: FormControl;



  empList = [
    {
      firstName: 'Ram',
      lastName: 'Sharma',
      mobile: '9009388988',
      city: 'Indore',
      dob: 1587295949000,
      address: 'Madhya Pradesh',
      email: 'abc@gmail.com'
    },
    {
      firstName: 'Shyam',
      lastName: 'Verma',
      mobile: '9770341411',
      city: 'Indore',
      dob: 1587295949000,
      address: 'Madhya Pradesh',
      email: 'abc@gmail.com'
    },
    {
      firstName: 'Mohammad',
      lastName: 'Shekh',
      mobile: '8225036040',
      city: 'Indore',
      dob: 1587295949000,
      address: 'Madhya Pradesh',
      email: 'abc@gmail.com'
    }
  ];

  constructor(private formsBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) {}


  ngOnInit() {
    this.createFormControls();
    this.createEmpForm();
    this.httpClient.get('http://localhost:8080/employee').subscribe(res => {
      console.log('============ 60 ==========', res);

    });
  }

  createFormControls() {
    this.firstName = new FormControl('', [
      Validators.required
    ]);
    this.lastName = new FormControl('', [
      Validators.required
    ]);
    this.email = new FormControl('', [
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
  }

  createEmpForm() {
    this.empDetail = this.formsBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      dob: this.dob,
      mobile: this.mobile,
      city: this.city
    });
  }

  editEmp(emp) {
    this.empDetail.setValue(emp);
  }

  updateEmp() {
    console.log('======== 101 =======', this.empDetail.value);
  }

  deleteEmployee(emp) {
    const filterList = this.empList.filter(item => {
      return emp.mobile !== item.mobile;
    });
    console.log(filterList);
    this.empList = filterList;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);

}

}

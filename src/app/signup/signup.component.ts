import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('fn', { static: true }) fn: ElementRef;
  @ViewChild('ln', { static: true }) ln: ElementRef;
  @ViewChild('confirmpass', { static: true }) confirmpass: ElementRef;

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  doSignUp(email, pass) {
    console.log(this.confirmpass.nativeElement.value);
    if (pass === this.confirmpass.nativeElement.value) {
      const manager = {
        firstName: this.fn.nativeElement.value,
        lastName: this.ln.nativeElement.value,
        username: email,
        password: pass,
      };
      console.log(manager);
      this.httpClient
        .post('http://localhost:8080/signup', manager)
        .subscribe((res: any) => {
          if (res.status === true) {
            this.router.navigateByUrl('/login');
          } else {
            alert(res.responseMessage);
          }
        });
    } else {
      alert('Passwords do not match!!');
    }
  }

}

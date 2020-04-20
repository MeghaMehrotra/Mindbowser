import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  login(username, pass) {
    const body =  new HttpParams()
    .append('username', username)
    .append('password', pass);
    this.httpClient.post('http://localhost:8080/login',
    body).subscribe((res: HttpResponse<any>) => {

      const user = window.btoa(username + ':' + pass);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['home']);
      console.log('======21 ======');
    });
  }



}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
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
    const body =  {username,
  password : pass};


    this.httpClient.post('http://localhost:8080/signin',
    body).subscribe((res: any) => {
console.log(res);
localStorage.setItem('user', res);
localStorage.setItem('username', res.username);
localStorage.setItem('id', res.id);
localStorage.setItem('accessToken', res.accessToken);

this.getManagerDetails(username);
this.router.navigate(['home']);
    },
    (err: HttpErrorResponse) => {

      alert(err.error.message);
      if (err.error instanceof Error) {
          console.log('Client-side error occured.');
      } else {
          console.log('Server-side error occured.');
      }
  });
  }

  getManagerDetails(username) {
    this.httpClient.
    get(`http://localhost:8080/manager/${username}`,
    {
      headers: new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
    }).subscribe(
      (data) => {
          console.log(data);
      },
      (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
              console.log('Client-side error occured.');
          } else {
              console.log('Server-side error occured.');
          }
      }
  );
}

}

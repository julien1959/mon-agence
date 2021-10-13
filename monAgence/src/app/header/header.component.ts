import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {getAuth, onAuthStateChanged} from "firebase/auth";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = "Ma super Agence";

  isLoggedIn = false;

  constructor(
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        this.isLoggedIn = true;
        //const uid = user.uid;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onSignOut() {
    this.authenticationService.signOutUser();
  }

}

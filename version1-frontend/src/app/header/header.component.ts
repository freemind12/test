import { Component, OnInit , Inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { UsersComponent } from '../users/users.component';
import { ImagesService} from '../services/images.service';

import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Image } from '../shared/image';

import {forkJoin} from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logo_image: Image;
  errMess: string;

  username: string = undefined;
  subscription: Subscription;
  

  constructor(public dialog: MatDialog,
    private authService: AuthService,
    private imageService: ImagesService,
    @Inject('baseURL') public baseURL ) { }

    ngOnInit() {
      
      this.authService.loadUserCredentials();
      this.subscription = this.authService.getUsername()
        .subscribe(name => { console.log(name); this.username = name; });

        this.imageService.getImages()
        .subscribe(images => this.logo_image = images.find(image => image.filename == 'logo.png')
        ,errmess => this.errMess = <any>errmess);
          

        /*
        let userObs = this.authService.getUsername(); // the user observable
        let imagesObs = this.imageService.getImages(); // the images observable
      
        this.subscription = forkJoin([userObs, imagesObs])
        .subscribe(results => {
          // results[0] is the user
          // results[1] is the images
          this.username = results[0];
      
          let images = results[1];
          this.logo_image = images.find(image => image.destination == 'logo.png');
        }, errmess => this.errMess = <any>errmess);
        */
      }
      

    
    ngOnDestroy() {
      this.subscription.unsubscribe();

    }

    openLoginForm() {
      const loginRef = this.dialog.open(LoginComponent, {width: '500px', height: '450px'});

      loginRef.afterClosed()
        .subscribe(result => {
          console.log(result);
        });
    }

    logOut() {
      this.username = undefined;
      this.authService.logOut();
    }

    openSignupForm() {
      const signupRef = this.dialog.open(SignupComponent, {width: '500px', height: '450px'});

      signupRef.afterClosed()
        .subscribe(result => {
          console.log(result);
        });
    }

}



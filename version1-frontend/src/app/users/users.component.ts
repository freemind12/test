import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ImagesService} from '../services/images.service';
import { Image } from '../shared/image';
import { User } from '../shared/user';
import { visibility, flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class UsersComponent implements OnInit {

  user: User;
  default_user: Image;
  errMess: string;
  visibility = 'shown';


  constructor(private imageService: ImagesService,
    private authService: AuthService,
    @Inject('baseURL') public baseURL) { }

  ngOnInit(): void {

    this.authService.getUser()
    .subscribe(user => {this.user = user;
      console.log('the user issssssssssss: ' , this.user);}
    ,errmess => this.errMess = <any>errmess);

    this.imageService.getImages()
    .subscribe(images => this.default_user = images.find(image => image.filename == 'default_user.png')
    ,errmess => this.errMess = <any>errmess);
  }

}

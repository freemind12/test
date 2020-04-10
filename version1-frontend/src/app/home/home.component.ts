import { Component, OnInit, Inject } from '@angular/core';
import { ImagesService} from '../services/images.service';
import { Image } from '../shared/image';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  home_header: Image;
  errMess: string;

  constructor(private imageService: ImagesService,
    @Inject('baseURL') public baseURL ) { }

    ngOnInit() {
      this.imageService.getImages()
      .subscribe(images => {
        this.home_header = images.find(image => image.filename == 'home_header.jpg');
        console.log('log image: ' , this.home_header);}
      ,errmess => this.errMess = <any>errmess);

    }

}

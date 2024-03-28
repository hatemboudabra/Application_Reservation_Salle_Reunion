import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-romm',
  templateUrl: './add-romm.component.html',
  styleUrls: ['./add-romm.component.css']
})
export class AddRommComponent implements OnInit {
  constructor(private storageService : TokenStorageService , private _list : RoomService , private router : Router){}

   Room = {
    user:"",
    name: "", 
    capacity: 0,
    price: 0, 
    image: "", 
    description: "" 
};
image : any;

ngOnInit(): void {
    
}
selectedimage(event:any){
  this.image=event.target.files[0];
console.log(event.target.files[0]);

}
ajouter(){
  
  const user2 =this.storageService.getUserData();
  const id = user2._id;
  this.Room.user = id;
  let f =new FormData();
    f.append('user',this.Room.user);
    f.append('name',this.Room.name);
    f.append('capacity',this.Room.capacity.toString());
    f.append('price',this.Room.price.toString());
    f.append('image',this.image);
    f.append('description',this.Room.description);
    console.log(f);
    this._list.ajouter(f).subscribe(
      (data) => {
        console.log(data)
        this.router.navigate(['/dashboard/listroom'])
      },
      error => {
        console.log('Error  room:', error);
        
      }
    );
  }
}


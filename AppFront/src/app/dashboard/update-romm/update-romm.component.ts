import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
//import Swal from 'sweetalert2';



@Component({
  selector: 'app-update-romm',
  templateUrl: './update-romm.component.html',
  styleUrls: ['./update-romm.component.css']
})
export class UpdateRommComponent implements OnInit  {
  constructor(private route:ActivatedRoute,private storageService : TokenStorageService,private auth:AuthService , private _list : RoomService , private router : Router){}
response:any
id:any
list:any
  ngOnInit(): void {
    
    this.id=this.route.snapshot.paramMap.get('id');
    this._list.roombyid(this.id).subscribe(
      
      (res)=>{
       this.response=res,
       this.Room=this.response
     console.log("aa"+this.Room.capacity)
     },
       (err)=>{
         console.log(err);

       }
     )
   }
   Room = {
    user:"",
    name: "", 
    capacity: 0,
    price: 0,
    image:"", 
    description: "" 
};
image:any


   selectedimage(event:any){
    this.image=event.target.files[0];

  }
   update(){
    let f =new FormData();
    f.append('user',this.Room.user);
    f.append('name',this.Room.name);
    f.append('capacity',this.Room.capacity.toString());
    f.append('price',this.Room.price.toString());
    f.append('image',this.image);
    f.append('description',this.Room.description);
    console.log("bb"+f);
    if(this.image){
      f.append('image',this.image);}
      else{
        f.append('image',this.Room.image);

      }
      
      this._list.modifier(this.id,f).subscribe(
        ( res)=>{
           console.log(res);
    
           this.router.navigate(['/dashboard/listroom'])
         },
         err=>{
           console.log(err);
    
         }
       )
   }
   




}
     
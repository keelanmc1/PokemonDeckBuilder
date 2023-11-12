import { Component } from '@angular/core';
import { Room } from './rooms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {

  hotelName = 'Keelans Hotel'
  numberOfRooms = '10'
  hideRooms = false;

  room : Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 10,
  };

  toggle(){
    this.hideRooms = !this.hideRooms;
  }
}

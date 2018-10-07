import { Component, OnInit } from '@angular/core';
import { MoveService } from '../../services/move.service';

@Component({
  selector: 'app-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.css']
})
export class PlateauComponent implements OnInit {
  move: MoveService;
  constructor(move: MoveService) {
    this.move = move;
  }

  ngOnInit() {
    this.move.createPlateau(5, 5);
  }


}

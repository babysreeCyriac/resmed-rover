import { Component, OnInit } from '@angular/core';
import { MoveService } from '../../services/move.service';

@Component({
  selector: 'app-command-panel',
  templateUrl: './command-panel.component.html',
  styleUrls: ['./command-panel.component.css']
})
export class CommandPanelComponent implements OnInit {
  commandMessage: any = {value: ''};
  constructor(private move: MoveService) { }

  ngOnInit() {
  }

  sendCommand(command) {
    const paramList = command.split(' ');
    const paramLength = paramList.length;
    if (paramLength === 3) {
      this.move.createRover(paramList[0], paramList[1], paramList[2]);
    } else if (paramLength === 2) {
      this.move.createPlateau(paramList[0], paramList[1]);
    } else if (paramLength === 1) {
      this.move.moveRover( paramList[0]);
    } else {
      console.error('Invalid input!');
    }
  }
}

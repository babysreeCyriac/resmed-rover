import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoveService {
  plateauWidth;
  plateauHeight;
  roverName: String = 'A';

  commandList: Array<any> = [];
  viewData: Array<any> = [];

  constructor() {
    this.startCommandTimer();
  }

  startCommandTimer() {
    interval(1000)
      .pipe(
        map(x => {
          if (this.commandList.length > 0) {
            const nextCommand = this.commandList.shift();
            this.doNextCommand(nextCommand);
          }
        })
      )
      .subscribe();
  }

  doNextCommand(command) {
    console.log(command);
    if (command.action === 'ADD') {
      this.viewData.push({
        roverName: command.data.roverName,
        posX: command.data.posX,
        posY: command.data.posY,
        direction: command.data.direction
      });
    } else if (command.action === 'MOVE') {
      const roverIndex = this.viewData.findIndex(item => item.roverName === command.data.roverName);
      // directions - N - North
      // E - East
      // S - South
      // W - West
      //
      if (command.data.command === 'M') {
        this.viewData[roverIndex].posX = this.getNewXPosition ( this.viewData[roverIndex].posX, this.viewData[roverIndex].direction );
        this.viewData[roverIndex].posY = this.getNewYPosition ( this.viewData[roverIndex].posY, this.viewData[roverIndex].direction );
      } else {
        this.viewData[roverIndex].direction = this.getNewDirection(this.viewData[roverIndex].direction, command.data.command);
      }
    }
  }

  getNewDirection(currentDirection, command) {
    const directionList = ['N', 'E', 'S', 'W'];
    let directionIndex = directionList.findIndex(item => item === currentDirection);

    if (command === 'R') {
      directionIndex++;
    } else if (command === 'L') {
      directionIndex--;
    }

    if (directionIndex < 0) {
      directionIndex = directionList.length - 1;
    } else if (directionIndex >= directionList.length) {
      directionIndex = 0;
    }
    return directionList[directionIndex];
  }

  getNewXPosition(currentXPos, currentDirection) {
    let newXPos = currentXPos;
    if (currentDirection === 'E') {
      newXPos = ++currentXPos;
    }
    if (currentDirection === 'W') {
      newXPos = --currentXPos;
    }
    return newXPos;
  }

  getNewYPosition(currentYPos, currentDirection) {
    let newYPos = currentYPos;
    if (currentDirection === 'N') {
      newYPos = ++currentYPos;
    }
    if (currentDirection === 'S') {
      newYPos = --currentYPos;
    }
    return newYPos;
  }

  createPlateau(width: Number, height: Number) {
    this.plateauWidth = width;
    this.plateauHeight = height;
    this.viewData = [];
  }

  createRover(posX: Number, posY: Number, direction: String) {
    console.log(posX, posY);
    this.roverName = this.roverName + 'A';
    this.commandList.push({
      action: 'ADD',
      data: {
        posX,
        posY,
        direction,
        roverName: this.roverName
      }
    });
  }

  moveRover(moveCommand: String) {
    console.log(moveCommand);
    moveCommand.split('').forEach(item => {
      this.commandList.push({
        action: 'MOVE',
        data: {
          roverName: this.roverName,
          command: item
        }
      });
    });
  }
}

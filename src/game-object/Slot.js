import Phaser from "phaser";

const CELL_SIZE = 100;
export default class Slots extends Phaser.GameObjects.Sprite {
  constructor(scene, row, col) {
    //TODO
    const x = CELL_SIZE * (col + 0.5);
    const y = CELL_SIZE * (row + 0.5);

    super(scene, x, y, "slot");

    //TODO
    this.row = row;
    this.col = col;

    scene.add.existing(this);

    this.setScale(0.7);
  }
}

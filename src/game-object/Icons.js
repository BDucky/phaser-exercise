import Phaser from "phaser";

// extend để có những phương thức và đặc điểm của class gốc (Sprite)
// customize:
// - Tên class nhìn tường minh hơn
// - Cách tạo ra đối tượng có thể khác đi
// - Mở rộng thêm những phương thức thuộc tính khác

const CELL_SIZE = 100;

export default class Icons extends Phaser.GameObjects.Sprite {
  constructor(scene, level, row, col) {
    //TODO
    const x = CELL_SIZE * (col + 0.5);
    const y = CELL_SIZE * (row + 0.5);
    const texture = "icon-" + level;

    super(scene, x, y, texture);

    //TODO
    this.level = level;
    this.row = row;
    this.col = col;

    this.setInteractive(new Phaser.Geom.Circle(this.width/2, this.height/2, this.width/2), Phaser.Geom.Circle.Contains);
    scene.add.existing(this);

  }
}

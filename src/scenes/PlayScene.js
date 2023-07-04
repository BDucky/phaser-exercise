import Icons from "../game-object/Icons";
import Slots from "../game-object/Slot";
import Phaser from 'phaser'

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super("play-scene");
    this.iconGroup = new Phaser.GameObjects.Group(this);
    this.map = [[], [], [], []];
  }

  preload() {
    this.load.image("icon-1", "assets/images/1.png");
    this.load.image("icon-2", "assets/images/2.png");
    this.load.image("icon-3", "assets/images/3.png");
    this.load.image("slot", "assets/images/slot.png");

  }

  create() {
    for (var row = 0; row < 4; row++) {
      for (var col = 0; col < 4; col++) {
        var slot = new Slots(this, row, col);
      }
    }
    for (var row = 0; row < 4; row++) {
      for (var col = 0; col < 4; col++) {
        const level = Phaser.Math.Between(1, 2);
        this.map[row][col] = new Icons(this, level, row, col)
      }
    }
    this.input.on('pointerdown', this.startDrag, this)
    console.log(this.map);

    //TODO
    // - lập trình để kéo icon, icon đi theo con trỏ chuột
    // - bắt sự kiện thả chuột và biết được icon vừa được thả là icon nào (A)
    // - kiểm tra icon vừa thả có collide với bất cứ icon nào không? (B)
    // - Nếu có collide:
    //    +A.destroy()
    //    +B.destroy()
    //    +new Icons(scene, B.level + 1, B.row, B.col)
    //    +new Icons(scene, Random, A.row, A.col)
  }

  startDrag(pointer, targets) {
    this.input.off('pointerdown', this.startDrag, this)
    this.dragObj = targets[0]
    this.input.on('pointermove', this.doDrag, this)
    this.input.on('pointerup', this.stopDrag, this)
  }

  doDrag(pointer) {
    this.dragObj.x = pointer.x
    this.dragObj.y = pointer.y
  }

  stopDrag(pointer) {
    this.input.on('pointerdown', this.startDrag, this)
    this.input.off('pointermove', this.doDrag, this)
    this.input.off('pointerup', this.stopDrag, this)
    this.checkCollision(pointer, this.dragObj)
    console.log(pointer.x, pointer.y);
  }

  checkCollision(pointer, target) {
    for (var row = 0; row < 4; row++) {
      for (var col = 0; col < 4; col++) {
        var destinationTarget = this.map[row][col]
        if (destinationTarget.getBounds().contains(target.x, target.y)) {
          if (destinationTarget.level == target.level) {
            target.destroy()
            destinationTarget.destroy()
            new Icons(this, Phaser.Math.Between(1, 1), target.row, target.col)
            new Icons(this, destinationTarget.level + 1, destinationTarget.row, destinationTarget.col)
          }
        }
      }
    }
  }

  update() { }
}

import Icons from "../game-object/Icons";
import Slots from "../game-object/Slot";

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
        this.map[row][col] = new Icons(this, level, row, col);
      }
    }

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

  update() {}
}
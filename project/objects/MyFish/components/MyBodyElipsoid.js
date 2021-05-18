import { CGFobject } from '../../../../lib/CGF.js';
import { MySphere } from '../../../primitives/MySphere.js'

export class MyBodyElipsoid extends CGFobject {
  constructor(scene, appearence) {
    super(scene);
    this.body = new MySphere(scene, 24, 16)
    this.appearence = appearence
  }

  display() {
    this.scene.pushMatrix()

    this.appearence.apply()

    this.scene.rotate(-Math.PI / 2, 1, 0, 0)

    this.scene.scale(0.4, 0.9, 0.7)

    this.body.display()

    this.scene.popMatrix()
  }

  enableNormalViz() {
    this.body.enableNormalViz()
  }

  disableNormalViz() {
    this.body.disableNormalViz()
  }
}

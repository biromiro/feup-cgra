import { CGFobject } from '../../../../lib/CGF.js';
import { MySphere } from '../../../primitives/MySphere.js'

export class MyRightEye extends CGFobject {
  constructor(scene, appearance) {
    super(scene);
    this.eye = new MySphere(scene, 16, 8)
    this.appearance = appearance
  }


  display() {

    this.scene.pushMatrix()

    this.scene.translate(0.25, 0.3, 0.45)

    this.scene.scale(0.1, 0.1, 0.1)

    this.scene.rotate(Math.PI, 0, 1, 0)

    this.appearance.apply()

    this.eye.display()

    this.scene.popMatrix()

    this.scene.defaultAppearance.apply()
  }

  enableNormalViz() {
    this.eye.enableNormalViz()
  }

  disableNormalViz() {
    this.eye.disableNormalViz()
  }
}

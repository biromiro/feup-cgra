import { CGFobject } from '../../../../lib/CGF.js';
import { MySphere } from '../../../primitives/MySphere.js'

export class MyRightEye extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene, appearence) {
    super(scene);
    this.eye = new MySphere(scene, appearence, 8, 4)
    this.appearence = appearence
  }

  display() {
    this.appearence.apply()

    this.scene.pushMatrix()

    this.scene.translate(0.4, 0.2, 0.3)

    this.scene.scale(0.1, 0.1, 0.1)

    this.eye.display()

    this.scene.popMatrix()

    this.scene.defaultAppearance.apply()
  }
}

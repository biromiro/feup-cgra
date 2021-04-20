import { CGFobject } from '../../../../lib/CGF.js';
import { MyTriangle } from '../../../primitives/MyTriangle.js'

export class MyRightFin extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene, appearence) {
    super(scene);
    this.fin = new MyTriangle(scene, appearence)
    this.appearence = appearence
  }

  display() {
    this.appearence.apply()

    this.scene.pushMatrix()

    this.scene.translate(1,0,0)

    this.scene.translate(-0.65,0,0.2)

    this.scene.scale(0.5,0.5,0.5)

    this.scene.rotate(-Math.PI/2 + Math.PI/8, 0, 0, 1)

    this.scene.rotate(Math.PI/2, 0, 1, 0)

    this.fin.display()

    this.scene.popMatrix()

    this.scene.defaultAppearance.apply()
  }
}
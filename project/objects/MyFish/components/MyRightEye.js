import { CGFobject } from '../../../../lib/CGF.js';
import { MySphere } from '../../../primitives/MySphere.js'

export class MyRightEye extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene, appearenceWhite, appearenceBlack) {
    super(scene);
    this.eye = new MySphere(scene, appearenceWhite, 16, 8)
    this.eyeBall = new MySphere(scene, appearenceBlack, 16, 8)
    this.appearenceWhite = appearenceWhite
    this.appearenceBlack = appearenceBlack
  }


  display() {

    this.scene.pushMatrix()

    this.scene.translate(0.25, 0.3, 0.45)

    this.scene.scale(0.1, 0.1, 0.1)
    
    this.scene.pushMatrix()

    this.scene.scale(0.5, 0.5, 0.5)

    this.scene.translate(1.1, 0.5, 0.5)

    this.appearenceBlack.apply()

    this.eyeBall.display()

    this.scene.popMatrix()

    this.appearenceWhite.apply()

    this.eye.display()

    this.scene.popMatrix()

    this.scene.defaultAppearance.apply()
  }

  enableNormalViz(){
    this.eye.enableNormalViz()
    this.eyeBall.enableNormalViz()
  }

  disableNormalViz(){
    this.eye.disableNormalViz()
    this.eyeBall.disableNormalViz()
  }
}

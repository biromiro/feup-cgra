import { CGFobject } from '../../../../lib/CGF.js';
import { MySphere } from '../../../primitives/MySphere.js'

export class MyBodyElipsoid extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene, appearence) {
    super(scene);
    this.body = new MySphere(scene, appearence, 24, 16)
    this.appearence = appearence
  }
    
  display(){
    this.appearence.apply()
    
    this.scene.pushMatrix()

    this.scene.scale(0.4, 0.7, 0.9)

    this.body.display()
    
    this.scene.popMatrix()
    
    this.scene.defaultAppearance.apply()
  }
}

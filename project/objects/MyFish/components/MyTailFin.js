import { CGFobject } from '../../../../lib/CGF.js';
import { MyTriangle } from '../../../primitives/MyTriangle.js'

export class MyTailFin extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene, appearence) {
    super(scene);
    this.fin = new MyTriangle(scene, appearence, 24, 16)
    this.appearence = appearence
  }
    
  display(){
    this.appearence.apply()
    
    this.scene.pushMatrix()

    this.fin.display()
    
    this.scene.popMatrix()
    
    this.scene.defaultAppearance.apply()
  }
}
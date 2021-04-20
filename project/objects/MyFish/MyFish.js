import { CGFobject } from '../../../lib/CGF.js'
import { MyBodyElipsoid } from './components/MyBodyElipsoid.js'
import { MyRightEye } from './components/MyRightEye.js'
import { MyTailFin } from './components/MyTailFin.js'

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
export class MyFish extends CGFobject {
  constructor(scene, appearance) {
    super(scene)
    this.body = new MyBodyElipsoid(scene, appearance)
    this.righteye = new MyRightEye(scene, appearance)
    this.tailFin = new MyTailFin(scene, appearance)
    // tail triangle
    // left triangle fin
    // right triangle fin
  }

  display(){
    this.body.display()
    this.righteye.display()
  }
}

import { CGFappearance, CGFobject, CGFshader, CGFtexture } from '../../../lib/CGF.js'
import { MyBodyElipsoid } from './components/MyBodyElipsoid.js'
import { MyRightEye } from './components/MyRightEye.js'
import { MyLeftEye } from './components/MyLeftEye.js'
import { MyTailFin } from './components/MyTailFin.js'
import { MyTopFin} from './components/MyTopFin.js'
import { MyRightFin } from './components/MyRightFin.js'
import { MyLeftFin } from './components/MyLeftFin.js'


/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
export class MyFish extends CGFobject {
  constructor(scene, movingVelocity, rotationRight, rotationLeft) {
    super(scene)

    this.fishColor = [255/255,69/255,0/255, 1.0]

    this.setBody()
    this.setEyes()
    this.setFins()

    this.shader = new CGFshader(this.scene.gl, "./shaders/MyFish.vert", "./shaders/MyFish.frag")
    this.shader.setUniformsValues({fishColor: this.fishColor, lightPosition: this.scene.lights[0].position, camPosition: this.scene.camera.position})
    
    this.tailAngle = 0
    this.finAngle = 0
    this.previousAngleTail = 0
    this.previousAngleFin = 0
    this.stableAngleFin = 0
    this.stableAngleTail = 0
    this.currentVel = 0

    this.getVelocity = typeof movingVelocity !== 'undefined' ? movingVelocity : () => {return 1;} //set default to 1 since a fish can still not be a moving fish
    this.isRotatingRight = typeof rotationRight !== 'undefined' ? rotationRight : () => {return false;}
    this.isRotatingLeft = typeof rotationLeft !== 'undefined' ? rotationLeft : () => {return false;}
  }

  update(t){
    this.shader.setUniformsValues({lightPosition: this.scene.lights[0].position, camPosition: this.scene.camera.position})

    this.updateTailAngle(t)
    this.updateFinAngle(t)
  }
  
  getAngle(finBool, amplitude, offset, t){
    if(this.currentVel != this.getVelocity()){
      if (finBool) this.stableAngleFin = this.previousAngleFin
      else this.stableAngleTail = this.previousAngleTail
      this.currentVel = this.getVelocity()
    }
    let prevAngle = finBool ? this.stableAngleFin : this.stableAngleTail
    return finBool 
          ? amplitude * Math.PI * Math.sin(offset *(t + prevAngle)) / 180
          : amplitude * Math.PI * Math.sin(offset * (1 + this.getVelocity()/10000000)*(t + prevAngle)) / 180
  }


  updateTailAngle(t){
    this.previousAngleTail = this.getAngle(false, 20, 0.0015, t)
    this.tailFin.angle = this.previousAngleTail
  }

  updateFinAngle(t){
    this.previousAngleFin = this.getAngle(true, 15, 0.015, t)
    if(!this.isRotatingLeft()) this.leftFin.angle = this.previousAngleFin
    if(!this.isRotatingRight()) this.rightFin.angle = this.previousAngleFin
  }

  setBody(){

    this.bodyAppearance = new CGFappearance(this.scene);
		this.bodyAppearance.setAmbient(0,0,0,1);
		this.bodyAppearance.setDiffuse(...this.fishColor);
		this.bodyAppearance.setSpecular(0,0,0,0);
    this.bodyAppearance.setShininess(10)

    this.texture = new CGFtexture(this.scene, "./images/fish_tex_4.jpg")
    this.bodyAppearance.setTexture(this.texture);
    this.bodyAppearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

    this.body = new MyBodyElipsoid(this.scene, this.bodyAppearance)

  }

  setEyes(){
    this.eyeAppearance = new CGFappearance(this.scene)
		this.eyeAppearance.setAmbient(0,0,0,1);
		this.eyeAppearance.setDiffuse(1,1,1,1);
		this.eyeAppearance.setSpecular(0,0,0,0);
    this.eyeAppearance.setShininess(10)

    this.eyeTexture = new CGFtexture(this.scene, "./images/fisheye.jpg")
    this.eyeAppearance.setTexture(this.eyeTexture);
    this.eyeAppearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

    this.rightEye = new MyRightEye(this.scene, this.eyeAppearance)
    this.leftEye = new MyLeftEye(this.scene, this.eyeAppearance)
  }

  setFins(){

    const [r,g,b,a] = this.fishColor

    this.finsAppearance = new CGFappearance(this.scene)
		this.finsAppearance.setAmbient(r,g,b,a);
		this.finsAppearance.setDiffuse(r,g,b,a);
		this.finsAppearance.setSpecular(r,g,b,a);
    this.finsAppearance.setShininess(10)

    this.tailFin = new MyTailFin(this.scene, this.finsAppearance)
    this.topFin = new MyTopFin(this.scene, this.finsAppearance)
    this.rightFin = new MyRightFin(this.scene, this.finsAppearance)
    this.leftFin = new MyLeftFin(this.scene, this.finsAppearance)
  }

  display(){
    
    this.scene.pushMatrix()

    this.scene.scale(0.5,0.5,0.5)

    this.scene.setActiveShader(this.shader)
    
    this.body.display()

    this.scene.setActiveShaderSimple(this.scene.defaultShader)

    this.tailFin.display()
    this.topFin.display()
    this.rightFin.display()
    this.leftFin.display()

    this.rightEye.display()
    this.leftEye.display()
 
    this.scene.popMatrix();
  }

  enableNormalViz(){
    this.body.enableNormalViz()
    this.tailFin.enableNormalViz()
    this.topFin.enableNormalViz()
    this.rightFin.enableNormalViz()
    this.leftFin.enableNormalViz()
    this.rightEye.enableNormalViz()
    this.leftEye.enableNormalViz()
  }

  disableNormalViz(){
    this.body.disableNormalViz()
    this.tailFin.disableNormalViz()
    this.topFin.disableNormalViz()
    this.rightFin.disableNormalViz()
    this.leftFin.disableNormalViz()
    this.rightEye.disableNormalViz()
    this.leftEye.disableNormalViz()
  }
}

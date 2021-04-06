import { CGFscene, CGFcamera, CGFaxis, CGFappearance } from '../lib/CGF.js'
import { MyMovingObject } from './MyMovingObject.js'
import { MySphere } from './MySphere.js'

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super()
  }
  init(application) {
    super.init(application)
    this.initCameras()
    this.initLights()

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)

    this.gl.clearDepth(100.0)
    this.gl.enable(this.gl.DEPTH_TEST)
    this.gl.enable(this.gl.CULL_FACE)
    this.gl.depthFunc(this.gl.LEQUAL)

    this.setUpdatePeriod(20)

    this.enableTextures(true)

    //Initialize scene objects
    this.axis = new CGFaxis(this)
    this.incompleteSphere = new MySphere(this, 16, 8)
    this.movingObject = new MyMovingObject(this, 3, 0, 0, [0, 0, 0])

    this.defaultAppearance = new CGFappearance(this)
    this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0)
    this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0)
    this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0)
    this.defaultAppearance.setEmission(0, 0, 0, 1)
    this.defaultAppearance.setShininess(120)

    this.sphereAppearance = new CGFappearance(this)
    this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1)
    this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1)
    this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1)
    this.sphereAppearance.setShininess(120)

    this.movingObjectAppearance = new CGFappearance(this)
    this.movingObjectAppearance.setAmbient(0.3, 0.3, 0.3, 1)
    this.movingObjectAppearance.setDiffuse(0.7, 0.7, 0.7, 1)
    this.movingObjectAppearance.setSpecular(0.0, 0.0, 0.0, 1)
    this.movingObjectAppearance.setShininess(120)

    //Objects connected to MyInterface
    this.displayAxis = true
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1)
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0)
    this.lights[0].enable()
    this.lights[0].update()
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    )
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0)
    this.setDiffuse(0.2, 0.4, 0.8, 1.0)
    this.setSpecular(0.2, 0.4, 0.8, 1.0)
    this.setEmission(0, 0, 0, 1)
    this.setShininess(10.0)
  }

  // called periodically (as per setUpdatePeriod() in init())
  update(t) {
    this.movingObject.update()
  }

  checkKeys() {
    let text = 'Keys pressed: '
    let keysPressed = false

    //Check for key codes e.g. in https://keycode.info/

    if (this.gui.isKeyPressed('KeyW')) {
      text += ' W '
      keysPressed = true
      this.movingObject.accelerate(1)
    }

    if (this.gui.isKeyPressed('KeyS')) {
      text += ' S '
      keysPressed = true
      this.movingObject.accelerate(-1)
    }

    if (this.gui.isKeyPressed('KeyA')) {
      text += ' A '
      keysPressed = true;
      this.movingObject.turn(1)
    }

    if (this.gui.isKeyPressed('KeyD')) {
      text += ' D '
      keysPressed = true;
      this.movingObject.turn(-1)
    }

    if (this.gui.isKeyPressed('KeyR')) {
      text += ' R '
      keysPressed = true;
      this.movingObject.reset()
    }

    if (keysPressed) console.log(text)
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix()
    this.loadIdentity()
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix()

    this.defaultAppearance.apply()
    // Draw axis
    if (this.displayAxis) this.axis.display()

    //this.sphereAppearance.apply();
    this.movingObjectAppearance.apply()
    // ---- BEGIN Primitive drawing section

    //This sphere does not have defined texture coordinates
    //this.incompleteSphere.display();

    this.pushMatrix()
    this.translate(this.movingObject.x, 0, this.movingObject.z)
    this.rotate(this.movingObject.orientationAngle, 0, 1, 0)
    this.rotate(Math.PI / 2, 1, 0, 0)

    this.translate(0, -0.5, 0)

    this.movingObject.display()
    this.popMatrix()
    this.checkKeys()

    // ---- END Primitive drawing section
  }
}

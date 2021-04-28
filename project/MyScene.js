import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from '../lib/CGF.js'
import { MySphere } from './primitives/MySphere.js'
import { MyCubeMap } from './objects/MyCubeMap.js'
import { MyCylinder } from './primitives/MyCylinder.js'
import { MyMovingObject } from './objects/MyMovingObject.js'
import { MyFish } from './objects/MyFish/MyFish.js'
import { MySeaFloor } from './objects/MySeaFloor/MySeaFloor.js'
import { MyNest } from './objects/MySeaFloor/MyNest.js'
import { MyWaterSurface } from './objects/MyWaterSurface.js'

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


    this.sphereAppearance = new CGFappearance(this)
    this.sphereAppearance.setAmbient(0, 0, 0, 1)
    this.sphereAppearance.setDiffuse(0, 0, 0, 1)
    this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1)
    this.sphereAppearance.setEmission(1, 1, 1, 1)


    let earthTex = new CGFtexture(this, "images/earth.jpg")

    this.sphereAppearance.setTexture(earthTex)


    this.sphere = new MySphere(this, this.sphereAppearance, 16, 8)
    this.displaySphere = false

    this.movingObjectAppearance = new CGFappearance(this)
    this.movingObjectAppearance.setAmbient(0.3, 0.3, 0.3, 1)
    this.movingObjectAppearance.setDiffuse(0.7, 0.7, 0.7, 1)
    this.movingObjectAppearance.setSpecular(0.0, 0.0, 0.0, 1)
    this.movingObjectAppearance.setShininess(120)

    this.fish = new MyFish(this, this.movingObjectAppearance)
    this.movingObject = new MyMovingObject(this, this.fish, 0, 0, [0, 3, 0])
    this.displayMovingObject = false

    this.cylinder = new MyCylinder(this, 16)
    this.displayCylinder = false

    this.seaFloor = new MySeaFloor(this, 20, 50, 1)

    this.ring = new MyNest(this, 32, 3, 1, [-5, -5])

    this.watersurface = new MyWaterSurface(this, 50)

    let demo_cubemap = [new CGFtexture(this, "images/demo_cubemap/top.png"),
    new CGFtexture(this, "images/demo_cubemap/front.png"),
    new CGFtexture(this, "images/demo_cubemap/left.png"),
    new CGFtexture(this, "images/demo_cubemap/back.png"),
    new CGFtexture(this, "images/demo_cubemap/right.png"),
    new CGFtexture(this, "images/demo_cubemap/bottom.png")
    ]

    let test_cubemap = [new CGFtexture(this, "images/test_cubemap/py.png"),
    new CGFtexture(this, "images/test_cubemap/pz.png"),
    new CGFtexture(this, "images/test_cubemap/px.png"),
    new CGFtexture(this, "images/test_cubemap/nz.png"),
    new CGFtexture(this, "images/test_cubemap/nx.png"),
    new CGFtexture(this, "images/test_cubemap/ny.png"),
    ]

    let goldengate = [new CGFtexture(this, "images/goldengate/posy.jpg"),
    new CGFtexture(this, "images/goldengate/posz.jpg"),
    new CGFtexture(this, "images/goldengate/negx.jpg"),
    new CGFtexture(this, "images/goldengate/negz.jpg"),
    new CGFtexture(this, "images/goldengate/posx.jpg"),
    new CGFtexture(this, "images/goldengate/negy.jpg")]

    let skybox = [new CGFtexture(this, "images/skybox/top.png"),
    new CGFtexture(this, "images/skybox/front.png"),
    new CGFtexture(this, "images/skybox/left.png"),
    new CGFtexture(this, "images/skybox/back.png"),
    new CGFtexture(this, "images/skybox/right.png"),
    new CGFtexture(this, "images/skybox/bottom.png")]

    this.currentCubeMapTextureID = -1

    this.cubeMapTextureIDs = {
      Directions: 0,
      Sky: 1,
      GoldenGate: 2,
      SkyBox: 3
    }

    this.cubeMapTexture = [
      test_cubemap,
      demo_cubemap,
      goldengate,
      skybox
    ]

    this.cubeMap = new MyCubeMap(this)

    this.defaultAppearance = new CGFappearance(this)
    this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0)
    this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0)
    this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0)
    this.defaultAppearance.setEmission(0, 0, 0, 1)
    this.defaultAppearance.setShininess(120)



    //Objects connected to MyInterface
    this.displayAxis = true
    this.displayNormals = false;
  }
  initLights() {
    this.lights[0].setPosition(5, 1, 3, 1)
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0)
    this.lights[0].setVisible(true)
    this.lights[0].enable()
    this.lights[0].update()
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      500,
      vec3.fromValues(2, 2, 2),
      vec3.fromValues(0, 2, 0)
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
    this.movingObject.update(t)
    //this.fish.update(t)
  }

  updateAppliedTexture() {
    this.cubeMap.setTexture(...this.cubeMapTexture[this.currentCubeMapTextureID])
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

    this.setDefaultAppearance()
    //this.lights[0].update()

    // Draw axis
    if (this.displayAxis) this.axis.display()


    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
    this.cubeMap.display();
    this.popMatrix();


    if (this.displayMovingObject) this.movingObject.display()

    if (this.displayCylinder) this.cylinder.display()

    if (this.displaySphere) this.sphere.display()

    this.seaFloor.display()

    this.ring.display()

    this.watersurface.display();

    if (this.displayNormals) {
      this.cylinder.enableNormalViz()
      this.sphere.enableNormalViz()
      this.movingObject.enableNormalViz()
      this.ring.enableNormalViz()
    }
    else {
      this.cylinder.disableNormalViz();
      this.sphere.disableNormalViz();
      this.movingObject.disableNormalViz()
      this.ring.disableNormalViz()
    }

    this.checkKeys()

    // ---- END Primitive drawing section
  }
}

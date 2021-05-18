import { CGFscene, CGFaxis, CGFappearance, CGFtexture } from '../lib/CGF.js'
import { CGFcamera2 } from '../lib/CFFcamera2.js'
import { MySphere } from './primitives/MySphere.js'
import { MyCubeMap } from './objects/MyCubeMap.js'
import { MyCylinder } from './primitives/MyCylinder.js'
import { MyFish } from './objects/MyFish/MyFish.js'
import { MySeaFloor } from './objects/MySeaFloor/MySeaFloor.js'
import { MyNest } from './objects/MySeaFloor/MyNest.js'
import { MyWaterSurface } from './objects/MyWaterSurface.js'
import { MyRockSet } from './objects/MyRockSet/MyRockSet.js'
import { MyImovableRockSet } from './objects/MyRockSet/MyImovableRockSet.js'
import { MyPillarSet } from './objects/MyPillarsSet/MyPillarSet.js'
import { MyMovingFish } from './objects/MyFish/MyMovingFish.js'
import { MyAlgaeSet } from './objects/MyAlgaeSet/MyAlgaeSet.js'
 
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

    this.displayMovingObject = false

    this.seaFloor = new MySeaFloor(this, 100, 50, 1)

    this.nest = new MyNest(this, 256, 3, 1, [-5, -5])

    this.watersurface = new MyWaterSurface(this, 50)

    this.rockSet = new MyRockSet(this, 100)
    
    this.immovableRockSet = new MyImovableRockSet(this, 10);

    this.pillarSet = new MyPillarSet(this, 16)
    
    this.movingFish = new MyMovingFish(this, 0, 0, [0, 3, 0], this.rockSet, this.nest)

    this.algaeSet = new MyAlgaeSet(this, 50, 4, 2, 0.5, 0.2, 0.3, 0.1)

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

    let under_water = [new CGFtexture(this, "images/underwater_cubemap/top.jpg"),
    new CGFtexture(this, "images/underwater_cubemap/front.jpg"),
    new CGFtexture(this, "images/underwater_cubemap/left.jpg"),
    new CGFtexture(this, "images/underwater_cubemap/back.jpg"),
    new CGFtexture(this, "images/underwater_cubemap/right.jpg"),
    new CGFtexture(this, "images/underwater_cubemap/bottom.jpg")]

    let under_water_2 = [new CGFtexture(this, "images/underwater_cubemap_2/top.png"),
    new CGFtexture(this, "images/underwater_cubemap_2/front.png"),
    new CGFtexture(this, "images/underwater_cubemap_2/left.png"),
    new CGFtexture(this, "images/underwater_cubemap_2/back.png"),
    new CGFtexture(this, "images/underwater_cubemap_2/right.png"),
    new CGFtexture(this, "images/underwater_cubemap_2/bottom.png")]

    this.currentCubeMapTextureID = 5

    this.cubeMapTextureIDs = {
      Directions: 0,
      Sky: 1,
      GoldenGate: 2,
      SkyBox: 3,
      UnderWater: 4,
      UnderWater2: 5
    }

    this.cubeMapTexture = [
      test_cubemap,
      demo_cubemap,
      goldengate,
      skybox,
      under_water,
      under_water_2
    ]

    this.cubeMap = new MyCubeMap(this)
    this.updateAppliedTexture()

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
    this.camera = new CGFcamera2(
      1.5,
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
    this.movingFish.update(t)
    this.watersurface.update(t)
    this.algaeSet.update(t)
  }

  updateAppliedTexture() {
    this.cubeMap.setTexture(...this.cubeMapTexture[this.currentCubeMapTextureID])
    
  }

  checkKeys() {
    let keysPressed = false

    //Check for key codes e.g. in https://keycode.info/

    if (this.gui.isKeyPressed('KeyW')) {
      keysPressed = true
      this.movingFish.accelerate(1)
    }

    if (this.gui.isKeyPressed('KeyS')) {
      keysPressed = true
      this.movingFish.accelerate(-1)
    }

    if (this.gui.isKeyPressed('KeyA')) {
      keysPressed = true;
      this.movingFish.turn(1)
    }

    if (this.gui.isKeyPressed('KeyD')) {
      keysPressed = true;
      this.movingFish.turn(-1)
    }

    if (this.gui.isKeyPressed('KeyR')) {
      keysPressed = true;
      this.movingFish.reset()
    }

    if (this.gui.isKeyPressed('KeyP')){
      keysPressed = true;
      this.movingFish.ascend()
    }

    if (this.gui.isKeyPressed('KeyL')){
      keysPressed = true;
      this.movingFish.descend()
    }

    if (this.gui.isKeyPressed('KeyC')){
      keysPressed = true;
      this.movingFish.collectRock()
    } else {
      this.movingFish.collectRockReleaseKey()
    }
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

    // Draw axis
    if (this.displayAxis) this.axis.display()


    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
    this.cubeMap.display();
    this.popMatrix();

    this.movingFish.display()

    this.seaFloor.display()

    this.nest.display()

    this.watersurface.display()

    this.rockSet.display()

    this.immovableRockSet.display()

    this.pillarSet.display()

    this.algaeSet.display()

    this.setActiveShaderSimple(this.defaultShader);

    if (this.displayNormals) {
      this.movingFish.enableNormalViz()
      this.nest.enableNormalViz()
      this.rockSet.enableNormalViz()
      this.pillarSet.enableNormalViz()
      this.algaeSet.enableNormalViz()
      this.immovableRockSet.enableNormalViz()
    }
    else {
      this.movingFish.disableNormalViz()
      this.nest.disableNormalViz()
      this.rockSet.disableNormalViz()
      this.pillarSet.disableNormalViz()
      this.algaeSet.disableNormalViz()
      this.immovableRockSet.disableNormalViz()
    }

    this.checkKeys()

    // ---- END Primitive drawing section
  }
}

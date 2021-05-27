import { CGFinterface, dat } from '../lib/CGF.js'

/**
 * MyInterface
 * @constructor
 */
export class MyInterface extends CGFinterface {
  constructor() {
    super()
  }

  init(application) {
    // call CGFinterface init
    super.init(application)
    // init GUI. For more information on the methods, check:
    // http://workshop.chromeexperiments.com/examples/gui
    this.gui = new dat.GUI()

    var obj = this

    let displays = this.gui.addFolder('Displays')

    //Checkbox element in GUI
    displays.add(this.scene, 'displayAxis').name('Display Axis')
    displays.add(this.scene, 'displayNormals').name("Display normals")

    //Objects to display

    let f0 = this.gui.addFolder('Visible Elements')

    f0.add(this.scene, 'displayMovingFish').name('Moving Fish')
    f0.add(this.scene, 'displaySeaFlor').name('Sea Floor');
    f0.add(this.scene, 'displayNest').name('Nest');
    f0.add(this.scene, 'displayWaterSurface').name('Water Surface');
    f0.add(this.scene, 'displayRockSet').name('Rock Set');
    f0.add(this.scene, 'displayImmovableRockSet').name('Immovable Rock Set');
    f0.add(this.scene, 'displayPillarSet').name('Pillar Set');
    f0.add(this.scene, 'displayAlgaeSet').name('Algae Set');


    let f1 = this.gui.addFolder('Fish Controls')

    f1.add(this.scene.movingFish, 'scaleFactor', 0.5, 3).name("Scale Factor")
    f1.add(this.scene.movingFish, 'velocityOffset', 0, 0.01).name('Velocity Offset')
    f1.add(this.scene.movingFish, 'rotationOffset', 0, 0.03).name('Rotation Offset')
    f1.add(this.scene.movingFish, 'maxVelocity', 0, 1.5).name('Max Velocity')
    f1.add(this.scene.movingFish, 'friction', 0, 0.02).name('Friction')

    this.gui.add(this.scene, 'currentCubeMapTextureID', this.scene.cubeMapTextureIDs)
      .name('Background')
      .onChange(this.scene.updateAppliedTexture.bind(this.scene))

    this.initKeys()

    return true
  }

  initKeys() {
    // create reference from the scene to the GUI
    this.scene.gui = this

    // disable the processKeyboard function
    this.processKeyboard = function () { }

    // create a named array to store which keys are being pressed
    this.activeKeys = {}
  }

  processKeyDown(event) {
    // called when a key is pressed down
    // mark it as active in the array
    this.activeKeys[event.code] = true
  }

  processKeyUp(event) {
    // called when a key is released, mark it as inactive in the array
    this.activeKeys[event.code] = false
  }

  isKeyPressed(keyCode) {
    if (
      this.activeKeys[keyCode] === true &&
      (keyCode == 'keyL' || keyCode == 'keyP')
    ) {
      this.activeKeys[keyCode] = false
      return true
    }
    return this.activeKeys[keyCode] || false
  }
}

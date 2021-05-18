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
    displays.add(this.scene, 'displayNormals').name("Display normals");

    //Objects to display

    let f0 = this.gui.addFolder('Moving Object')

    f0.add(this.scene.movingFish, 'scaleFactor', 0.5, 3).name("Scale Factor")
    f0.add(this.scene.movingFish, 'velocityOffset', 0, 0.01).name('Velocity Offset')
    f0.add(this.scene.movingFish, 'rotationOffset', 0, 0.03).name('Rotation Offset')
    f0.add(this.scene.movingFish, 'maxVelocity', 0, 1.5).name('Max Velocity')
    f0.add(this.scene.movingFish, 'friction', 0, 0.02).name('Friction')

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

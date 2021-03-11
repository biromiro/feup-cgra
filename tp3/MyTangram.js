import { CGFobject, CGFappearance } from '../lib/CGF.js'
import { MyDiamond } from './MyDiamond.js'
import { MyParallelogram } from './MyParallelogram.js'
import { MyTriangle } from './MyTriangle.js'
import { MyTriangleBig } from './MyTriangleBig.js'
import { MyTriangleSmall } from './MyTriangleSmall.js'

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTangram extends CGFobject {
  constructor(scene) {
    super(scene)
    this.diamond = new MyDiamond(scene)
    this.triangleBigL = new MyTriangleBig(scene)
    this.triangleBigR = new MyTriangleBig(scene)
    this.parallelogram = new MyParallelogram(scene)
    this.triangleSmallT = new MyTriangleSmall(scene)
    this.triangleSmallB = new MyTriangleSmall(scene)
    this.triangle = new MyTriangle(scene)
    this.initTangramMaterials()
  }

  initTangramMaterials() {
    // '#00ff00'
    this.materialSquare = new CGFappearance(this.scene)
    this.materialSquare.setAmbient(...this.scene.hexToRgbA('#00ff00'))
    this.materialSquare.setDiffuse(...this.scene.hexToRgbA('#00ff00'))
    this.materialSquare.setSpecular(0.95, 0.95, 0.95)
    this.materialSquare.setShininess(10.0)

    // '#ff9b00'
    this.materialTriangleBigL = new CGFappearance(this.scene)
    this.materialTriangleBigL.setAmbient(...this.scene.hexToRgbA('#ff9b00'))
    this.materialTriangleBigL.setDiffuse(...this.scene.hexToRgbA('#ff9b00'))
    this.materialSquare.setSpecular(0.95, 0.95, 0.95)
    this.materialTriangleBigL.setShininess(10.0)

    // '#009bff'
    this.materialTriangleBigR = new CGFappearance(this.scene)
    this.materialTriangleBigR.setAmbient(...this.scene.hexToRgbA('#009bff'))
    this.materialTriangleBigR.setDiffuse(...this.scene.hexToRgbA('#009bff'))
    this.materialSquare.setSpecular(0.95, 0.95, 0.95)
    this.materialTriangleBigR.setShininess(10.0)

    // '#ff1b1b'
    this.materialTriangleSmallT = new CGFappearance(this.scene)
    this.materialTriangleSmallT.setAmbient(...this.scene.hexToRgbA('#ff1b1b'))
    this.materialTriangleSmallT.setDiffuse(...this.scene.hexToRgbA('#ff1b1b'))
    this.materialSquare.setSpecular(0.95, 0.95, 0.95)
    this.materialTriangleSmallT.setShininess(10.0)

    // '#9650be'
    this.materialTriangleSmallB = new CGFappearance(this.scene)
    this.materialTriangleSmallB.setAmbient(...this.scene.hexToRgbA('#9650be'))
    this.materialTriangleSmallB.setDiffuse(...this.scene.hexToRgbA('#9650be'))
    this.materialSquare.setSpecular(0.95, 0.95, 0.95)
    this.materialTriangleSmallB.setShininess(10.0)

    // '#ffff00'
    this.materialParallelogram = new CGFappearance(this.scene)
    this.materialParallelogram.setAmbient(...this.scene.hexToRgbA('#ffff00'))
    this.materialParallelogram.setDiffuse(...this.scene.hexToRgbA('#ffff00'))
    this.materialSquare.setSpecular(0.95, 0.95, 0.95)
    this.materialParallelogram.setShininess(10.0)

    // '#ff9bcf'
    this.materialTriangle = new CGFappearance(this.scene)
    this.materialTriangle.setAmbient(...this.scene.hexToRgbA('#ff9bcf'))
    this.materialTriangle.setDiffuse(...this.scene.hexToRgbA('#ff9bcf'))
    this.materialSquare.setSpecular(0.95, 0.95, 0.95)
    this.materialTriangle.setShininess(10.0)
  }

  enableNormalViz() {
    this.diamond.enableNormalViz()
    this.triangleBigL.enableNormalViz()
    this.triangleBigR.enableNormalViz()
    this.parallelogram.enableNormalViz()
    this.triangleSmallT.enableNormalViz()
    this.triangleSmallB.enableNormalViz()
    this.triangle.enableNormalViz()
  }

  disableNormalViz() {
    this.diamond.disableNormalViz()
    this.triangleBigL.disableNormalViz()
    this.triangleBigR.disableNormalViz()
    this.parallelogram.disableNormalViz()
    this.triangleSmallT.disableNormalViz()
    this.triangleSmallB.disableNormalViz()
    this.triangle.disableNormalViz()
  }

  display() {
    const toRadians = (angle) => {
      return (Math.PI * 2 * angle) / 360
    }

    const rotateZAxis = (angle) => {
      return [
        Math.cos(toRadians(angle)),
        Math.sin(toRadians(angle)),
        0,
        0,
        -Math.sin(toRadians(angle)),
        Math.cos(toRadians(angle)),
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ]
    }

    const translate = (x, y, z) => {
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]
    }

    const scale = (x, y, z) => {
      return [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]
    }

    //main square

    this.scene.pushMatrix()

    this.scene.multMatrix(
      scale(Math.sqrt(2) / 2, -Math.sqrt(2) / 2, Math.sqrt(2) / 2)
    )

    this.scene.multMatrix(rotateZAxis(45))

    //this.materialSquare.apply();

    this.diamond.display()

    this.scene.popMatrix()

    //big triangle left

    this.scene.pushMatrix()

    this.scene.multMatrix(translate(-0.5, 1, 0))

    this.scene.multMatrix(scale(3 / 4, -3 / 4, 3 / 4))

    this.scene.multMatrix(rotateZAxis(90))

    this.materialTriangleBigL.apply()

    this.triangleBigL.display()

    this.scene.popMatrix()

    //big triangle right

    this.scene.pushMatrix()

    this.scene.multMatrix(translate(0.5, -1, 0))

    this.scene.multMatrix(scale(3 / 4, -3 / 4, 3 / 4))

    this.scene.multMatrix(rotateZAxis(-90))

    this.materialTriangleBigR.apply()

    this.triangleBigR.display()

    this.scene.popMatrix()

    //small triangle top

    this.scene.pushMatrix()

    this.scene.multMatrix(translate(0.5, 1, 0))

    this.scene.multMatrix(rotateZAxis(-135))

    this.scene.multMatrix(
      scale(Math.sqrt(2) / 2, -Math.sqrt(2) / 2, Math.sqrt(2) / 2)
    )

    this.materialTriangleSmallT.apply()

    this.triangleSmallT.display()

    this.scene.popMatrix()

    //small triangle bottom

    this.scene.pushMatrix()

    this.scene.multMatrix(translate(-0.5, -1, 0))

    this.scene.multMatrix(rotateZAxis(45))

    this.scene.multMatrix(
      scale(Math.sqrt(2) / 2, -Math.sqrt(2) / 2, Math.sqrt(2) / 2)
    )

    this.materialTriangleSmallB.apply()

    this.triangleSmallB.display()

    this.scene.popMatrix()

    //parallelogram

    this.scene.pushMatrix()

    this.scene.multMatrix(translate(0, -0.5, 0))

    this.scene.multMatrix(scale(Math.sqrt(2) / 2, (-1 * Math.sqrt(2)) / 2, 1))

    this.scene.multMatrix(rotateZAxis(135))

    this.materialParallelogram.apply()

    this.parallelogram.display()

    this.scene.popMatrix()

    //triangle

    this.scene.pushMatrix()

    this.scene.multMatrix(scale(1, -1, 1))

    this.scene.multMatrix(translate(1, -0.5, 0))

    this.scene.multMatrix(rotateZAxis(45))

    this.scene.multMatrix(
      scale(Math.sqrt(2) / 2, Math.sqrt(2) / 2, Math.sqrt(2) / 2)
    )

    this.materialTriangle.apply()

    this.triangle.display()

    this.scene.materials[this.scene.selectedMaterial].apply()

    this.scene.popMatrix()
  }
}

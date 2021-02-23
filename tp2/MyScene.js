import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangleBigL = new MyTriangleBig(this);
    this.triangleBigR = new MyTriangleBig(this);
    this.parallelogram = new MyParallelogram(this);
    this.triangleSmallT = new MyTriangleSmall(this);
    this.triangleSmallB = new MyTriangleSmall(this);
    this.triangle = new MyTriangle(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.showTriangle = true;
    this.showDiamond = true;
    this.showParallelogram = true;
    this.showTriangleBigL = true;
    this.showTriangleBigR = true;
    this.showTriangleSmallT = true;
    this.showTriangleSmallB = true;

  }

  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }


  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    const toRadians = (angle) => {
      return Math.PI * 2 * angle / 360;
    };


    const rotateZAxis = (angle) => {
      return [
        Math.cos(toRadians(angle)), Math.sin(toRadians(angle)), 0, 0,
        -Math.sin(toRadians(angle)), Math.cos(toRadians(angle)), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ];
    };

    const translate = (x, y, z) => {
      return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1
      ];
    };

    const scale = (x, y, z) => {
      return [
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1
      ];
    };

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section

    //main square

    this.pushMatrix();

    this.multMatrix(scale(Math.sqrt(2) / 2, Math.sqrt(2) / 2, Math.sqrt(2) / 2));

    this.multMatrix(rotateZAxis(45));

    if (this.showDiamond) this.diamond.display();

    this.popMatrix();

    //big triangle left

    this.pushMatrix();

    this.multMatrix(translate(-0.5, 1, 0));

    this.multMatrix(scale(3 / 4, 3 / 4, 3 / 4));

    this.multMatrix(rotateZAxis(90));

    if (this.showTriangleBigL) this.triangleBigL.display();

    this.popMatrix();

    //big triangle right

    this.pushMatrix();

    this.multMatrix(translate(0.5, -1, 0));

    this.multMatrix(scale(3 / 4, 3 / 4, 3 / 4));

    this.multMatrix(rotateZAxis(-90));

    if (this.showTriangleBigR) this.triangleBigR.display();

    this.popMatrix();

    //small triangle top

    this.pushMatrix();

    this.multMatrix(translate(0.5, 1, 0));

    this.multMatrix(rotateZAxis(45));

    this.multMatrix(scale(Math.sqrt(2) / 2, Math.sqrt(2) / 2, Math.sqrt(2) / 2));

    if (this.showTriangleSmallT) this.triangleSmallT.display();

    this.popMatrix();

    //small triangle bottom

    this.pushMatrix();

    this.multMatrix(translate(-0.5, -1, 0));

    this.multMatrix(rotateZAxis(-135));

    this.multMatrix(scale(Math.sqrt(2) / 2, Math.sqrt(2) / 2, Math.sqrt(2) / 2));

    if (this.showTriangleSmallB) this.triangleSmallB.display();

    this.popMatrix();

    //parallelogram

    this.pushMatrix();

    this.multMatrix(translate(0, -0.5, 0));

    this.multMatrix(scale(Math.sqrt(2) / 2, -1 * Math.sqrt(2) / 2, 1));

    this.multMatrix(rotateZAxis(135));

    if (this.showParallelogram) this.parallelogram.display();

    this.popMatrix();

    //triangle 

    this.pushMatrix();

    this.multMatrix(translate(1, 0.5, 0));

    this.multMatrix(rotateZAxis(-135));

    this.multMatrix(scale(Math.sqrt(2) / 2, Math.sqrt(2) / 2, Math.sqrt(2) / 2));

    if (this.showTriangle) this.triangle.display();

    this.popMatrix();

    // ---- END Primitive drawing section

  }
}

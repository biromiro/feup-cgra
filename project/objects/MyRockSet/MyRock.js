import { CGFobject, CGFtexture, CGFappearance } from '../../../lib/CGF.js';

export class MyRock extends CGFobject {
  constructor(scene, slices, stacks, pos, minSize, maxSize) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    [this.x, this.y, this.z] = pos
    this.initialPos = pos
    this.minSize = minSize;
    this.maxSize = maxSize;

    this.initBuffers()

    this.createDeformation()
    this.inParabolicThrow = false
    this.throwAngle = Math.PI / 3
    this.time = undefined
    this.increase = 1
  }

  /**
  * @method initBuffers
  * Initializes the sphere buffers
  */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    this.firstVertex = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      for (let longitude = 0; longitude < this.longDivs; longitude++) {

        //--- Vertices coordinates
        let x = Math.cos(theta) * sinPhi;
        let y = cosPhi;
        let z = Math.sin(-theta) * sinPhi;

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)

          this.indices.push(current + 1, current, next);
          this.indices.push(current + 1, next, next + 1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);
        theta += thetaInc;

        let offset = (Math.random() * 0.1 - 0.1)
        x += offset * x;
        y += offset * y;
        z += offset * z;
        this.vertices.push(x, y, z)
        if (longitude == 0) this.firstVertex = [x, y, z]

        //--- Texture Coordinates
        // To be done... 
        // May need some additional code also in the beginning of the function.

        this.texCoords.push(longitude / this.longDivs, latitude / this.latDivs)
      }

      const [x, y, z] = this.firstVertex
      this.vertices.push(x, y, z)
      this.normals.push(x, y, z)
      phi += phiInc;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  createDeformation() {
    this.xDeform = Math.max(Math.random() * this.maxSize, this.minSize);
    this.zDeform = Math.max(Math.random() * this.maxSize, this.minSize);
    this.yDeform = (this.xDeform + this.zDeform) / 4;
  }

  update() {
    if (this.inParabolicThrow) {
      if (this.time == undefined) this.time = 0
      else this.time += this.increase
      this.x = this.calculateBezierValue(this.startPos[0], this.controlPos[0], this.endPos[0], this.time / 33)
      this.y = this.calculateBezierValue(this.startPos[1], this.controlPos[1], this.endPos[1], this.time / 33)
      this.z = this.calculateBezierValue(this.startPos[2], this.controlPos[2], this.endPos[2], this.time / 33)
      if (this.time == 33) {
        this.inParabolicThrow = false
        this.time = undefined
      }
    }
  }

  setParabolicThrow(endPos) {
    this.inParabolicThrow = true;
    this.startPos = [this.x, this.y, this.z]
    this.endPos = endPos
    let yControl;
    if (this.startPos[1] - this.endPos[1] > 5) yControl = (this.startPos[1] - this.endPos[1]) / 2;
    else yControl = (this.startPos[1] - this.endPos[1]) / 2 + 2;
    this.controlPos = [(this.startPos[0] + this.endPos[0]) / 2, yControl, (this.startPos[2] + this.endPos[2]) / 2]
  }

  calculateBezierValue(p0, p1, p2, t) {
    return Math.pow(1 - t, 2) * p0 + 2 * (1 - t) * t * p1 + Math.pow(t, 2) * p2;
  }

  display() {
    this.scene.pushMatrix()
    this.scene.translate(this.x, this.y, this.z)
    this.scene.scale(this.xDeform, this.yDeform, this.zDeform)
    super.display()
    this.scene.popMatrix()
  }
}

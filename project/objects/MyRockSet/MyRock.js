import { CGFobject, CGFtexture, CGFappearance } from '../../../lib/CGF.js';

export class MyRock extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks, pos) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    [this.x, this.y, this.z] = pos

    this.initBuffers()

    this.createDeformation()
  }

  createDeformation(){
    this.xDeform = Math.max(Math.random()*0.5, 0.1)
    this.yDeform = 0.2
    this.zDeform = this.xDeform
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    this.everyVertex = [];

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
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {

        //--- Vertices coordinates
        var x = Math.cos(theta) * sinPhi;
        var y = cosPhi;
        var z = Math.sin(-theta) * sinPhi;
        this.everyVertex.push([x, y, z]);

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)
          
          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);
        theta += thetaInc;

        //--- Texture Coordinates
        // To be done... 
        // May need some additional code also in the beginning of the function.

        this.texCoords.push(longitude/this.longDivs, latitude/this.latDivs)        
      }
      phi += phiInc;
    }

    for(let k = 0; k < this.everyVertex.length; k++){
        let [x,y,z] = this.everyVertex[k]
        let offset = [Math.random() * 0.3 - 0.3, Math.random() * 0.3 - 0.3, Math.random() * 0.3 - 0.3]
        x += offset[0]
        y += offset[1]
        z += offset[2]
        this.vertices.push(x, y, z)
    }

/*
    for(let k = 0; k < this.vertices.length; k+=3){
        let offset = Math.floor(Math.random() * (0.1 + 0.1 + 1) ) - 0.1
        this.vertices[k] += (this.normals[k] * offset) * 0.3
        this.vertices[k+1] += (this.normals[k+1] * offset) * 0.3
        this.vertices[k+2] += (this.normals[k+2] * offset) * 0.3
    }
*/
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  display(){
    this.scene.pushMatrix()
    this.scene.translate(this.x, this.y, this.z)
    this.scene.scale(this.xDeform, this.yDeform, this.zDeform)
    super.display()
    this.scene.popMatrix()
  }
}

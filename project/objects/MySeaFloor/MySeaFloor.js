import { CGFappearance, CGFobject, CGFshader, CGFtexture } from '../../../lib/CGF.js'
import { MyPlane } from '../../primitives/MyPlane.js'


/**
 * MySeaFloor
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
 export class MySeaFloor extends CGFobject {
    constructor(scene, nrDivs, size, maxHeight) {
      super(scene)
  
      this.quad = new MyPlane(this.scene, nrDivs, size);
  
      this.createTextures()

      this.shader = new CGFshader(this.scene.gl, "./shaders/MySeaFloor.vert", "./shaders/MySeaFloor.frag")
      this.shader.setUniformsValues({uSampler2: 1, maxHeight: maxHeight})
    }

    createTextures(){
        this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0,0,0,1);
		this.appearance.setDiffuse(1,1,1,1);
		this.appearance.setSpecular(0,0,0,0);
        this.appearance.setShininess(10)

        this.texture = new CGFtexture(this.scene, "./images/sand.png")
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

        this.bumpMap = new CGFtexture(this.scene, "./images/sandMap.png")
    }

    display(){
        this.bumpMap.bind(1);
        this.scene.setActiveShader(this.shader)
        
        this.appearance.apply()
        this.quad.display()
    }
}
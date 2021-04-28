import { CGFappearance, CGFobject, CGFshader, CGFtexture } from '../../lib/CGF.js'
import { MyQuad } from '../primitives/MyQuad.js';


/**
 * MySeaFloor
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
 export class MyWaterSurface extends CGFobject {
    constructor(scene, nrDivs, size, maxHeight) {
      super(scene)
  
      this.quad = new MyQuad(scene);
  
      this.createTextures()

      //this.shader = new CGFshader(this.scene.gl, "./shaders/MyWaterSurface.vert", "./shaders/MyWaterSurface.frag")
      //this.shader.setUniformsValues({uSampler2: 1, maxHeight: maxHeight})
    }

    createTextures(){
        this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0,0,0,1);
		this.appearance.setDiffuse(1,1,1,1);
		this.appearance.setSpecular(0,0,0,0);
        this.appearance.setShininess(10)

        this.texture = new CGFtexture(this.scene, "./images/pier.jpg")
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

        this.distortionMap = new CGFtexture(this.scene, "./images/distortionmap.png")
    }

    display(){
        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI, 0, 0, 1)
        //this.distortionMap.bind(1);
        //this.scene.setActiveShader(this.shader)
        
        this.appearance.apply()
        this.quad.display()
        this.scene.defaultAppearance.apply()
        this.scene.popMatrix();
        

        //this.scene.setActiveShaderSimple(this.scene.defaultShader)
    }
}
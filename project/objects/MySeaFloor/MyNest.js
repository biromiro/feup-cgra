import { CGFappearance, CGFobject, CGFshader, CGFtexture } from '../../../lib/CGF.js'
import { MyRing } from '../../primitives/MyRing.js';


/**
 * MySeaFloor
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
 export class MyNest extends CGFobject {
    constructor(scene, slices, radius, innerRadius, position) {
      super(scene)
  
      this.ring = new MyRing(this.scene, slices, radius > 5 ? 5 : radius, innerRadius);
  
      this.createTextures()

      this.x = position[0]
      this.z = position[1]

      this.maxHeight = 1.5
      this.shader = new CGFshader(this.scene.gl, "./shaders/MySeaFloor.vert", "./shaders/MySeaFloor.frag")
      this.shader.setUniformsValues({uSampler2: 1, maxHeight: this.maxHeight})
    }

    createTextures(){
        this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0,0,0,1);
		this.appearance.setDiffuse(1,1,1,1);
		this.appearance.setSpecular(0,0,0,0);
        this.appearance.setShininess(10)

        this.texture = new CGFtexture(this.scene, "./images/seashell.jpg")
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

        this.bumpMap = new CGFtexture(this.scene, "./images/sandMap.png")
    }

    display(){
        this.bumpMap.bind(1);
        this.scene.setActiveShader(this.shader)
    
        this.appearance.apply()

        this.scene.pushMatrix()

        this.scene.translate(this.x, 0.5, this.z)

        this.scene.rotate(-Math.PI/2, 1, 0, 0)

        this.ring.display()

        this.scene.popMatrix()

        this.scene.defaultAppearance.apply()

        this.scene.setActiveShaderSimple(this.scene.defaultShader)
    }
}
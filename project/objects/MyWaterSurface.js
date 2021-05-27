import { CGFappearance, CGFobject, CGFshader, CGFtexture } from '../../lib/CGF.js'
import { MyQuad } from '../primitives/MyQuad.js';

export class MyWaterSurface extends CGFobject {
    constructor(scene, size) {
        super(scene)

        this.quad = new MyQuad(scene);

        this.createTextures()
        this.size = size
        this.shader = new CGFshader(this.scene.gl, "./shaders/MyWaterSurface.vert", "./shaders/MyWaterSurface.frag")
        this.shader.setUniformsValues({ uSampler2: 1 })
    }

    createTextures() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.7, 0.7, 0.7, 1);
        this.appearance.setDiffuse(1, 1, 1, 1);
        this.appearance.setSpecular(0, 0, 0, 0);
        this.appearance.setShininess(10)

        this.texture = new CGFtexture(this.scene, "./images/underwater_cubemap_2/top.png")
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

        this.distortionMap = new CGFtexture(this.scene, "./images/distortionmap.png")

    }

    update(t) {
        this.shader.setUniformsValues({ timeFactor: t / 100 % 25600 })
    }

    display() {
        this.scene.pushMatrix()
        this.scene.translate(0, 10, 0)
        this.scene.scale(this.size, this.size, this.size)
        this.scene.rotate(-Math.PI / 2, 1, 0, 0)

        this.distortionMap.bind(1)
        this.scene.setActiveShader(this.shader)


        this.appearance.apply()
        this.quad.display()

        this.scene.popMatrix();
    }
}
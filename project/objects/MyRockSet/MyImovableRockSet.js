import { CGFappearance, CGFobject, CGFshader, CGFtexture } from '../../../lib/CGF.js'
import { MyRock } from './MyRock.js'

export class MyImovableRockSet extends CGFobject {
    constructor(scene, num) {
      super(scene)
      this.createRocks(num)
     
      this.createTextures()
      this.shader = new CGFshader(this.scene.gl, "./shaders/MyPillar.vert", "./shaders/MyPillar.frag")
      this.shader.setUniformsValues({uSampler2: 1})
    }

    createTextures() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0, 0, 0, 1);
        this.appearance.setDiffuse(1, 1, 1, 1);
        this.appearance.setSpecular(0, 0, 0, 0);
        this.appearance.setShininess(10)

        this.texture = new CGFtexture(this.scene, "./images/imovable.jpg")
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

        this.bumpMap = new CGFtexture(this.scene, "./images/rock_height.png")
    }

    createRocks(num) {
        this.rocks = []
        for (let i = 0; i < num; i++) {

            let x = Math.floor(Math.random() * (25 - (-25) + 1)) - 25;
            let z = Math.floor(Math.random() * (25 - (-25) + 1)) - 25;

            let newRock = new MyRock(this.scene, 16, 16, [x, 0.05, z], 1.5, 3)
            this.rocks.push(newRock)
        }

    }

    display() {
        this.bumpMap.bind(1);
        this.scene.setActiveShader(this.shader)

        this.appearance.apply()
        this.rocks.forEach(rock => {
            rock.display()
        });
    }

    enableNormalViz() {
        this.rocks.forEach(rock => {
            rock.enableNormalViz()
        });

    }

    disableNormalViz() {
        this.rocks.forEach(rock => {
            rock.disableNormalViz()
        });
    }
}
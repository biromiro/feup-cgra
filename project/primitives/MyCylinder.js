import { CGFobject, CGFtexture, CGFappearance } from '../../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;

        this.cylinderAppearance = new CGFappearance(scene)
        this.cylinderAppearance.setAmbient(0, 0, 0, 1)
        this.cylinderAppearance.setDiffuse(1, 1, 1, 1)
        this.cylinderAppearance.setSpecular(0.0, 0.0, 0.0, 1)
        this.cylinderAppearance.setEmission(1,1,1,1)

        
        let dababyTexture = new CGFtexture(scene, "images/pillar.jpg")

        this.cylinderAppearance.setTexture(dababyTexture)

        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        for (var i = 0; i <= this.slices; i++) {
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa = Math.sin(ang);
            var ca = Math.cos(ang);

            this.vertices.push(ca, 0, sa);
            this.vertices.push(ca, 1, sa);

            // triangle normal computed by cross product of two edges
            var normal = [
                ca, 0, sa
            ];

            // normalization
            var nsize = Math.sqrt(
                normal[0] * normal[0] +
                normal[1] * normal[1] +
                normal[2] * normal[2]
            );
            normal[0] /= nsize;
            normal[1] /= nsize;
            normal[2] /= nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
             
            this.indices.push(0 + 2*i , 1 + 2*i , 2 + 2*i)
            this.indices.push(1 + 2*i , 3 + 2*i , 2 + 2*i)

            this.texCoords.push(i/this.slices, 1)
            this.texCoords.push(i/this.slices, 0)

            ang += alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    display(){
        this.cylinderAppearance.apply()
        super.display();
        this.scene.defaultAppearance.apply()
    }
}



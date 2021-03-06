import { CGFobject } from '../../lib/CGF.js';

export class MyRing extends CGFobject {
    constructor(scene, slices, radius, innerRadius) {
        super(scene);
        this.slices = slices;
        this.radius = radius
        this.innerRadius = innerRadius
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        //Parametric equations
        //x(ang,outerAng)= (radius + inner_radius*cos(outerAng)) cos(ang)
        //y(ang,outerAng)= (radius + inner_radius*cos(outerAng)) sin(ang)
        //z(ang,outerAng)= inner_radius * sin(outerAng)

        let ang = 0, outerAng = 0;
        const alphaAng = 2 * Math.PI / this.slices;
        const outerAlphaAng = Math.PI / this.slices;

        for (let slice = 0; slice <= this.slices; ++slice) {
            const s = slice / this.slices;
            ang = 0

            for (let innerSlice = 0; innerSlice <= this.slices; ++innerSlice) {
                const t = innerSlice / this.slices;

                const x = (this.radius + this.innerRadius * Math.cos(outerAng)) * Math.cos(ang);
                const y = (this.radius + this.innerRadius * Math.cos(outerAng)) * Math.sin(ang);
                const z = this.innerRadius * Math.sin(outerAng);

                this.vertices.push(x, y, z);

            
                let normal = [
                    x - (this.radius) * Math.cos(ang),
                    y - (this.radius) * Math.sin(ang),
                    z
                ];
                
                const nsize = Math.sqrt(
                    normal[0] * normal[0] +
                    normal[1] * normal[1] +
                    normal[2] * normal[2]
                );

                normal[0] /= nsize;
                normal[1] /= nsize;
                normal[2] /= nsize;

                this.normals.push(...normal);

                this.texCoords.push(t);
                this.texCoords.push(s);

                if (slice != this.slices && innerSlice != this.slices) {
                    this.indices.push(slice * (this.slices + 1) + innerSlice);
                    this.indices.push(slice * (this.slices + 1) + innerSlice + 1);
                    this.indices.push(((slice + 1) * (this.slices + 1) + innerSlice));

                    this.indices.push(((slice + 1) * (this.slices + 1) + innerSlice));
                    this.indices.push(slice * (this.slices + 1) + innerSlice + 1);
                    this.indices.push((slice + 1) * (this.slices + 1) + innerSlice + 1);
                }

                ang += alphaAng
            }
            outerAng += outerAlphaAng
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


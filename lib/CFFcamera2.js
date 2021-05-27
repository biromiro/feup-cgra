import { CGFcamera, CGFcameraAxisID } from "./CGF.js";

export class CGFcamera2 extends CGFcamera {
  vec3EulerRotation(vec, euler) {
    // calculate rotated vector
    var rotVector = vec4.fromValues(0, 0, vec3.length(vec), 0);

    // pitch
    var hLength = vec2.length(vec2.fromValues(vec[0], vec[2]));
    var pitch = hLength == 0? 0 : Math.atan(vec[1] / hLength);
    pitch += euler[0]; 
    pitch = Math.min(Math.PI / 2 - 0.0001, Math.max(-Math.PI / 2 + 0.0001, pitch)); // 0.0001 prevents gimbal locks

    rotVector = vec4.transformMat4(vec4.create(), rotVector, mat4.rotateX(mat4.create(), mat4.create(), -pitch));

    // yaw
    var yaw = 0;
    if (vec[2] > 0) yaw = Math.atan(vec[0] / vec[2]);
    else if(vec[2] < 0) yaw = Math.PI - Math.atan(vec[0] / -vec[2]);
    yaw += euler[1];

    rotVector = vec4.transformMat4(vec4.create(), rotVector, mat4.rotateY(mat4.create(),  mat4.create(), yaw));

    return rotVector;
  }

  orbit(axisID, angle) {
    // get current look vector reversed.
    var revLook = vec4.sub(vec4.create(), this.position, this.target);

    // calculate rotated reversed look vector
    var rotRevLook = vec4.create();

    if (axisID == CGFcameraAxisID.X)
      rotRevLook = this.vec3EulerRotation(revLook, vec2.fromValues(angle, 0));

    if (axisID == CGFcameraAxisID.Y)
      rotRevLook = this.vec3EulerRotation(revLook, vec2.fromValues(0, angle));

    // get new position by adding rotated reversed look vector to target position
    vec4.add(this.position, this.target, rotRevLook);
    this.direction = this.calculateDirection();
  }
}

import { MyMovingObject } from '../MyMovingObject.js'
import { MyFish } from './MyFish.js'

export class MyMovingFish extends MyMovingObject {
  constructor(scene, orientationAngle, velocity, position, rockSet, nest) {

    let fish = new MyFish(scene,
      () => { return this.velocity },
      () => { return this.rotationLeft },
      () => { return this.rotationRight })

    super(scene, fish, orientationAngle, velocity, position)

    super.setMaximumHeight(9.5)
    super.setMinimumHeight(1)
    super.scaleFactor = 0.5

    this.fish = fish
    this.rockSetToFind = rockSet
    this.nest = nest
    this.toCollectRock = false
    this.collectedOrReleased = false
    // needed because of the jitter caused by a key press,
    // making it catch and release in a short amount of time

    this.numberOfPositions = 4
    this.pileHeightBase = 0
    this.createNestRockPositions()
  }

  update(t) {
    if (this.toCollectRock && !this.collectedOrReleased) {
      super.getCaughtObject() !== undefined ? this.releaseRock() : this.catchRock()
      this.collectedOrReleased = true
      this.toCollectRock = false
    }
    this.rockSetToFind.update(t)
    super.update(t)
  }

  getDistance(object1, object2) {
    return Math.sqrt(Math.pow(object1.x - object2.x, 2) + Math.pow(object1.z - object2.z, 2))
  }

  collectRock() {
    this.toCollectRock = true
  }

  collectRockReleaseKey() {
    this.collectedOrReleased = false
    this.toCollectRock = false
  }

  catchRock() {
    if (this.y < this.minHeight) return
    let minPair = [undefined, Infinity]

    this.rockSetToFind.rocks.forEach(rock => {
      const distance = this.getDistance(this, rock)
      if (minPair[1] > distance) minPair = [rock, distance]
    });

    if (minPair[1] <= 1.5) {
      let found = false;
      for (let i = 0; i < this.nestRockPositions.length; i++) {

        let currHeight = this.pileHeightBase
        let size = (this.nestRockPositions[i][2]).length;
        let arr = []

        for (let j = 0; j < size; j++) {

          var obj = this.nestRockPositions[i][2][j];

          if (obj == minPair[0]) {
            found = true;
            continue;
          }

          if (found) {
            obj.setParabolicThrow([obj.x, currHeight, obj.z]);
          }

          currHeight += obj.yDeform * 2;
          arr.push(obj);
        }

        this.nestRockPositions[i][2] = arr;

        if (found) break;
      }
      minPair[0].inParabolicThrow = false;
      minPair[0].time = undefined;
      super.setCaughtObject(minPair[0])
    }


  }

  reset() {
    const caughtObject = super.getCaughtObject();
    if (caughtObject)
      [caughtObject.x, caughtObject.y, caughtObject.z] = caughtObject.initialPos
    super.setCaughtObject(undefined)
    super.reset()
  }

  releaseRock() {
    //if(this.y > this.minHeight ) return
    const dist = this.getDistance(this, this.nest)
    if (dist > (this.nest.radius > 5 ? this.nest.radius : 5)) return
    const caughtObject = super.getCaughtObject();
    caughtObject.setParabolicThrow(this.getRandomPosition(caughtObject))

    super.setCaughtObject(undefined)
  }

  createNestRockPositions() {
    this.nestRockPositions = []
    for (let i = 0; i < this.numberOfPositions; i++) {
      let position = []
      position.push(this.nest.x + (Math.random() * this.nest.radius - this.nest.radius / 2),
        this.nest.z + (Math.random() * this.nest.radius - this.nest.radius / 2),
        []);
      this.nestRockPositions.push(position)
    }
    console.log(this.nestRockPositions)
  }

  getRandomPosition(caughtObject) {
    const min = 0
    const max = Math.floor(this.numberOfPositions - 1);
    const randomPos = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(this.nestRockPositions[randomPos])
    let [x, z, height] = this.nestRockPositions[randomPos];
    console.log(x, z, height)
    let position = [x, this.getHeight(height), z]
    this.updatePosition(randomPos, caughtObject)
    console.log(position)
    console.log(this.nestRockPositions)
    return position
  }

  updatePosition(pos, object) {
    (this.nestRockPositions[pos][2]).push(object)
  }

  getHeight(objectsList) {
    let height = this.pileHeightBase;
    objectsList?.forEach(object => {
      height += object.yDeform * 2
    });
    return height
  }

  display() {
    super.display()
  }
}
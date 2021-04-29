import { CGFappearance, CGFobject } from '../../../lib/CGF.js'
import { MyRock } from './MyRock.js'


/**
 * MySeaFloor
 * @constructor
 * @param scene - Reference to MyScene object
 * @param num - The number of rocks of the set
 */
 export class MyRockSet extends CGFobject {
    constructor(scene, num) {
      super(scene)
      this.createRocks(num)
    }

    createRocks(num){
        this.rocks = []
        for(let i=0; i < num; i++){

            let x = Math.floor(Math.random() * (25 - (-25) + 1) ) -25;
            let z = Math.floor(Math.random() * (25 - (-25) + 1) ) -25;

            let newRock = new MyRock(this.scene, 16, 16, [x, 0, z])
            this.rocks.push(newRock)
        }
  
    }

    display(){
        this.rocks.forEach(rock => {
            rock.display()
        });
    }

    enableNormalViz(){
        this.rocks.forEach(rock => {
            rock.enableNormalViz()
        });
        
    }
    
    disableNormalViz(){
        this.rocks.forEach(rock => {
            rock.disableNormalViz()
        });
    }
}
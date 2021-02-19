import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        //Checkbox element for Triangle
        this.gui.add(this.scene, 'showTriangle').name('Show Triangle');

        //Checkbox element for Diamond
        this.gui.add(this.scene, 'showDiamond').name('Show Diamond');

        //Checkbox element for Parallelogram
        this.gui.add(this.scene, 'showParallelogram').name('Show Parallelo');

        //Checkbox element for TriangleSmall
        this.gui.add(this.scene, 'showTriangleSmall').name('Triangle Small');

        //Checkbox element for TriangleBig
        this.gui.add(this.scene, 'showTriangleBig').name('Triangle Big');

        return true;
    }
}
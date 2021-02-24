import { CGFinterface, dat } from '../lib/CGF.js';

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


        //Checkbox element for Diamond
        this.gui.add(this.scene, 'showTangram').name('Show Tangram');


        //Checkbox element for UnitCube
        this.gui.add(this.scene, 'showUnitCube').name('Show UnitCube');

        //Checkbox element for UnitCube
        this.gui.add(this.scene, 'showUnitCubeQuad').name('UnitCubeQuad');

        return true;
    }
}
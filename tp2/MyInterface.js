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
        this.gui.add(this.scene, 'showDiamond').name('Show Diamond');


        //Checkbox element for Parallelogram
        this.gui.add(this.scene, 'showParallelogram').name('Show Parallelo');

        //Checkbox element for TriangleSmallTop
        this.gui.add(this.scene, 'showTriangleSmallT').name('T Small Top');

        //Checkbox element for TriangleSmallBottom
        this.gui.add(this.scene, 'showTriangleSmallB').name('T Small Bottom');

        //Checkbox element for Triangle
        this.gui.add(this.scene, 'showTriangle').name('Show Triangle');

        //Checkbox element for TriangleBigLeft
        this.gui.add(this.scene, 'showTriangleBigL').name('T Big Left');

        //Checkbox element for TriangleBigRight
        this.gui.add(this.scene, 'showTriangleBigR').name('T Big Right');

        return true;
    }
}
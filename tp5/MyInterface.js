
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

		this.gui.add(this.scene, 'selectedObject', this.scene.objectList).onChange(this.scene.onSelectedObjectChanged.bind(this.scene)).name('Object Type');
		this.gui.add(this.scene, 'wireframe').onChange(this.scene.onWireframeChanged.bind(this.scene));

		this.gui.add(this.scene, 'selectedExampleShader', this.scene.shadersList).name('Shader examples').onChange(this.scene.onSelectedShaderChanged.bind(this.scene));
		this.gui.add(this.scene, 'showShaderCode').name('Show Shader Code').onChange(this.scene.onShaderCodeVizChanged.bind(this.scene));

		this.gui.add(this.scene, 'scaleFactor',-50,50).onChange(this.scene.onScaleFactorChanged.bind(this.scene));

		return true;
	};
}

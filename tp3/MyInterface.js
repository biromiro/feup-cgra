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

        this.gui.add(this.scene, 'displayAxis').name("Display axis");
        this.gui.add(this.scene, 'displayNormals').name("Display normals");

        // example of a dropdown that has numeric ID's associated, 
        // and an event handler to be called when the selection changes
        this.gui.add(this.scene, 'selectedObject', this.scene.objectIDs).name('Selected Object').onChange(this.scene.updateObjectComplexity.bind(this.scene));

        this.gui.add(this.scene, 'scaleFactor', 0.1, 10.0).name('Scale');
        this.gui.add(this.scene, 'objectComplexity', 0.01, 1.0).onChange(this.scene.updateObjectComplexity.bind(this.scene));

        this.gui.add(this.scene, 'selectedMaterial', this.scene.materialIDs).name('Selected Material');

        // a folder for grouping parameters for one of the lights
        var f0 = this.gui.addFolder('Light 0 ');
        f0.add(this.scene.lights[0], 'enabled').name("Enabled");
        // a subfolder for grouping only the three coordinates of the light
        var sf0 = f0.addFolder('Light 0 Position');
        sf0.add(this.scene.lights[0].position, '0', -5.0, 5.0).name("X Position");
        sf0.add(this.scene.lights[0].position, '1', -5.0, 5.0).name("Y Position");
        sf0.add(this.scene.lights[0].position, '2', -5.0, 5.0).name("Z Position");
    
        // similar but for light 1
        var f1 = this.gui.addFolder('Light 1 ');
        f1.add(this.scene.lights[1], 'enabled').name("Enabled");
        var sf1 = f1.addFolder('Light 1 Position');
        sf1.add(this.scene.lights[1].position, '0', -5.0, 5.0).name("X Position");
        sf1.add(this.scene.lights[1].position, '1', -5.0, 5.0).name("Y Position");
        sf1.add(this.scene.lights[1].position, '2', -5.0, 5.0).name("Z Position");
        var sf2 = f1.addFolder('Light 1 Attenuation');
        sf2.add(this.scene.lights[1], 'constant_attenuation', 0.00, 1.00).name("Const. Atten.");
        sf2.add(this.scene.lights[1], 'linear_attenuation', 0.0, 1.0).name("Linear Atten.");
        sf2.add(this.scene.lights[1], 'quadratic_attenuation', 0.0, 1.0).name("Quad. Atten.");
    
        // Anothe forlder for grouping the custom material's parameters
        var f2 = this.gui.addFolder('Custom Material');
        
        f2.addColor(this.scene.customMaterialValues,'Ambient').onChange(this.scene.updateCustomMaterial.bind(this.scene));
        f2.addColor(this.scene.customMaterialValues,'Diffuse').onChange(this.scene.updateCustomMaterial.bind(this.scene));
        f2.addColor(this.scene.customMaterialValues,'Specular').onChange(this.scene.updateCustomMaterial.bind(this.scene));
        f2.add(this.scene.customMaterialValues,'Shininess', 0, 100).onChange(this.scene.updateCustomMaterial.bind(this.scene));

        return true;
    }


}
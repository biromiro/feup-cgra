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
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Dropdown for textures
        this.gui.add(this.scene, 'selectedTexture', this.scene.textureIds).name('Selected Texture').onChange(this.scene.updateAppliedTexture.bind(this.scene));
        //Dropdown for wrapping (S)
        this.gui.add(this.scene, 'wrapS', this.scene.wrappingS).name('Wrap S').onChange(this.scene.updateTextureWrapping.bind(this.scene));
        this.gui.add(this.scene, 'wrapT', this.scene.wrappingT).name('Wrap T').onChange(this.scene.updateTextureWrapping.bind(this.scene));

        //Groups for Texture coordinates per vertex (MyQuad)
        var f0 = this.gui.addFolder('Top Left Coords')
        f0.add(this.scene.texCoords, '4', -5.0, 5.0, 0.1).name('S Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);
        f0.add(this.scene.texCoords, '5', -5.0, 5.0, 0.1).name('T Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);
        var f1 = this.gui.addFolder('Top Right Coords')
        f1.add(this.scene.texCoords, '6', -5.0, 5.0, 0.1).name('S Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);
        f1.add(this.scene.texCoords, '7', -5.0, 5.0, 0.1).name('T Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);
        var f2 = this.gui.addFolder('Bottom Left Coords')
        f2.add(this.scene.texCoords, '0', -5.0, 5.0, 0.1).name('S Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);
        f2.add(this.scene.texCoords, '1', -5.0, 5.0, 0.1).name('T Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);
        var f3 = this.gui.addFolder('Bottom Right Coords')
        f3.add(this.scene.texCoords, '2', -5.0, 5.0, 0.1).name('S Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);
        f3.add(this.scene.texCoords, '3', -5.0, 5.0, 0.1).name('T Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);

        return true;
    }
}
import {CGFapplication} from '../lib/CGF.js';
import { ShaderScene } from './ShaderScene.js';
import { MyInterface } from './MyInterface.js';

function main()
{
    var app = new CGFapplication(document.body);
    var myScene = new ShaderScene();
    var myInterface = new MyInterface();

    app.init();

    app.setScene(myScene);
    app.setInterface(myInterface);

    myInterface.setActiveCamera(myScene.camera);

	app.run();
}

main();
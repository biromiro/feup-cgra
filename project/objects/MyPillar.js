this.cylinderAppearance = new CGFappearance(scene)
        this.cylinderAppearance.setAmbient(0, 0, 0, 1)
        this.cylinderAppearance.setDiffuse(1, 1, 1, 1)
        this.cylinderAppearance.setSpecular(0.0, 0.0, 0.0, 1)
        this.cylinderAppearance.setEmission(1,1,1,1)

        
        let dababyTexture = new CGFtexture(scene, "images/pillar.jpg")

        this.cylinderAppearance.setTexture(dababyTexture)
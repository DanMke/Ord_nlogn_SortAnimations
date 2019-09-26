class Panel {
    constructor (screenWidth, screenHeight, menuHeight, elementWidth) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.menuHeight = menuHeight;
        this. elementWidth = elementWidth;
        this.numberElements = parseInt(screenWidth / elementWidth);
        this.elements = [];

        this.initializePanel();
    }

    addElement (element) {
        this.elements.push(element); 
    }

    createRandomUniqueHeights () {
        var randomUniqueHeights = []
        while(randomUniqueHeights.length < this.numberElements){
            let h = Math.floor(Math.random() * (height - menuHeight)) + 1;
            if(randomUniqueHeights.indexOf(h) == -1) { 
                randomUniqueHeights.push(h);
            }
        }
        return randomUniqueHeights;
    }

    initializePanel () {
        var randomUniqueHeights = this.createRandomUniqueHeights()

        // Para cada altura eh adicionado um elemento no painel com a altura aleatoria
        let posX = 0;
        for (let randomHeight of randomUniqueHeights) {
            this.addElement(new Element(posX, this.screenHeight - randomHeight, this.elementWidth, randomHeight));
            posX = posX + this.elementWidth;
        } 
    }

    swapElements (indexA, indexB) {
        var aux = this.elements[indexB];
        this.elements[indexB] = this.elements[indexA];
        this.elements[indexA] = aux;
    }

    updateHeights(heights) {
        for (let i = 0; i < this.numberElements; i++) {
            this.elements[i] = heights[i];
        }
    }

    updatePosX () {
        let posX = 0;
        for (let element of this.elements) {
            element.posX = posX;
            posX = posX + this.elementWidth;
        }
    }

    show () {
        for (let element of this.elements) {
            element.show();
        }
    }

    update () {
        background(0);
        this.updatePosX();
        this.show();
    }
    
}
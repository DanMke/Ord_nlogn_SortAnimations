class Element {
    constructor (posX, posY, rectWidth, rectHeight) {
      this.posX = posX;
      this.posY = posY;
      this.rectWidth = rectWidth;
      this.rectHeight = rectHeight;
      this.color = 255;
    }
    
    show () {
      fill(this.color);
      stroke(0);
      rect(this.posX, this.posY, this.rectWidth, this.rectHeight);
    }  
    
}
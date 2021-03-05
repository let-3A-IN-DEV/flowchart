class Node {
    constructor(x, y, w, h) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.offsetX = 0;
        this.offsetY = 0;
        
        this.dragging = false;
        this.mouseover = false;
    }

    setDrawColor() {
        if (this.dragging) {
            fill(96);
        } else if (this.mouseover) {
            fill(128)
        } else {
            fill(169);
        }
    }

    checkOver() {
        if (this.isMouseOver()) {
            this.mouseover = true;
        } else {
            this.mouseover = false;
        }

        return this.mouseover;
    }

    updatePos() {
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }

    pressed() {
        if (this.mouseover) {
            this.dragging = true;
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }

        return this.dragging;
    }
    
    released() {
        this.dragging = false;
    }
}

class EllipseNode extends Node {
    constructor(x, y, text) {
        super(x, y, 150, 75);
        this.text = text;
    }

    render() {
        this.setDrawColor();
        ellipse(this.x, this.y, this.w, this.h);
        fill(0);
        text(this.text, this.x, this.y);
    }

    isMouseOver() {
        return (Math.pow((mouseX - this.x), 2) / Math.pow(this.w / 2, 2) +
                Math.pow((mouseY - this.y), 2) / Math.pow(this.h / 2, 2)) <= 1;
    }
}

class RectNode extends Node {
    constructor(...args) {
        super(...args);
    }

    render() {
        this.setDrawColor();
        rect(this.x, this.y, this.w, this.h);
        fill(0);
        text(this.text, this.x, this.y);
    }

    isMouseOver() {
        return (
            mouseX > this.x - this.w / 2 &&
            mouseX < this.x + this.w / 2 &&
            mouseY > this.y - this.h / 2 &&
            mouseY < this.y + this.h / 2);
    }
}

class BeginNode extends EllipseNode {
    constructor() {
        super(windowWidth/2, 100, "Begin");
    }
}

class EndNode extends EllipseNode {
    constructor() {
        super(windowWidth/2, 700, "End");
    }
}
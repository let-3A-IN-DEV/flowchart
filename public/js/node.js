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
        this.selected = false;
    }

    setDrawColor() {
        if (this.dragging) {
            fill(100);
        } else if (this.mouseover) {
            fill(120);
        } else if (this.selected) {
            fill(140);
        } else {
            fill(160);
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

    checkDelete() {
        let x = this.x + this.w / 2 + 5;
        let y = this.y - this.h / 2 - 5;

        return this.selected && dist(x, y, mouseX, mouseY) < 15 / 2;
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
            this.selected = true;
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }

        return this.dragging;
    }

    released() {
        this.dragging = false;
    }

    mouseNotOver() {
        this.mouseover = false;
    }

    select() {
        this.selected = true;
    }

    unselect() {
        this.selected = false;
    }

    renderSelection() {
        fill(0, 0);
        stroke(150);
        strokeWeight(2);
        rect(this.x, this.y, this.w + 15, this.h + 15, 10);

        fill(255);
        circle(this.x + this.w / 2 + 5, this.y - this.h / 2 - 5, 15);
        fill(255, 0, 0);
        text('X', this.x + this.w / 2 + 5, this.y - this.h / 2 - 5);
    }
}

class EllipseNode extends Node {
    constructor(x, y, text) {
        super(x, y, 150, 75);
        this.text = text;
    }

    render() {
        this.setDrawColor();
        stroke(80);
        strokeWeight(2);
        ellipse(this.x, this.y, this.w, this.h);
        fill(0);
        text(this.text, this.x, this.y);

        if (this.selected) {
            this.renderSelection();
        }
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
        stroke(80);
        strokeWeight(2);
        rect(this.x, this.y, this.w, this.h);
        fill(0);
        text(this.text, this.x, this.y);

        if (this.selected) {
            this.renderSelection();
        }
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
        super(windowWidth / 2, 100, "Begin");
    }
}

class EndNode extends EllipseNode {
    constructor() {
        super(windowWidth / 2, 700, "End");
    }
}
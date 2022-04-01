let nodes = [];
let canvas;
let multiselection;
let multideselection;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight * 0.8);
    canvas.id('canvas');

    // creates a BeginNode and an EndNode in the canvas
    nodes.push(new BeginNode());
    nodes.push(new EndNode());

    // aligns the node's text in its centre
    textAlign(CENTER, CENTER);
    ellipseMode(CENTER);
    rectMode(CENTER);

    // multiple selection is disabled
    multiselection = false;
    multideselection = false;


    nodes.push(new RectNode(100, 100, 200, 100));
}

function draw() {
    background(240);

    stroke(0, 60);
    strokeWeight(1);

    for (let x = 0; x < canvas.width / 2; x += 15) {
        line(canvas.width / 2 - x, 0, canvas.width / 2 - x, canvas.height);
        line(canvas.width / 2 + x, 0, canvas.width / 2 + x, canvas.height);
    }
    for (let y = 0; y < canvas.height / 2; y += 15) {
        line(0, canvas.height / 2 - y, canvas.width, canvas.height / 2 - y);
        line(0, canvas.height / 2 + y, canvas.width, canvas.height / 2 + y);
    }

    for (let i = nodes.length - 1; i >= 0; i--) {
        if (nodes[i].checkOver() || nodes[i].dragging) {
            nodes[i].updatePos();

            for (let j = 0; j < nodes.length; j++) {
                if (j != i) {
                    nodes[j].mouseNotOver();
                }
            }
            break;
        }
    }

    nodes.forEach(node => node.render());
}

// changes the size of the canvas respectively to the user's webpage size
function windowResized() {
    resizeCanvas(windowWidth, windowHeight * 0.8);
}

// when the mouse is pressed the node is dragged on the canvas
function mousePressed() {
    let selectedNode = false;

    for(let i = 0; i < nodes.length; i++) {
        if(nodes[i].checkDelete()) {
            nodes.splice(i, 1);
            i--;
        }
    }

    for (let i = nodes.length - 1; i >= 0; i--) {
        if (nodes[i].pressed()) {
            // put node to the end of the array to be rendered at last to be on top of all other
            nodes.push(nodes[i]);
            nodes.splice(i, 1);
            
            if(multiselection && nodes[nodes.length - 1].selected) {
                multideselection = true;
                nodes[nodes.length - 1].unselect();
            }

            if(!multiselection)
                for (let j = 0; j < nodes.length - 1; j++)
                    nodes[j].unselect();

           if(!nodes[nodes.length - 1].selected && !multideselection)
                nodes[nodes.length - 1].select();
            
            multideselection = false;
            selectedNode = true;
            break;
        }
    }

    if (!selectedNode) {
        nodes.forEach(node => node.unselect());
    }
}

// when the mouse is released the node is released
function mouseReleased() {
    nodes.forEach(node => {
        node.released();
    });
}

function keyPressed() {
    switch (keyCode) {
        case ESCAPE: {
            nodes.forEach(node => node.unselect());
        } break;

        case SHIFT: {
            multiselection = true;
        } break;

        case DELETE:
        case BACKSPACE: {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].selected) {
                    nodes.splice(i, 1);
                    i--;
                }
            }
        }
    }
}

function keyReleased() {
    switch(keyCode) {
        case SHIFT: {
            multiselection = false;
        } break;
    }
}
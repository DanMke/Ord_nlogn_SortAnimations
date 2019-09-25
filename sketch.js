var panel;
var menuHeight
var elementWidth;
var running = false;

function setup() {
    elementWidth = 3;
    menuHeight = 200;

    var canvas = createCanvas(1200, 600 + menuHeight);
    canvas.parent("sketch");

    resetSketch();
    
    resetButton = createButton('Reset');
    resetButton.position(300, 22, 25);
    resetButton.mousePressed(resetSketch);

    insertionSortButton = createButton('Insertion Sort');
    insertionSortButton.position(500, 22, 25);
    insertionSortButton.mousePressed(runAlgorithmInsertionSort);

    mergeSortButton = createButton('Merge Sort');
    mergeSortButton.position(600, 22, 25);
    mergeSortButton.mousePressed(runAlgorithmMergeSort);

    bucketSortButton = createButton('Bucket Sort');
    bucketSortButton.position(687, 22, 25);
    // mergeSortButton.mousePressed(runAlgorithmMergeSort);

    quickSortButton = createButton('Quick Sort');
    quickSortButton.position(777, 22, 25);
    // mergeSortButton.mousePressed(runAlgorithmMergeSort);

}

function resetSketch() {
    if (running) {
        print("Already running");
        return;
    }
    panel = new Panel(width, height, menuHeight, elementWidth);
}

function draw() {
    panel.update();
}

function sleep(ms) {
    if (ms === 0 || isNaN(ms)){
        return;
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}

function runAlgorithmMergeSort() {
    if (running) { 
        print("Already running");
        return;
    }
    //running = true;
    //mergeSort(panel);
}

function runAlgorithmInsertionSort() {
    if (running) { 
        print("Already running");
        return;
    }
    running = true;
    insertionSort(panel);
}

async function insertionSort(panel) {
    print('passou')
    for (let i = 0; i < panel.elements.length; i++) {
        print(i)
        let j = i;
        while ((j != 0) && panel.elements[j].rectHeight < panel.elements[j - 1].rectHeight) {
            await sleep(1);
            panel.swapElements(j, j - 1);
            panel.update();
            j -= 1;
        }
        // noLoop();
    }
    print('terminou')
    running = false;
}


// async function delayES8(time) {
//     await delay(time);
//     return;
// }

// function delay(time) {
//     return new Promise((resolve, reject) => {
//         if (isNaN(time)) {
//             reject(new Error('delay requires a valid number'));
//         } else {
//             setTimeout(resolve, time);
//         }
//     });
// }
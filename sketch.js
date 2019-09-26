var panel;
var menuHeight
var elementWidth;
var running = false;

var RED;
var BLUE;
var GREEN;
var YELLOW;
var WHITE;

function setup() {
    RED = color(255, 0, 0);
    BLUE = color(0, 0, 255);
    GREEN = color(0, 255, 0);
    YELLOW = color(255, 255, 0);
    WHITE = color(255, 255, 255);

    elementWidth = 3;
    menuHeight = 200;

    var canvas = createCanvas(1500, 600 + menuHeight);
    canvas.parent("sketch");

    resetSketch();
    
    resetButton = createButton('Reset');
    resetButton.position(300, 22, 25);
    resetButton.mousePressed(resetSketch);

    speedSlider = createSlider(1, 1000, 5);
    speedSlider.position(500, 22);

    insertionSortButton = createButton('Insertion Sort');
    insertionSortButton.position(800, 22, 25);
    insertionSortButton.mousePressed(runAlgorithmInsertionSort);

    mergeSortButton = createButton('Merge Sort');
    mergeSortButton.position(900, 22, 25);
    mergeSortButton.mousePressed(runAlgorithmMergeSort);

    bucketSortButton = createButton('Bucket Sort');
    bucketSortButton.position(987, 22, 25);
    // mergeSortButton.mousePressed(runAlgorithmMergeSort);

    quickSortButton = createButton('Quick Sort');
    quickSortButton.position(1077, 22, 25);
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
    if (ms === 0) {
        return;
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}

function runAlgorithmMergeSort() {
    if (running) { 
        print("Already running");
        return;
    }
    running = true;
    mergeSort(panel.elements, 0, panel.elements.length - 1);
}


async function mergeSort(arr, left, right) {
    if (left < right) {
        await sleep(speedSlider.value());
        arr[left].color = YELLOW;
        await sleep(speedSlider.value());
        arr[right].color = RED;
        panel.update();
        var mid = parseInt((left + (right - left) / 2));
        await Promise.all([
            mergeSort(arr, left, mid),
            mergeSort(arr, mid + 1, right),
            merge(arr, left, mid, right)
        ]);
    }
}

async function merge(arr, left, mid, right) {
    var i, j, k;
    var n1 = mid - left + 1;
    var n2 = right - mid;

    var L = [];
    var R = [];

    for (i = 0; i < n1; i++) {
        L.push(arr[left + i]);
    }
    for (j = 0; j < n2; j++) {
        R.push(arr[mid + 1 + j]);
    }
    
    i = 0;
    j = 0;
    k = left ;
    
    while (i < n1 && j < n2) {
        if (L[i].rectHeight <= R[j].rectHeight) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// async function mergeSort(arr) {
//     print ('comecou');
//     if (arr.length < 2) {
//         return arr;
//     }
//     var midPoint = parseInt(arr.length / 2);
//     var left = arr.slice(0, midPoint);
//     left[0].color = YELLOW;
//     left[midPoint - 1].color = YELLOW;
//     await sleep(speedSlider.value());
//     panel.update();

//     var right = arr.slice(midPoint, arr.length);
//     right[0].color = RED;
//     right[midPoint - 1].color = RED;
//     await sleep(speedSlider.value());
//     panel.update();
    
//     await Promise.all([
//         mergeSort(left),
//         mergeSort(right)
//     ]);
    
//     let i = 0, j = 0, k = 0;
//     while (i < left.length && j < right.length) {
//         if (left[i].rectHeight < right[j].rectHeight) {
            
//             arr[k] = left[i];
//             i += 1;
//         } else {
//             arr[k] = right[j];
//             j += 1;
//         }
//         k += 1;
//     }
//     while (i < left.length) {
//         arr[k] = left[i];
//         i += 1;
//         k += 1;
//     }
//     while (j < right.length) {
//         arr[k] = right[j];
//         j += 1;
//         k += 1;
//     }
//     print('terminou');
//     running = false;
// }

function runAlgorithmInsertionSort() {
    if (running) { 
        print("Already running");
        return;
    }
    running = true;
    insertionSort();
}

async function insertionSort() {
    print('passou')
    panel.elements[0].color = GREEN;
    for (let i = 0; i < panel.elements.length; i++) {
        print(i)
        let j = i;
        panel.elements[j].color = RED;
        while ((j != 0) && panel.elements[j].rectHeight < panel.elements[j - 1].rectHeight) {
            await sleep(speedSlider.value());
            panel.swapElements(j, j - 1);
            panel.update();
            j -= 1;
        }
        panel.elements[j].color = GREEN;
        // noLoop();
    }
    running = false;
    print('terminou')
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
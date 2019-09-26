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

    elementWidth = 6;
    menuHeight = 200;

    var canvas = createCanvas(1500, 600 + menuHeight);
    canvas.parent("sketch");

    resetSketch();
    
    resetButton = createButton('Reset');
    resetButton.position(220, 25, 25);
    resetButton.mousePressed(resetSketch);

    speedSlider = createSlider(1, 1000, 5);
    speedSlider.position(300, 22);

    shellSortButton = createButton('Shell Sort');
    shellSortButton.position(520, 22, 25);
    shellSortButton.mousePressed(runAlgorithmShellSort);

    bubbleSortButton = createButton('Bubble Sort');
    bubbleSortButton.position(600, 22, 25);
    bubbleSortButton.mousePressed(runAlgorithmBubbleSort);

    selectionSortButton = createButton('Selection Sort');
    selectionSortButton.position(695, 22, 25);
    selectionSortButton.mousePressed(runAlgorithmSelectionSort);

    insertionSortButton = createButton('Insertion Sort');
    insertionSortButton.position(800, 22, 25);
    insertionSortButton.mousePressed(runAlgorithmInsertionSort);

    mergeSortButton = createButton('Merge Sort');
    mergeSortButton.position(900, 22, 25);
    mergeSortButton.mousePressed(runAlgorithmMergeSort);

    bucketSortButton = createButton('Bucket Sort');
    bucketSortButton.position(987, 22, 25);
    bucketSortButton.mousePressed(runAlgorithmBucketSort);

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
        arr[left].color = YELLOW;
        arr[right].color = BLUE;
        await sleep(speedSlider.value());
        arr[left].color = WHITE;
        arr[right].color = WHITE;
        var mid = parseInt((left + (right - left) / 2));

        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);
        await sleep(speedSlider.value());
        await merge(arr, left, mid, right);
    }
}

async function merge(arr, left, mid, right) {
    var last = false;
    if (left == 0 && right == panel.numberElements - 1) {
        last = true;
    }
    var n1 = mid - left + 1;
    var n2 = right - mid;

    var L = arr.slice(left, left + n1);
    var R = arr.slice(mid + 1, mid + 1 + n2);

    var i = 0, j = 0, k = left;
    await sleep(speedSlider.value());
    while (i < n1 && j < n2) {
        if (L[i].rectHeight <= R[j].rectHeight) {
            arr[k] = L[i], i++;
        } else {
            arr[k] = R[j], j++;
        }
        k++;
    }
    await sleep(speedSlider.value());
    while (i < n1) {
        arr[k] = L[i], i++, k++;
    }
    await sleep(speedSlider.value());
    while (j < n2) {
        arr[k] = R[j], j++, k++;
    }
    if (last) {
        for (let i = 0; i < arr.length; i++) {
            await sleep(speedSlider.value() / 100);
            arr[i].color = GREEN;
        }
        print(arr.length)
        print(panel.numberElements)
        print(panel.elements.length)
    }
    await sleep(speedSlider.value());
    panel.update();
    if (last) {
        running = false;
    }
}

function runAlgorithmInsertionSort() {
    if (running) { 
        print("Already running");
        return;
    }
    running = true;
    insertionSort();
}

async function insertionSort() {
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
    }
    running = false;
}

function runAlgorithmSelectionSort() {
    if (running) { 
        print("Already running");
        return;
    }
    running = true;
    selectionSort();
}

async function selectionSort() {
    for (let i = 0; i < panel.elements.length; i++) {
        await sleep(speedSlider.value() / 100);
        min_index = i;
        panel.elements[min_index].color = RED;
        for (let j = i + 1; j < panel.elements.length; j++) {
            await sleep(speedSlider.value() / 100);
            if (j > 0 && panel.elements[j - 1].color == BLUE) {
                panel.elements[j - 1].color = WHITE;
            }
            panel.elements[j].color = BLUE;
            if (panel.elements[j].rectHeight < panel.elements[min_index].rectHeight) {
                panel.elements[min_index].color = WHITE;
                panel.elements[j].color = RED;
                min_index = j;
            }
        }
        panel.swapElements(i, min_index);

        if (panel.elements[panel.elements.length - 1].color == BLUE) {
            panel.elements[panel.elements.length - 1].color = WHITE;
        }
        panel.elements[i].color = GREEN;
    }
    running = false;
}

function runAlgorithmBubbleSort() {
    if (running) { 
        print("Already running");
        return;
    }
    running = true;
    bubbleSort();
}

async function bubbleSort() {
    for (let i = 0; i < panel.elements.length; i++) {
        await sleep(speedSlider.value());
        for (let j = 0; j < panel.elements.length - i - 1; j++) {
            await sleep(speedSlider.value());
            panel.elements[j].color = RED;
            if (panel.elements[j].rectHeight > panel.elements[j + 1].rectHeight) {
                panel.swapElements(j, j + 1);
            } else {
                panel.elements[j].color = WHITE;
                panel.elements[j + 1].color = RED;
            }
        }
        panel.elements[panel.elements.length - i - 1].color = GREEN;
    }
    running = false;
}

function runAlgorithmShellSort() {
    if (running) { 
        print("Already running");
        return;
    }
    running = true;
    shellSort();
}

async function shellSort() {
    var last = false;
    var gap = parseInt(panel.elements.length / 2);
    var z;
    while (gap > 0) {
        await sleep(speedSlider.value());
        if (gap === 1) {
            last = true;
        }
        for (let i = gap; i < panel.elements.length; i++) {
            var temp = panel.elements[i];
            panel.elements[i].color = RED;
            panel.elements[i - gap].color = BLUE;
            await sleep(speedSlider.value());
            var j = i;
            while (j >= gap && panel.elements[j - gap].rectHeight > temp.rectHeight) {
                panel.elements[j - gap].color = BLUE;
                await sleep(speedSlider.value());
                panel.elements[j] = panel.elements[j - gap];
                j -= gap;
            }
            panel.elements[j] = temp;
            if (!last) {
                panel.elements[j].color = WHITE;
                panel.elements[i - gap].color = WHITE;
                z = i;
                while (z >= gap) {
                    panel.elements[z].color = WHITE;
                    z -= gap;
                }
            } else {
                panel.elements[j].color = GREEN;
                panel.elements[i - gap].color = GREEN;
                z = i;
                while (z >= gap) {
                    panel.elements[z].color = GREEN;
                    z -= gap;
                }
            }
        }
        gap = parseInt(gap / 2);
    }
    running = false;
}

function runAlgorithmBucketSort() {
  if (running) { 
    print("Already running");
    return;
  }
  running = true;
  bucketSort();
}

async function bucketSort(){
  
  var min = 1000,      
      bucket_count = 50,
      buckets = Array(bucket_count);

  for(let j = 0; j < panel.elements.length; j++){
    if(panel.elements[j].rectHeight < min){
      min = panel.elements[j].rectHeight;
    };
  }

  for(let i = 0; i < panel.elements.length; i++){
    let newIndex = Math.floor( (panel.elements[i].rectHeight - min) / bucket_count );
    buckets[newIndex] = buckets[newIndex] || [];
    buckets[newIndex].push(panel.elements[i]);
  }
  var pos = 0;
  for(let i = 0; i < buckets.length; i++){
    if(buckets[i]){
      buckets[i][0].color = RED;

      for(let j = 0; j < buckets[i].length; j++){
        panel.elements[pos++] = buckets[i][j];
        await sleep(speedSlider.value());
      }
    }
  }

  pos = 0;
  for(let i = 0; i < buckets.length; i++){
    if(buckets[i]){  
      await insertionSortToBucket(buckets[i]);
      for(let j = 0; j < buckets[i].length; j++){        
        panel.elements[pos].color = GREEN;        
        panel.elements[pos++] = buckets[i][j];
        await sleep(speedSlider.value());
      }
    }
  }
  running = false;
}

async function insertionSortToBucket(bucket){
  for (let i = 0; i < bucket.length; i++) {
    let j = i;
    temp = bucket[j];
    bucket[j].color = YELLOW;
    while ((j > 0) && bucket[j].rectHeight < bucket[j - 1].rectHeight) {
      let aux = bucket[j];
      bucket[j] = bucket[j - 1];
      bucket[j - 1] = aux;
      await sleep(speedSlider.value());
      j -= 1;
    }
    bucket[j].color = WHITE;
  }
}

// pos = 0;
// for(let i = 0; i < buckets.length; i++){
//   if(buckets[i]){  
//     insertionSortToBucket(buckets[i], pos);
//     pos += buckets[i].length;
//     // for(let j = 0; j < buckets[i].length; j++){        
//     //   panel.elements[pos].color = GREEN;        
//     //   panel.elements[pos++] = buckets[i][j];
//     //   await sleep(speedSlider.value());
//     // }
//   }
// }
// running = false;
// }

// async function insertionSortToBucket(bucket, pos){
// for (let i = 0; i < bucket.length; i++) {
//   print("t");
//   let j = i;
//   bucket[i].color = YELLOW;
//   while ((j > 0) && bucket[j].rectHeight < bucket[j - 1].rectHeight) {
//     print("o");
//     aux = panel.elements[pos + j];
//     panel.elements[pos + j] = panel.elements[pos + j - 1];
//     panel.elements[pos + j - 1] = aux;
//     await sleep(speedSlider.value());
//     j--;
//   }
//   bucket[i].color = WHITE;
// }
// }
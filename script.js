const container = document.getElementById("array-container");
const speedInput = document.getElementById("speed");
const algoSelect = document.getElementById("algorithm");

let array = [];
let delay = 100;

generateNewArray();

function generateNewArray(size = 40) {
    array = [];
    container.innerHTML = "";

    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 300) + 20;
        array.push(value);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;
        container.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSorting() {
    delay = 310 - speedInput.value;

    const algorithm = algoSelect.value;

    if (algorithm === "bubble") await bubbleSort();
    if (algorithm === "selection") await selectionSort();
    if (algorithm === "insertion") await insertionSort();
}

async function bubbleSort() {
    const bars = document.querySelectorAll(".bar");

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            bars[j].classList.add("compare");
            bars[j + 1].classList.add("compare");

            await sleep(delay);

            if (array[j] > array[j + 1]) {
                bars[j].classList.add("swap");
                bars[j + 1].classList.add("swap");

                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;

                await sleep(delay);
            }

            bars[j].className = "bar";
            bars[j + 1].className = "bar";
        }

        bars[array.length - i - 1].classList.add("sorted");
    }
}

async function selectionSort() {
    const bars = document.querySelectorAll(".bar");

    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        bars[minIndex].classList.add("compare");

        for (let j = i + 1; j < array.length; j++) {
            bars[j].classList.add("compare");
            await sleep(delay);

            if (array[j] < array[minIndex]) {
                bars[minIndex].classList.remove("compare");
                minIndex = j;
                bars[minIndex].classList.add("compare");
            }

            bars[j].classList.remove("compare");
        }

        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        bars[i].style.height = `${array[i]}px`;
        bars[minIndex].style.height = `${array[minIndex]}px`;

        bars[minIndex].classList.remove("compare");
        bars[i].classList.add("sorted");
    }
}

async function insertionSort() {
    const bars = document.querySelectorAll(".bar");

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].classList.add("compare");
        await sleep(delay);

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1]}px`;
            j--;
            await sleep(delay);
        }

        array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;

        bars[i].classList.remove("compare");
    }

    bars.forEach(bar => bar.classList.add("sorted"));
}

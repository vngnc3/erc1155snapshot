const monke = ['🐒', '🦍', '🐵', '🙈', '🙉', '🙊'];
const delay = 1000;

function hello(item) {
        console.log(`hello ${item}`);
};

function delayedForEach(array, callback, delay) {
    let i = 0;
    let intervalId = setInterval(function() {
        callback(array[i++]);
        if (i >= array.length) {
            clearInterval(intervalId);
        }
    }, delay);
}

delayedForEach(monke, hello, delay);
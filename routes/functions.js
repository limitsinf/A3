
function findSummation(number) {
    return number
        .toString()            
        .split('')             
        .map(Number)           
        .reduce((a, b) => a + b, 0);  
}

function uppercaseFirstandLast(str) {
    if (typeof str !== 'string') return false;
    return str.split(' ').map(word => {
        if (word.length === 1) return word.toUpperCase();
        return word.charAt(0).toUpperCase() + word.slice(1, -1) + word.charAt(word.length - 1).toUpperCase();
    }).join(' ');
}

function findAverageAndMedian(arr) {
    if (!Array.isArray(arr) || arr.some(isNaN)) return false;
    const sum = arr.reduce((a, b) => a + b, 0);
    const avg = sum / arr.length;

    arr.sort((a, b) => a - b);
    const mid = Math.floor(arr.length / 2);
    const median = arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;

    return { average: avg, median: median };
}

function findFourDigits(str) {
    const match = str.match(/\b\d{4}\b/);
    return match ? match[0] : false;
}

module.exports = {
    findSummation,
    uppercaseFirstandLast,
    findAverageAndMedian,
    findFourDigits
};

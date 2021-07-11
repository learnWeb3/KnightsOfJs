
// capitalizing word
function capitalize(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// randomizing an array
function randomize(array) {
    let oldArray = [...array];
    let newArray = [];
    while (oldArray.length > 0) {
        let randomIndex = Math.floor(Math.random() * oldArray.length);
        newArray.push(oldArray[randomIndex]);
        oldArray.splice(randomIndex, 1);
    }
    return newArray;
}


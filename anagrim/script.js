let wordList = [];
let nameList = [];

// Load word list
fetch("wordlist.json")
    .then(response => response.json())
    .then(data => {
        wordList = data.words;
    });

// Load name list
fetch("namelist.json")
    .then(response => response.json())
    .then(data => {
        nameList = data.names;
    });

function generateCuratedAnagram(name) {
    let letters = name.replace(/\s+/g, "").toLowerCase().split("");
    let possibleWords = wordList.filter(word => {
        let tempLetters = [...letters];
        return word.split("").every(letter => {
            let index = tempLetters.indexOf(letter);
            if (index > -1) {
                tempLetters.splice(index, 1);
                return true;
            }
            return false;
        });
    });

    return possibleWords.length ? possibleWords.join(", ") : "No valid anagram found.";
}

function generateNameBasedAnagram(name) {
    let letters = name.replace(/\s+/g, "").toLowerCase().split("").sort().join("");
    let validNames = nameList.filter(n => {
        let sortedName = n.toLowerCase().split("").sort().join("");
        return sortedName === letters;
    });

    return validNames.length ? validNames.join(", ") : "No valid name anagram found.";
}

function generateAnagrams() {
    let inputName = document.getElementById("nameInput").value.trim();
    if (inputName === "") {
        alert("Please enter a name.");
        return;
    }

    document.getElementById("randomAnagram").innerText = generateCuratedAnagram(inputName);
    document.getElementById("nameBasedAnagram").innerText = generateNameBasedAnagram(inputName);
}

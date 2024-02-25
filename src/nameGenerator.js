import {fullNames} from "./names/fullNames.js";
import {prefixes} from "./names/prefixes.js";
import {suffixes, extraSuffixes} from "./names/suffixes.js";

export function generateNames() {
    return [generateName(), chooseRandom(fullNames), generateName(), generateName()];
}

function generateName() {
    const prefix = chooseRandom(prefixes);
    const suffix = chooseRandom(suffixes);
    const extraSuffix = Math.random() > 0.93 ? chooseRandom(extraSuffixes, false) : "";
    return `${prefix} ${suffix} ${extraSuffix}`;
}

function chooseRandom(list, filter = true) {
    const filteredList = filter ? filterOutPriorNames(list, filter) : list;
    const name = filteredList[Math.floor(Math.random() * filteredList.length)];
    addPriorName(name);
    return name;
}

function filterOutPriorNames(list, resetIfEmpty = true, filter) {
    const priors = getPriorNames();
    const result = list.filter(item => !priors.includes(item));

    if (!result.length && resetIfEmpty) {
        resetPriorNames();
        return list;
    }
    return result;
}

function getPriorNames() {
    return JSON.parse(sessionStorage.getItem("previousNamePartsUsed")) ?? []
}

function addPriorName(name) {
    const priors = getPriorNames();
    sessionStorage.setItem("previousNamePartsUsed", JSON.stringify([name, ...priors]));
}

function resetPriorNames() {
    sessionStorage.setItem("previousNamePartsUsed", JSON.stringify([]));
}

export function updateNames () {
    document.getElementById("content").innerHTML = `<div>${generateNames().join("</div><div>")}</div>`
}

updateNames();

document.getElementById("update").addEventListener("click", updateNames)
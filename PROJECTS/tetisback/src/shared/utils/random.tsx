export function randomBag(): number[] {
const types = [1, 2, 3, 4, 5, 6, 7]
const bag = [...types]
for (let i = bag.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1))
;[bag[i], bag[j]] = [bag[j], bag[i]]
}
return bag
}
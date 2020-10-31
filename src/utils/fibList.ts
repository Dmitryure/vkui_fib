import { recursiveFib } from "./recursiveFib"

export const fibList = (num: number): number[] => {
    let arr = []
    for (let i = 2; i <= num; i++) {
        arr.push(recursiveFib(i))
    }
    console.log(arr)
    return arr
}
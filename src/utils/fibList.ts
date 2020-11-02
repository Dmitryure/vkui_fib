import { recursiveFib } from "./recursiveFib"

export const fibList = (num: number): number[] => {
    let arr = []
    for (let i = 0; i <= num; i++) {
        arr.push(recursiveFib(i))
    }
    return arr
}
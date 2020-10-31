export const recursiveFib = (num: number): number => {
    if(num <= 1) {
        return num
    }
    return recursiveFib(num-1) + recursiveFib(num-2)
}
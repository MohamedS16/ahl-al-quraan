const arabicNums : string[] = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩']

const changeNumbersToArabic: (num : string)=>string = (num)=>{
    const splitNums = num.split('')
    const arabicNumbers : string[] = []
    splitNums.forEach((n : string)=>arabicNumbers.push(arabicNums[+n]))
    return arabicNumbers.join('')
}

export const changeTimeToArabic: (num : string)=>string =(num)=>{
    const splitNums = num.split('')
    const arabicNumbers : string[] = []
    splitNums.forEach((n : string)=>{arabicNumbers.push(arabicNums[+n])})
    arabicNumbers[2] = arabicNumbers[0] + arabicNumbers[1] 
    arabicNumbers[1] = ' : '
    arabicNumbers[0] = arabicNumbers[3] + arabicNumbers[4] 
    return arabicNumbers.slice(0,3).join('')
}

export default changeNumbersToArabic
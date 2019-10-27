//  Question:
//  Pascal's triangle is a triangular array of integers constructed with the following formula:
//  The first row consists of the number 1.
//  For each subsequent row, each element is the sum of the numbers directly above it, on either side.
//  Given an input k, return the kth row of Pascal's triangle.
//  1          1
//  2         1 1
//  3        1 2 1
//  4       1 3 3 1
//  5      1 4 6 4 1
//  - - - - - - - - - - - - - - - - - - -
// https://www.youtube.com/watch?v=REX8OxaVjsU

function generateNextRow(lastRow) {
    let nextRow = [];
    // first element
    nextRow.push(1)
    // middle elements are the sum of the elements in the last row
    for (let i=0; i < lastRow.length - 1; i++) {
        nextRow.push(lastRow[i] + lastRow[i+1]);
    }
    // last element
    nextRow.push(1);
    return nextRow;
}

function pascal(n) {
    // base case
    if (n === 0) {
        return [1];
    }
    // recursive step
    return generateNextRow(pascal(n-1))
}

row  = pascal(4)
console.log(row)

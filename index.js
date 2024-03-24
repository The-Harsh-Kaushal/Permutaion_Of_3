const grid = document.getElementById('dialpad');
const grid_child = grid.querySelectorAll('span');
const InputShow = document.getElementById('InputShow');


function permuteString(str) {
    // Create an array to store permutations
    let permutations = [];

    // Recursive function to generate permutations
    function generatePermutations(current, remaining) {
        // Base case: if there are no more characters to permute
        if (remaining.length === 0) {
            permutations.push(current);
            return;
        }

        // Iterate over each character in the remaining string
        for (let i = 0; i < remaining.length; i++) {
            // Generate the next permutation by appending the current character to the current permutation
            let nextCurrent = current + remaining[i];
            // Generate the remaining string by removing the current character from the remaining string
            let nextRemaining = remaining.slice(0, i) + remaining.slice(i + 1);
            // Recursively generate permutations with the updated current and remaining strings
            generatePermutations(nextCurrent, nextRemaining);
        }
    }


    generatePermutations('', str);


    return permutations;
}

const UpdateInput = (operation) => {
    var helper = InputShow.innerHTML;
    if (operation == "Del") {
        helper = Math.floor(helper / 10);
        InputShow.innerHTML = helper;
    }  else if (operation == "Gen") {
        let quesString = InputShow.innerHTML;
        var permutations = permuteString(quesString);
        
        
        let repeatedDisplay = document.querySelector('.repeated .display');
        repeatedDisplay.innerHTML = '';
        permutations.forEach(permutation => {
            let span = document.createElement('span');
            span.textContent = permutation;
            repeatedDisplay.appendChild(span);
        });

    
        let nonRepeatedDisplay = document.querySelector('.non-repeated .display');
        nonRepeatedDisplay.innerHTML = '';
        let uniquePermutations = [...new Set(permutations)];
        uniquePermutations.forEach(permutation => {
            let span = document.createElement('span');
            span.textContent = permutation;
            nonRepeatedDisplay.appendChild(span);
        });
    } else {
        operation = parseInt(operation);
        helper = helper * 10 + operation;
        if (helper <= 999) {
            InputShow.innerHTML = helper;
        }
    }
}

const GridOnClick = (event)=>{
    const span = event.target;
    span.classList.add('click_animationn');
    const num = span.innerHTML;
    UpdateInput(num);
    
    setTimeout(() => {
        span.classList.remove('click_animationn');
    }, 150);
}
grid_child.forEach((span)=>{
  span.addEventListener("click", GridOnClick);
})


let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#Reset-button");
let heading = document.querySelector("#heading");

// Initial state to start with X or O.
let startWithX = true; // Change to false if you want O to start first.
let turnO = startWithX; // Set turn based on start player.
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Function to check for a winner.
const checkWinner = () => {
    for (let pattern of winPattern) {
        let pv1 = boxes[pattern[0]].innerText;
        let pv2 = boxes[pattern[1]].innerText;
        let pv3 = boxes[pattern[2]].innerText;
        
        if (pv1 !== "" && pv2 !== "" && pv3 !== "") {
            if (pv1 === pv2 && pv2 === pv3) {
                heading.innerText = `Congratulations! Player ${pv1} wins! 🎉`;
                disableAllBoxes();
                return;
            }
        }
    }

    // Check for a draw if all boxes are filled and no winner.
    if (Array.from(boxes).every(box => box.innerText !== "")) {
        heading.innerText = "It's a draw! 🤝";
    }
};

// Function to disable all boxes when the game ends.
const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Event listener for each box.
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) { 
            box.innerText = "O";
            turnO = false; 
        } else {
            box.innerText = "X";
            turnO = true; 
        }
        box.disabled = true; 
        checkWinner();
    });
});

// Reset game when the reset button is clicked.
resetButton.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    // Toggle the starting player for the next game.
    startWithX = !startWithX; // Toggle the value.
    turnO = startWithX; // Set turn based on the new starting player.
    heading.innerText = "Tic-Tac-Toe"; // Reset the heading.
});

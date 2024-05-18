document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('diceCanvas');
    const context = canvas.getContext('2d');
    // Function to draw the dice face
    function drawDice(number) {
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the dice border
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        context.strokeRect(50, 50, 100, 100);

        // Draw the dots based on the dice number
        context.fillStyle = 'black';
        const dotPositions = {
            1: [[100, 100]],
            2: [[75, 75], [125, 125]],
            3: [[75, 75], [100, 100], [125, 125]],
            4: [[75, 75], [75, 125], [125, 75], [125, 125]],
            5: [[75, 75], [75, 125], [125, 75], [125, 125], [100, 100]],
            6: [[75, 75], [75, 100], [75, 125], [125, 75], [125, 100], [125, 125]]
        };

        const drawDot = (x, y) => {
            context.beginPath();
            context.arc(x, y, 7, 0, 2 * Math.PI);
            context.fill();
        };

        dotPositions[number].forEach(pos => drawDot(pos[0], pos[1]));
    }

    // Function to roll the dice
    function rollDice() {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        drawDice(randomNumber);
    }

    // Event listener for space key press
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            rollDice();
        }
    });

    // Initial draw
    drawDice(1);
});

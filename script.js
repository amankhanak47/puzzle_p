// Define the correct answers
const palmTrees = 4;
const rockShape = "diamond";
const distance = 15;

// Get references to the input elements
const palmTreesInput = document.getElementById("palm-trees");
const rockShapeInput = document.getElementById("rock-shape");
const distanceInput = document.getElementById("distance");
const submitButton = document.getElementById("submit");

// Get references to the result elements
const resultDiv = document.getElementById("result");
const messageParagraph = document.getElementById("message");

// Define the dead-ends
const deadEnds = [
	"The treasure is not buried near any body of water.",
	"The treasure is not buried on a slope."
];

// Listen for the submit button click event
submitButton.addEventListener("click", function() {
	// Get the user's guesses
	const userPalmTrees = parseInt(palmTreesInput.value);
	const userRockShape = rockShapeInput.value.toLowerCase();
	const userDistance = parseInt(distanceInput.value);

	// Check if the user's guesses match the correct answers
	if (userPalmTrees === palmTrees && userRockShape === rockShape && userDistance === distance) {
		
		messageParagraph.textContent = "Congratulations! You found the treasure!";
	} else if (deadEnds.includes(userRockShape)) {
		messageParagraph.textContent = "Sorry, you hit a dead-end.";
	} else {
		messageParagraph.textContent = "Sorry, your guess is incorrect.";
	}
});

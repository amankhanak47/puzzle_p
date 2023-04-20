// Define the clues and dead-ends
const clues = [
    "The treasure is buried in a location where there are four palm trees.",
    "The treasure is buried next to a big rock with a peculiar shape.",
    "The treasure is buried at a distance of 15 steps from a broken statue."
  ];
  
  const deadEnds = [
    "The treasure is not buried near any body of water.",
    "The treasure is not buried on a slope."
  ];
  
  // Define a function to check if a given location matches the clues
  function checkLocation(location) {
    // Check if the location has four palm trees
    if (!location.includes("four palm trees")) {
      return false;
    }
  
    // Check if the location has a big rock with a peculiar shape
    if (!location.includes("big rock") || !location.includes("peculiar shape")) {
      return false;
    }
  
    // Check if the location is at a distance of 15 steps from a broken statue
    if (!location.includes("15 steps") || !location.includes("broken statue")) {
      return false;
    }
  
    // The location matches all the clues, so it must be the location of the treasure
    return true;
  }
  
  // Define a function to generate a random location
  function generateLocation() {
    const locations = [
      "In the park near the playground, there are four palm trees.",
      "On the beach, there is a big rock with a peculiar shape.",
      "In the museum courtyard, there is a broken statue about 15 steps from the fountain.",
      "In the forest, there is a clearing with four palm trees and a big rock.",
      "In the city square, there is a statue of a famous person about 15 steps from the fountain."
    ];
  
    // Choose a random location from the list
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  
    return randomLocation;
  }
  
  // Define a function to play the game
  function playGame() {
    // Generate a random location for the treasure
    const treasureLocation = generateLocation();
  
    // Print the clues and dead-ends
    console.log("Clues:");
    clues.forEach((clue) => console.log("- " + clue));
    console.log("\nDead-Ends:");
    deadEnds.forEach((deadEnd) => console.log("- " + deadEnd));
  
    // Prompt the player to guess the location of the treasure
    const guess = prompt("Guess the location of the treasure:");
  
    // Check if the guess matches the clues
    if (checkLocation(guess)) {
      console.log("Congratulations! You found the treasure!");
    } else {
      console.log("Sorry, your guess is incorrect. The treasure is located at:");
      console.log(treasureLocation);
    }
  }
  
  // Call the playGame function to start the game
  playGame();
  
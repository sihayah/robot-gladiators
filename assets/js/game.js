// Global variables
var playerName = window.prompt("Name your robot fighter:");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 5;


var enemyNames = ["Two Chains", "Robo-espierre", "Java the Barbarian"];
var enemyHealth = 10;
var enemyAttack = 6;

// wrap game logic in startGame()
// when playr is defeated or there are no more enemies, call an endGame () that:
//    * Alerts the player's total stats
//    * Asks the player if they want to play again
//    * If yes, call startGame() to restart game
// after the player skips or defeats an enemy (and thera are still more robots to fight):
//    * Ask the player if they want to "shop"
//    * If no, continue as normal
//    * If yes, call the shop()
//    * In the shop(), ask player if they want to "refill" health, "upgrade" attach, or "leave" shop
//    * If refill, subtract money points from plaer and increa attack power
//    * If upgrade, subtract money points and upgrade health
//    * If leave, alert goodbye and exit the function
//    * If any other invalid option, call shop() again




// fight function
var fight = function(enemyName) {
  while(playerHealth > 0 && enemyHealth > 0){
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
      
      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney);
        break;
      }
    }

    // remove enemy's health by subtracting the amout set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;
    console.log(
      playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
    );

    // check if user wants to visit shop

    // check enemy's health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");

      // award player money for winning
      playerMoney = playerMoney + 20;

      // leave while() loop since enemy is dead
        break;
        } else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
          }
    
      // remove players's health by subtracting the amount set in the enemyAttack variable
      playerHealth = playerHealth - enemyAttack;
      console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
      );

      // check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
        break;
      } else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
      };


    } 
  };

// fuction to start game
var startGame = function() {
  // reset player stats
  playerHealth= 100;
  playerAttack= 10;
  playerMoney= 10;
  // loop enemy fight sequences
  for(var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
      window.alert("Get ready to RUUUUUUUMMBLE! Round " + (i+1) );
      var pickedEnemyName = enemyNames[i];
      enemyHealth = 50;
      fight(pickedEnemyName);
    }
    else { 
      window.alert("You're dead, baby. GAME OVER");
      break;
    }
  }  
  // after loop ends, player is either out of health or enemies to fight, so run th endGame func
endGame();

};

// function to end entire game
var endGame = function() {
  // if player is still alive, player wins!
  if(playerHealth > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
  }
  else {
    window.alert("You've lost ur robot in battle.");
  }
  // ask user if they wish to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart game
    startGame();
  }
  else {
    window.alert("Thank you for playing. Hasta la vista.");
  }
};

// start the game when the page loads
startGame();
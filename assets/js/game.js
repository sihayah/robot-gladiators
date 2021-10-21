// Global variables
var playerName = window.prompt("Name your robot fighter:");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 5;


var enemyNames = ["Two Chains", "Robo-espierre", "Java the Barbarian"];
var enemyHealth = 10;
var enemyAttack = 6;
// function to generate random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1)) + min;
  return value;
};

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
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney", playerMoney);
        break;
      }
    }
    var damage =randomNumber(playerAttack - 3, playerAttack)
    
    enemyHealth = Math.max(0, enemyHealth - damage);
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
    
      var damage = randomNumber(enemyAttack - 3, enemyAttack);
      playerHealth = Math.max(0, playerHealth - damage);
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
      enemyHealth = randomNumber(40, 60);
      fight(pickedEnemyName);
        if (playerHealth> 0 && i < enemyNames.length - 1) {
    //  ask user if they want to visit store before next round
        var storeConfirm = window.confirm("The fight is over. Would you like to visit the shop before the next round?");
      // if yes, take them to the store()
      if (storeConfirm) {
        shop();
      }
    }
    else { 
      window.alert("GAME OVER");
      break;
    }  
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
    window.alert("HASTA LA VISTA");
  }
};

// Shop
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL you health, UPGRADE your attack, or LEAVE the shop? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );
  switch (shopOptionPrompt) {
    case "refill":
    case "REFILL":
      if (playerMoney >= 7) {
      
        window.alert("Refilling player's health by 20 for 7 dollars.");

        // increase Health and decrease Money
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("U ain't got the $$$.");
      }

        break;
    case "upgrade":
    case "UPGRADE":
      if (playerMoney >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");

        // increase attach and decrease money
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("U ain't got the $$$.");
      }

        break;
    case "leave":
    case "LEAVE":
      window.alert("Leaving the store.");

      // do nothing, so function will end
      break;
      default: 
      window.alert("You did not pick a valid option. Try again.");
    // call shop() again to force player to pick a valid option
    shop();
    break;
    }
};

// start the game when the page loads
startGame();
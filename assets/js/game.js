// Global variables

// function to generate random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1)) + min;
  return value;
};

var getPlayerName = function() {
  var name = "";
  while (name === "" || name === null){
    name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money += 7;
    }
    else {
      window.alert("U ain't got the $$$.");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money += 7;
    }
    else {
      window.alert("U ain't got the $$$");
    }
  }
};

var enemyInfo = [
  
{
  name: "Two Chains",
  attack: randomNumber(10, 14)
},
{
  name: "robo-espierre",
  attack: randomNumber(10, 14)
},
{
  name: "Java the Barbarian",
  attack: randomNumber(10,14)
}
];

// fight or skip function
var fightOrSkip = function() {
  // ask player if they'd like to fight or skip using fightOrSkip func
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  //if promptFight is not a valid value...
  if (!promptFight) {
    window.alert("U need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  // if player picks "skip" confirm and then stop loop
  promptFight = promptFight.toLowerCase();
  if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from the playerMoney for skipping
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      return true;
    }
    else {
      return false;
    }
  }
}

 
  var fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;
  
    // randomly change turn order
    if (Math.random() > 0.5) {
      isPlayerTurn = false;
    }
  
    while (playerInfo.health > 0 && enemy.health > 0) {
      if (isPlayerTurn) {
        // ask player if they'd like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
          // if true, leave fight by breaking loop
          break;
        }
  
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
  
        // remove enemy's health by subtracting the amount we set in the damage variable
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
          playerInfo.name +
            " attacked " +
            enemy.name +
            ". " +
            enemy.name +
            " now has " +
            enemy.health +
            " health remaining."
        );
  
        // check enemy's health
        if (enemy.health <= 0) {
          window.alert(enemy.name + " has died!");
  
          // award player money for winning
          playerInfo.money = playerInfo.money + 20;
  
          // leave while() loop since enemy is dead
          break;
        } else {
          window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        // player gets attacked first
      } else {
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
  
        // remove player's health by subtracting the amount we set in the damage variable
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
          enemy.name +
            " attacked " +
            playerInfo.name +
            ". " +
            playerInfo.name +
            " now has " +
            playerInfo.health +
            " health remaining."
        );
  
        // check player's health
        if (playerInfo.health <= 0) {
          window.alert(playerInfo.name + " has died!");
          // leave while() loop if player is dead
          break;
        } else {
          window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
      }
      // switch turn order for next round
      isPlayerTurn = !isPlayerTurn;
    }
  };

// fuction to start game
var startGame = function() {
  // reset player stats
  playerInfo.reset();
  // loop enemy fight sequences
  for(var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert("Get ready to RUUUUUUUMMBLE! Round " + (i+1) );
      var pickedEnemyObj = enemyInfo[i];
      pickedEnemyObj.health = randomNumber(40, 60);
      fight(pickedEnemyObj);
        if (playerInfo.health> 0 && i < enemyInfo.length - 1) {
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
  var highScore = localStorage.getItem('highscore');
  highScore = highScore || 0;
  if (playerInfo.money > highScore) {
    localStorage.setItem("highscore", playerInfo.money);
    localStorage.setItem("name", playerInfo.name);

    alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
  }
  else {
    alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
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
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );
  shopOptionPrompt = parseInt(shopOptionPrompt);
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
        break;
    case 3:
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
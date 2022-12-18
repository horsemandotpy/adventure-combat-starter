const { Character } = require("./character");

class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }

  setCoolDown(time) {
    this.cooldown = time;
  }

  randomMove() {
    // Fill this in
    // Set exits array to this.currentRoom.exits obj
    // Create a random number each time function is call
    // Take out random room in exits array
    // Set this.currentRoom to random above
    const exits = Object.values(this.currentRoom.exits);
    const randomNumber = Math.floor(Math.random() * exits.length);
    const randomRoom = exits[randomNumber];

    this.currentRoom = randomRoom;
    this.setCoolDown(3000);
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    // Fill this in
    // If attackTarget is not null
    // attackTarget applyDamage to 10
    // Print information about the attack
    // Reset cooldown to 3000
    if (this.attackTarget) {
      this.attackTarget.applyDamage(10);
      console.log(
        `You have been attacked by ${this.name}. Your health is now ${this.attackTarget.health}.`
      );
    }
    this.setCoolDown(3000);
  }

  applyDamage(amount) {
    // Fill this in
    super.applyDamage(amount);
    if(this.attackTarget)  {
      this.attack();
    }
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
    this.setCoolDown(3000);
  }

  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);
  }
}

module.exports = {
  Enemy,
};

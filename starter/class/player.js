const { Character } = require("./character");
const { Enemy } = require("./enemy");
const { Food } = require("./food");
const { newArrayWithoutItem } = require("./utilities-array");

class Player extends Character {
  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
    this.currentRoom = startingRoom;
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    // Fill this in
    // Find item in room items array
    // If has item push item into inventory
    // Else print there is no such item

    let itemTaken = this.currentRoom.getItemByName(itemName);

    if (itemTaken) {
      this.items.push(itemTaken);
      this.currentRoom.items = newArrayWithoutItem(
        this.currentRoom.items,
        itemTaken
      );
    } else {
      console.log(`Can't take that item`);
    }
  }

  dropItem(itemName) {
    // Fill this in
    // Find the item
    // If have the Item
    // Push it into currentRoom
    // Remove it from inventory
    let itemDrop = this.getItemByName(itemName);

    if (itemDrop) {
      this.currentRoom.items.push(itemDrop);
      this.items = newArrayWithoutItem(this.items, itemDrop);
    } else {
      console.log(`Can't drop that item`);
    }
  }

  eatItem(itemName) {
    // Fill this in
    let foodItem = this.getItemByName(itemName);
    if (foodItem instanceof Food) {
      this.items = newArrayWithoutItem(this.items, foodItem);
    } else {
      console.log(`You can't eat that!`)
    }
  }

  getItemByName(name) {
    // Fill this in
    // findItemByName with js find
    return this.items.find((item) => item.name === name);
  }

  hit(name) {
    // Get enemy name from the currentRoom
    let enemyTarget = this.currentRoom.getEnemyByName(name);

    // Fill this in
    // If enemy in the room
    // Hit them with 10 damage
    // Alert the action and enemy status
    // Set enemy attack target to this
    // Enemy attack player
    // Else
    // Print you cannot attack

    if (enemyTarget) {
      enemyTarget.applyDamage(10);
      console.log(
        `You have hit ${enemyTarget.name}. ${enemyTarget.name}'s health is now ${enemyTarget.health}.`
      );
      enemyTarget.attackTarget = this;
    } else {
      console.log(`You can't hit ${name}.`);
    }
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }
}

module.exports = {
  Player,
};

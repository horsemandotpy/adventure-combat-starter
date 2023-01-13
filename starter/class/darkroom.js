/*
Create a DarkRoom that inherits from Room and a Light that inherits from Item.
Dark rooms show only a description of "You cannot see anything" unless a light is in the room or being held.
*/
const { Room } = require("./room");
const { Light } = require("./light");
const { Player } = require("./player");


class DarkRoom extends Room {
    constructor(name, description) {
        super(name, description);
    }

    printRoom() {
        console.clear();
        console.log("");
        console.log(this.name);
        console.log("");

        let result = Player.checkForLight();

        if(result) {
            console.log("There is a light in this room")
            console.log("");
            console.log(this.description);
            console.log("");
            if (this.getEnemies().length > 0) {
              console.log(
                `Enemies: ${this.getEnemies()
                  .map((enemy) => enemy.name)
                  .join(", ")}`
              );
            }
            if (this.items.length > 0) {
              console.log(`Items: ${this.items.map((item) => item.name).join(", ")}`);
            }
        } else {
            console.log("You cannot see anything");
            console.log("");
        }

        console.log(this.getExitsString());
        console.log("");

    }
}

module.exports = {
    DarkRoom,
  };

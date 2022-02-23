import GameMessage from "../states/GameMessage.js"
import {
	CANVAS_WIDTH,
	context,
	images,
	keys,
	sounds,
	stateStack,
	timer,
} from "../globals.js";
export default class BattleHelper {
	constructor() {
        this.damage=0;
    }
   static checkstate(player,monster)
    {
        if(player.attack<=monster.defense)
        {
            stateStack.push(new GameMessage("Your attack is lower or equal to monster's defense value, you dead", 0));
            player.alive=false;
            return;
        }
        else if(monster.attack>player.defense)
        {
            this.damage=monster.attack-player.defense;
            player.health-=this.damage;
            if(player.health<=0)
            {
                stateStack.push(new GameMessage("Your health is lower or equal to 0, you dead", 0));
                player.alive=false;
                return;
            }
            else
            {
                stateStack.push(new GameMessage(`You earned ${monster.gold} golds!`, 0.25));
                monster.alive=false;
                player.gold+=monster.gold;
                this.damage=0;
                return;
            }

        }
        else
        {
                stateStack.push(new GameMessage(`You earned ${monster.gold} golds!`, 0.25));
                monster.alive=false;
                player.gold+=monster.gold;
                this.damage=0;
                return;
            
        }

    }
}
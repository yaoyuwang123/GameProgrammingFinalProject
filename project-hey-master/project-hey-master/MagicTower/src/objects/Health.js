import Tile from "../services/Tile.js";
import GameObject from "./GameObject.js";
import ImageName from "../enums/ImageName.js";
import Type from "../enums/type.js";
import Sprite from "../../lib/Sprite.js";
import {
	CANVAS_WIDTH,
	context,
	images,
	keys,
	sounds,
	stateStack,
	timer,
} from "../globals.js";
import GameMessage from "../states/GameMessage.js"

export default class Health extends GameObject {
    static WIDTH = Tile.SIZE;
    static HEIGHT = Tile.SIZE;

    /**
     * A toggle that the player can hit to open the dungeon doors.
     *
     * @param {Vector} dimensions
     * @param {Vector} position
     */
    constructor(objectDefinition = {}, type) {
        super(objectDefinition);
        this.Type = type;

        this.Collision = false;
        this.isConsumable = true;


        this.sprites = Health.generateSprites(this.Type);
        this.currentFrame = 0;
        //this.animation = new Animation([1, 2, 3,4], 0.1);

    }
    collidwithplayer(player) {
        if (this.Type == "blue"&&!this.wasConsumed) {
            player.health+=200;
            stateStack.push(new GameMessage("Player Health +200", 0.5));
        }
        else if (this.Type == "red"&&!this.wasConsumed) {
            player.health+=100;
            stateStack.push(new GameMessage("Player Health +100", 0.5));
        }
        this.wasConsumed=true;
    }
    update(dt) {
        super.update(dt);
    }

    render() {
        const x = Math.floor(this.canvasPosition.x);
        const y = Math.floor(this.canvasPosition.y - this.dimensions.y / 2);

        super.render(x, y);
    }
    static generateSprites(type) {
        const sprites = [];
        let x;
        let y=1;
        if (type == "blue") {
            x=1;
        }
        else if (type == "red") {
            x=0
        }
        sprites.push(new Sprite(
            images.get(ImageName.Items),
            x * Health.WIDTH,
            y * Health.HEIGHT,
            Health.WIDTH,
            Health.HEIGHT
        ));

        return sprites;
    }
}
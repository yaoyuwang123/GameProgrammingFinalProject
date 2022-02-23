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

export default class Sword extends GameObject {
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


        this.sprites = Sword.generateSprites();
        this.currentFrame = 0;
        //this.animation = new Animation([1, 2, 3,4], 0.1);

    }
    collidwithplayer(player) {
        if (!this.wasConsumed) {
            player.attack += 50;
            this.wasConsumed = true;
            stateStack.push(new GameMessage("Player Attack +50", 0.5));
        }
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
        sprites.push(new Sprite(
            images.get(ImageName.Items),
            0 * Sword.WIDTH,
            13 * Sword.HEIGHT,
            Sword.WIDTH,
            Sword.HEIGHT
        ));

        return sprites;
    }
}
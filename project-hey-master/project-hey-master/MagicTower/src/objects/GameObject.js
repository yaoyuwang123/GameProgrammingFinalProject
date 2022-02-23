
import { getCollisionDirection } from "../../lib/CollisionHelpers.js";
import Hitbox from "../../lib/Hitbox.js";
import Direction from "../enums/Direction.js";
import { context, DEBUG } from "../globals.js";
import Tile from "../services/Tile.js";
import Vector from "../../lib/Vector.js";
import Door from "./Door.js";

export default class GameObject {
	static WIDTH = 32;
	static HEIGHT = 32;
	/**
	 * The base class to be extended by all game objects in the game.
	 *
	 * @param {Vector} dimensions The height and width of the game object.
	 * @param {Vector} position The x and y coordinates of the game object.
	 */
	constructor(objectDefinition = {}) {
		this.position = objectDefinition.position ?? new Vector();
		this.canvasPosition = new Vector(Math.floor(this.position.x * Tile.SIZE), Math.floor(this.position.y * Tile.SIZE));
		this.dimensions = objectDefinition.dimensions ?? new Vector();
		this.sprites = [];
		this.currentFrame = 0;
		this.cleanUp = false;

		
		this.Collision = false;

		// If the game object should disappear when collided with.
		this.isConsumable = false;


		// If the game object was consumed already.
		this.wasConsumed = false;
	}

	update(dt) { 
		if(this.wasConsumed)
		{
			this.cleanUp=true;
		}

	}

	render(x, y) {
		if(!this.cleanUp)
		{
			
			this.sprites[this.currentFrame].render(x, y);
			
		}
	}

	onConsume(consumer) {
		this.wasConsumed = true;
	}

	

	

}
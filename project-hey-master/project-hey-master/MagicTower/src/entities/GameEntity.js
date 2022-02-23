import Direction from "../enums/Direction.js";
import Tile from "../services/Tile.js";
import Vector from "../../lib/Vector.js";
import Player from "./Player.js";
import Menu from "../services/Menu.js";
import GameMessage from "../states/GameMessage.js";
export default class GameEntity {
	static WIDTH = 32;
	static HEIGHT = 32;

	/**
	 * The base class to be extended by all entities in the game.
	 * Right now we just have one Player character, but this could
	 * be extended to implement NPCs (Non Player Characters) as well.
	 *
	 * @param {object} entityDefinition
	 */
	constructor(entityDefinition = {}) {
		this.position = entityDefinition.position ?? new Vector();
		this.canvasPosition = new Vector(Math.floor(this.position.x * Tile.SIZE), Math.floor(this.position.y * Tile.SIZE));
		this.dimensions = entityDefinition.dimensions ?? new Vector();
		this.direction = entityDefinition.direction ?? Direction.Down;
		this.alive = true;
		this.stateMachine = null;
		this.currentFrame = 0;
		this.sprites = [];
	}
	

	/**
	 * At this time, stateMachine will be null for Pokemon.
	 */
	update(dt) {
		if (this.alive) {
			if (this instanceof Player) {
				this.stateMachine?.update(dt);
				
				
			}
			else {
				this.update(dt);
			}
		}

	}

	render(x, y) {
		if (this.alive) {
			this.stateMachine?.render();

			this.sprites[this.currentFrame].render(x, y);
		}

	}

	changeState(state, params) {
		this.stateMachine?.change(state, params);
	}
}
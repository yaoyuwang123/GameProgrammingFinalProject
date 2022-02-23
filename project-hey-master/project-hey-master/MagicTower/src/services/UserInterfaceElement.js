import Vector from "../../lib/Vector.js";
import Tile from "../services/Tile.js";

export default class UserInterfaceElement {
	static FONT_SIZE = Tile.SIZE * 0.65;
	static FONT_FAMILY = '20px Zelda';

	/**
	 * The base UI element that all interface elements should extend.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 */
	constructor(x, y, width, height) {
		this.position = new Vector(x * Tile.SIZE, y * Tile.SIZE);
		this.dimensions = new Vector(width * Tile.SIZE, height * Tile.SIZE);
		this.healthdimension=new Vector(width * Tile.SIZE, height * Tile.SIZE);
		this.enemy=new Vector(width * Tile.SIZE, height * Tile.SIZE);
		this.ex=new Vector(0 * Tile.SIZE, height * Tile.SIZE);
	}
}

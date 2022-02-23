import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import Direction from "../../enums/Direction.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import { keys } from "../../globals.js";

export default class PlayerIdlingState extends State {
	/**
	 * In this state, the player is stationary unless
	 * a directional key or the spacebar is pressed.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;
		this.animation = {
			[Direction.Up]: new Animation([12], 1),
			[Direction.Down]: new Animation([0], 1),
			[Direction.Left]: new Animation([4], 1),
			[Direction.Right]: new Animation([8], 1),
		};
	}

	enter() {
		this.player.currentAnimation = this.animation[this.player.direction];
	}

	update() {
		if(this.player.move)
		{
			if (keys.s) {
				this.player.direction = Direction.Down;
				this.player.changeState(PlayerStateName.Walking);
			}
			else if (keys.d) {
				this.player.direction = Direction.Right;
				this.player.changeState(PlayerStateName.Walking);
			}
			else if (keys.w) {
				this.player.direction = Direction.Up;
				this.player.changeState(PlayerStateName.Walking);
			}
			else if (keys.a) {
				this.player.direction = Direction.Left;
				this.player.changeState(PlayerStateName.Walking);
			}
		}
		
	}
}
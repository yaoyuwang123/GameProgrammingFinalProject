import Animation from "../../../lib/Animation.js";
import { didSucceedPercentChance } from "../../../lib/RandomNumberHelpers.js";
import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import Direction from "../../enums/Direction.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import SoundName from "../../enums/SoundName.js";
import { keys, sounds, stateStack, timer } from "../../globals.js";
import Door from "../../objects/Door.js";
import Key from "../../objects/Key.js";
import Tile from "../../services/Tile.js";
import BattleHelper from "../../services/BattleHelper.js";
import Menu from "../../services/Menu.js";
import GameMessage from "../GameMessage.js";

export default class PlayerWalkingState extends State {
	static ENCOUNTER_CHANCE = 0.1;


	/**
	 * In this state, the player can move around using the
	 * directional keys. From here, the player can go idle
	 * if no keys are being pressed. The player can also swing
	 * their sword if they press the spacebar.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;
		this.Shopx = 10;
		this.Shopy = 5;
		this.bottomLayer = this.player.map.bottomLayer;
		this.collisionLayer = this.player.map.collisionLayer;
		this.objects = this.player.map.objects;
		this.monsters = this.player.map.monsters;
		this.ifreturn = false;
		this.animation = {
			[Direction.Up]: new Animation([12, 13, 14, 15], 0.2),
			[Direction.Down]: new Animation([0, 1, 2, 3], 0.2),
			[Direction.Left]: new Animation([4, 5, 6, 7], 0.2),
			[Direction.Right]: new Animation([8, 9, 10, 11], 0.2),
		};

		this.isMoving = false;
	}


	update(dt) {
		
		if(this.player.move)
		{
			this.player.currentAnimation = this.animation[this.player.direction];
			this.handleMovement();
		}
		else
		{
			this.player.changeState(PlayerStateName.Idling);
		}
		
	}


	handleMovement() {
		/**
		 * Unlike Zelda, the Player's movement in Pokemon is locked to
		 * the grid. To restrict them from moving freely, we set a flag
		 * to track if they're currently moving from one tile to another,
		 * and reject input if so.
		 */
		if (this.isMoving) {
			return;
		}

		if (!keys.w && !keys.a && !keys.s && !keys.d) {
			this.player.changeState(PlayerStateName.Idling);
			return;
		}
       if(this.player.move)
	   {
		this.updateDirection();
		
		this.move();
	   }
	   else
	   {
		this.player.changeState(PlayerStateName.Idling);
	   }
	   
		
		
		
	}

	updateDirection() {
		if (keys.s) {
			this.player.direction = Direction.Down;
		}
		else if (keys.d) {
			this.player.direction = Direction.Right;
		}
		else if (keys.w) {
			this.player.direction = Direction.Up;
		}
		else if (keys.a) {
			this.player.direction = Direction.Left;
		}
	}

	move() {
		let x = this.player.position.x;
		let y = this.player.position.y;

		if (this.player.direction === Direction.Up) {
			y--;
		}
		else if (this.player.direction === Direction.Down) {
			y++;
		}
		else if (this.player.direction === Direction.Left) {
			x--;
		}
		else if (this.player.direction === Direction.Right) {
			x++;
		}

		if (!this.isValidMove(x, y)) {
			sounds.play(SoundName.SelectionMove);
			if (x == this.Shopx && y == this.Shopy) {
				this.player.ifshoprender = true;
				this.player.move=false;
			}
			return;
		}


		this.objects.forEach((object) => {

			if (object.position.x == x && object.position.y == y) {
				if (object.Collision == true && !object.cleanUp) {
					if (object instanceof Door) {
						if (this.detectdoor(object)) {
							object.isConsumable = true;

						}
						else {
							this.ifreturn = true;
						}

					}
					else {
						this.ifreturn = true;

					}


				}
				else if (!object.cleanUp) {
					this.detectitems(object);
				}
			}

		});
		this.monsters.forEach((monster) => {

			if (monster.position.x == x && monster.position.y == y && monster.alive) {
				BattleHelper.checkstate(this.player, monster)

			}

		});
		if (this.ifreturn) {
			this.ifreturn = false;
			return;
		}

		this.player.position.x = x;
		this.player.position.y = y;

		this.tweenMovement(x, y);
	}
	detectdoor(object) {
		if (object.Type == "yellow" && this.player.yellowkey >= 1) {
			this.player.yellowkey--;
			return true;

		}
		else if (object.Type == "blue" && this.player.bluekey >= 1) {
			this.player.bluekey--;
			return true;
		}
		else if (object.Type == "red" && this.player.redkey >= 1) {
			this.player.redkey--;
			return true;
		}
		return false;

	}
	detectitems(object) {
		object.collidwithplayer(this.player);

	}

	tweenMovement(x, y) {
		if(this.player.move)
		{
			this.isMoving = true;

		timer.tween(
			this.player.canvasPosition,
			['x', 'y'],
			[x * Tile.SIZE, y * Tile.SIZE],
			0.25,
			() => {
				this.isMoving = false;

				this.updateDirection();


			}
		);
		}
		
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns Whether the player is going to move on to a non-collidable tile.
	 */
	isValidMove(x, y) {
		return this.collisionLayer.getTile(x, y) === null;
	}

}
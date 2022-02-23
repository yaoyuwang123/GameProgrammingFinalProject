
import GameEntity from "./GameEntity.js";
import { keys, sounds, stateStack, timer,images,context } from "../globals.js";
import StateMachine from "../../lib/StateMachine.js";
import PlayerWalkingState from "../states/player/PlayerWalkingState.js";
import PlayerIdlingState from "../states/player/PlayerIdlingState.js";
import PlayerStateName from "../enums/PlayerStateName.js";
import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import { pickRandomElement } from "../../lib/RandomNumberHelpers.js";
import Map from "../services/Map.js";
import ImageName from "../enums/ImageName.js";
import Menu from "../services/Menu.js";
import GameMessage from "../states/GameMessage.js";
export default class Player extends GameEntity {
	static Defult_Health=100;
	static Defult_Attack = 10;
	static Defult_Defense = 10;
	static Defult_YellowKey=0;
	static Defult_BlueKey=0;
	static Defult_RedKey=0;
	static Defult_Gold=0;
	/**
	 * The character that the player controls in the map.
	 * Has a party of Pokemon they can use to battle other Pokemon.
	 *
	 * @param {object} entityDefinition
	 * @param {Map} map
	 */
	constructor(entityDefinition = {}, map) {
		super(entityDefinition);

		this.map = map;
		this.dimensions = new Vector(GameEntity.WIDTH, GameEntity.HEIGHT);
		this.health=Player.Defult_Health;
		this.attack=Player.Defult_Attack;
		this.defense=Player.Defult_Defense;
		this.yellowkey=Player.Defult_YellowKey;
		this.bluekey=Player.Defult_BlueKey;
		this.redkey=Player.Defult_RedKey;
		this.gold=Player.Defult_Gold;
		this.move=true;
		this.stateMachine = this.initializeStateMachine();
		this.sprites = this.initializeSprites()
		this.ifshoprender=false;
		this.currentAnimation = this.stateMachine.currentState.animation[this.direction];
		
		const items = [
			{ text:"25 Golds  =  >   100  Health", onSelect: () => this.HShop() },
			{ text:"25 Golds  =  >   10 Attack", onSelect: () => this.AShop() },
			{ text:"25 Golds  =  >   10 Defense", onSelect: () => this.DShop() },
			{ text:"Exit", onSelect: () => this.Ex() },
			
		];
		
		this.Menu = new Menu(
			6,
			8,
			13,
			3,
			items,
		);

	}
	HShop()
	{
		if(this.gold>=25)
		{
			this.gold-=25;
			stateStack.push(new GameMessage(`Health:${this.health}=>${this.health+=100}!`, 0));
		}
		else
		{
			stateStack.push(new GameMessage("You don't have enough golds", 0));
		}

	}
	AShop()
	{
		if(this.gold>=25)
		{
			this.gold-=25;
			stateStack.push(new GameMessage(`Attack:${this.attack}=>${this.attack+=10}!`, 0));
		}
		else
		{
			stateStack.push(new GameMessage("You don't have enough golds", 0));
		}
	}
	DShop()
	{
		if(this.gold>=25)
		{
			this.gold-=25;
			stateStack.push(new GameMessage(`Defense:${this.defense}=>${this.defense+=10}!`, 0));
		}
		else
		{
			stateStack.push(new GameMessage("You don't have enough golds", 0));
		}
	}
	Ex()
	{
		this.move=true;
		this.ifshoprender=false;
	}
	
	update(dt) {
		super.update(dt);
		this.currentAnimation.update(dt);
		if(this.ifshoprender)
		{
			this.Menu.update(dt);
		}
		this.currentFrame = this.currentAnimation.getCurrentFrame();
	}

	render() {
		const x = Math.floor(this.canvasPosition.x);
		if(this.ifshoprender)
		{
			this.Menu.render();
		}
		/**
		 * Offset the Y coordinate to provide a more "accurate" visual.
		 * To see the difference, remove the offset and bump into something
		 * either above or below the character and you'll see why this is here.
		 */
		const y = Math.floor(this.canvasPosition.y - this.dimensions.y / 2);

		super.render(x, y);
	}

	initializeStateMachine() {
		const stateMachine = new StateMachine();

		stateMachine.add(PlayerStateName.Walking, new PlayerWalkingState(this));
		stateMachine.add(PlayerStateName.Idling, new PlayerIdlingState(this));

		stateMachine.change(PlayerStateName.Idling);

		return stateMachine;
	}

	initializeSprites() {
		return Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Player),
			GameEntity.WIDTH,
			GameEntity.HEIGHT,
		);
	}
}

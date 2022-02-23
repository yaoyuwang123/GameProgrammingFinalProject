import Menu from "../services/Menu.js";
import State from "../../lib/State.js";
import Colour from "../enums/Color.js"
import ImageName from "../enums/ImageName.js";
import SoundName from "../enums/SoundName.js";
import Panel from "../services/Panel.js";
import PlayState from "./PlayState.js";
import MessageState from "./MessageState.js";
import TransitionState from "./TransitionState.js";
import {
	CANVAS_WIDTH,
	context,
	images,
	keys,
	sounds,
	stateStack,
	timer,
} from "../globals.js";

export default class TitleScreenState extends State {
	static MENU_OPTIONS = {
		
		Instruction: "Instruction",
		Play: "Play",
	}
	/**
	 * Consists of some text fields and a carousel of
	 * sprites that are displayed on the screen. There
	 * is then a fading transition to the next screen.
	 *
	 * @param {object} mapDefinition
	 */
	constructor(mapDefinition) {
		super();
		this.copy=mapDefinition;
		this.playState = new PlayState(mapDefinition);
		const items = [
			{ text:"Instruction", onSelect: () => this.status() },
			{ text:"Play", onSelect: () => this.play() },
			
		];

		this.Menu = new Menu(
			6,
			6,
			9,
			3,
			items,
		);
	}

	enter() {
		sounds.play(SoundName.Win);
	}

	update() {
		this.Menu.update();
	}

	render() {
		
		context.save();
		this.renderText();
		context.restore();
	}

	renderText() {
		images.render(ImageName.Background, 0, 0, 640, 640);
		context.font = '60px Zelda';
		context.fillStyle = 'red';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('Magic Tower', 640 / 2, 640 / 2-200);
		context.font = '20px Zelda';
		context.fillStyle = 'black';
		this.Menu.render();
	}
	status()
	{
		stateStack.push(new MessageState("Magic Tower is a top-down tower game where the player use w,a,s,d keys to move up,left,down,and right. The player controls the warrior to fight with monsters in order to save the Princess.                                                                                          Player begins at the 1st floor of tower. Use w,a,s,d on keyboard to move up,left,down and right. The Player and Monster has property attack and defense. Once player collid with the monster they will fight with each other. If player's attack value is higher than monster's denfese value, the player will win the battle and player's life value will be cost by calculating (Monster's attack value-Player's defense value) if Player's defense value is less than Monster's attack value. Once Player's life is less or equal to 0 game will over. The Player gets golds by defeating Monters and could use them to increase attack and defense values by shopping on the store. The store is located in the 2nd floor. There are two kinds of items on the floor for the Player to pick. Keys can be used to open the door and Wind could be used to drink to increase the Player's life values. If the Player defeat the final boss located in the 3rd floor, the Player win the game. ", 0));
	}


	play() {
		context.font = '10px PowerRed';
		TransitionState.fade(() => {
			sounds.stop(SoundName.Win);
			stateStack.pop();
			stateStack.push(this.playState);
			
		});
	}
}


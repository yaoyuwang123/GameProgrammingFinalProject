import State from "../../lib/State.js";
import SoundName from "../enums/SoundName.js";
import Colour from "../enums/Color.js"
import ImageName from "../enums/ImageName.js";
import Menu from "../services/Menu.js";
import {
	CANVAS_WIDTH,
	context,
	images,
	keys,
	sounds,
	stateStack,
	timer,
} from "../globals.js";
import PlayState from "./PlayState.js";
import TitleScreenState from "./TitleScreenState.js";
import TransitionState from "./TransitionState.js";

export default class GameOverState extends State {
	/**
	 * Displays a game over screen where the player
	 * can press enter to go back to the title screen.
	 */
	
	constructor(mapDefinition) {
		super();
	    this.map=mapDefinition;
		const items = [
			{ text: "Back to the main menu", onSelect: () => this.back() },
			{ text: "Play again", onSelect: () => this.play() },

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
		//sounds.stop(SoundName.Music);
		sounds.play(SoundName.Over);
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
		context.fillText('Game Over', 640 / 2, 640 / 2-200);
		context.font = '20px Zelda';
		context.fillStyle = 'black';
		this.Menu.render();
	}

	back() {
		TransitionState.fade(() => {
			//sounds.stop(SoundName.Title);
			sounds.stop(SoundName.Over);
			stateStack.pop();
			stateStack.push(new TitleScreenState(this.map));
			
		});
	}
	play() {
		TransitionState.fade(() => {
			//sounds.stop(SoundName.Title);
			sounds.stop(SoundName.Over);
			stateStack.pop();
			stateStack.push(new PlayState(this.map));
			
		});

	}

}

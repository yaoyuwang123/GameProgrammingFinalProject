import Game from "../lib/Game.js";
//import TitleScreenState from "./states/game/TitleScreenState.js";
import {
	canvas,
	context,
	fonts,
	images,
	keys,
	sounds,
	stateStack,
	timer,
} from "./globals.js";
import PlayState from "../src/states/PlayState.js";
import TitleScreenState from "../src/states/TitleScreenState.js"

// Fetch the asset definitions from config.json.
const {
	images: imageDefinitions,
	fonts: fontDefinitions,
	sounds: soundDefinitions,
	// @ts-ignore
} = await fetch('./config/assets.json').then((response) => response.json());

// @ts-ignore
const mapDefinition = await fetch('./config/map.json').then((response) => response.json());



// Load all the assets from their definitions.
images.load(imageDefinitions);
fonts.load(fontDefinitions);
sounds.load(soundDefinitions);

// Add all the states to the state machine.
stateStack.push(new TitleScreenState(mapDefinition));

// Add event listeners for player input.
canvas.addEventListener('keydown', event => {
	keys[event.key] = true;
});

canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
});

const game = new Game(stateStack, context, timer, canvas.width, canvas.height);

game.start();

// Focus the canvas so that the player doesn't have to click on it.
canvas.focus();

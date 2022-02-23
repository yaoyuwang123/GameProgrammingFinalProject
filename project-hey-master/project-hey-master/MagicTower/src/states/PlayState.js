import State from "../../lib/State.js";
import Map from "../services/Map.js";
import {
	CANVAS_WIDTH,
	context,
	images,
	keys,
	sounds,
	stateStack,
	timer,
} from "../globals.js";
import TransitionState from "./TransitionState.js";
import GameOverState from "./GameOverState.js";
import Boss from "../entities/Boss.js";
import VictoryState from "./VictoryState.js";
import SoundName from "../enums/SoundName.js";
export default class PlayState extends State {
	constructor(mapDefinition) {
		super();
		
        this.copy=mapDefinition;
		this.map = new Map(mapDefinition);
		this.monsters=this.map.monsters;
		this.boss;
		this.GenerateBoss();
	}
	enter()
	{
		sounds.play(SoundName.Play);
	}
	GenerateBoss()
	{
		this.monsters.forEach((monster) => {

			if (monster instanceof Boss) {
				this.boss=monster;
			}

		});
	}

	update(dt) {
		this.map.update(dt);
		if(!this.map.player.alive)
		{
			TransitionState.fade(() => {
				//sounds.stop(SoundName.Title);
				sounds.stop(SoundName.Play);
				stateStack.pop();
				stateStack.push(new GameOverState(this.copy));
				
			});

		}
		else if(!this.boss.alive)
		{
			TransitionState.fade(() => {
				//sounds.stop(SoundName.Title);
				sounds.stop(SoundName.Play);
				stateStack.pop();
				stateStack.push(new VictoryState(this.copy));
				
			});
		}
	}

	render() {
		this.map.render();
	}
}


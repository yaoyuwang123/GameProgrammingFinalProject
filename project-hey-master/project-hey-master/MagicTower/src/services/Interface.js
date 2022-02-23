
import Tile from "./Tile.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, keys, stateMachine, timer } from "../globals.js";
import Player from "../entities/Player.js";
import Vector from "../../lib/Vector.js";
import Boss from "../entities/Boss.js";
import BloodBat from "../entities/BloodBat.js";
import Gard from "../entities/Gard.js";
import Sworder from "../entities/Sworder.js";
import GreenCookie from "../entities/GreenCookie.js";
import RedCookie from "../entities/RedCookie.js";
import Zombi from "../entities/Zombi.js";
import Samurai from "../entities/Samurai.js";
export default class Interface {
	static Width = 32;
	static Height = 32;

	constructor(player) {
		this.player = player;
	}
	render() {
		context.font = 'Magic Tower';
		context.fillStyle = 'red';
		context.font = '20px Zelda';
		context.fillText(`${this.player.health}`, 30, 120);
		context.fillText(`${this.player.attack}`, 30, 155);
		context.fillText(`${this.player.defense}`, 30, 185);
		context.fillText(`${this.player.yellowkey}`,30, 215);
		context.fillText(`${this.player.bluekey}`, 30, 245);
		context.fillText(`${this.player.redkey}`, 30, 275);
		context.fillText(`${this.player.gold}`, 30, 310);
		context.font = '15px Zelda';
		context.fillText(`${GreenCookie.Defult_Attack}`, 35, 410);
		context.fillText(`${GreenCookie.Defult_Defense}`, 70, 410);
		context.fillText(`${GreenCookie.Defult_Gold}`, 100, 410);
		context.fillText(`${RedCookie.Defult_Attack}`, 35, 440);
		context.fillText(`${RedCookie.Defult_Defense}`, 70, 440);
		context.fillText(`${RedCookie.Defult_Gold}`, 100, 440);
		context.fillText(`${Zombi.Defult_Attack}`, 35, 470);
		context.fillText(`${Zombi.Defult_Defense}`, 70, 470);
		context.fillText(`${Zombi.Defult_Gold}`, 100, 470);
		context.fillText(`${Samurai.Defult_Attack}`, 35, 500);
		context.fillText(`${Samurai.Defult_Defense}`, 70, 500);
		context.fillText(`${Samurai.Defult_Gold}`, 100, 500);
		context.fillText(`${BloodBat.Defult_Attack}`, 35, 530);
		context.fillText(`${BloodBat.Defult_Defense}`, 70, 530);
		context.fillText(`${BloodBat.Defult_Gold}`, 100, 530);
		context.fillText(`${Sworder.Defult_Attack}`, 35, 560);
		context.fillText(`${Sworder.Defult_Defense}`, 70, 560);
		context.fillText(`${Sworder.Defult_Gold}`, 100, 560);
		context.fillText(`${Gard.Defult_Attack}`, 35, 590);
		context.fillText(`${Gard.Defult_Defense}`, 70, 590);
		context.fillText(`${Gard.Defult_Gold}`, 100, 590);
		context.fillText(`${Boss.Defult_Attack}`, 35, 620);
		context.fillText(`${Boss.Defult_Defense}`, 70, 620);
		context.fillText(`${Boss.Defult_Gold}`, 100, 620);

	}
}
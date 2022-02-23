import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import Player from "../entities/Player.js";
import ImageName from "../enums/ImageName.js";
import Tile from "./Tile.js";
import Layer from "./Layer.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	DEBUG,
	images,
} from "../globals.js";
import Door from "../objects/Door.js";
import Type from "../enums/type.js";
import Interface from "./Interface.js";
import Key from "../objects/Key.js";
import Stun from "../objects/Stun.js";
import Health from "../objects/Health.js";
import Sheld from "../objects/sheld.js";
import Sword from "../objects/sword.js";
import MonsterFactory from "../entities/MonsterFactory.js"
import MonsterType from "../enums/MonsterType.js";

export default class Map {
	/**
	 * The collection of layers, sprites,
	 * and characters that comprises the world.
	 *
	 * @param {object} mapDefinition JSON from Tiled map editor.
	 */
	constructor(mapDefinition) {
		const sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Tiles),
			Tile.SIZE,
			Tile.SIZE,
		);
		this.bottomLayer = new Layer(mapDefinition.layers[Layer.BOTTOM], sprites);
		this.collisionLayer = new Layer(mapDefinition.layers[Layer.COLLISION], sprites);
		this.objects=this.GenerateObject();
		this.monsters=this.GenerateMonster();
		this.player = new Player({ position: new Vector(11, 19) }, this);
		this.interface=new Interface(this.player,this);
		
	}
	GenerateObject()
	{
		const gameobject = [];
		gameobject.push(new Door({ position: new Vector(11, 17) },Type.Yellow));
		gameobject.push(new Door({ position: new Vector(17, 17) },Type.Yellow));
		gameobject.push(new Door({ position: new Vector(13, 13) },Type.Yellow));
		gameobject.push(new Door({ position: new Vector(7, 3) },Type.Blue));
		gameobject.push(new Door({ position: new Vector(5, 7) },Type.Yellow));
		gameobject.push(new Door({ position: new Vector(5, 12) },Type.Yellow));
		gameobject.push(new Door({ position: new Vector(5, 17) },Type.Red));
		gameobject.push(new Key({ position: new Vector(11, 18) },Type.Yellow));
		gameobject.push(new Key({ position: new Vector(10, 18) },Type.Yellow));
		gameobject.push(new Key({ position: new Vector(12, 18) },Type.Yellow));
		gameobject.push(new Stun({ position: new Vector(15, 11) },Type.Red));
		gameobject.push(new Stun({ position: new Vector(14, 11) },Type.Red));
		gameobject.push(new Stun({ position: new Vector(16, 11) },Type.Red));
		gameobject.push(new Stun({ position: new Vector(15, 10) },Type.Blue));
		gameobject.push(new Stun({ position: new Vector(14, 10) },Type.Blue));
		gameobject.push(new Stun({ position: new Vector(16, 10) },Type.Blue));
		gameobject.push(new Stun({ position: new Vector(15, 11) },Type.Red));
		gameobject.push(new Stun({ position: new Vector(6, 9) },Type.Red));
		gameobject.push(new Stun({ position: new Vector(6, 11) },Type.Red));
		gameobject.push(new Stun({ position: new Vector(5, 10) },Type.Blue));
		gameobject.push(new Stun({ position: new Vector(5, 11) },Type.Blue));
		gameobject.push(new Stun({ position: new Vector(6, 10) },Type.Blue));
		gameobject.push(new Health({ position: new Vector(16, 3) },Type.Red));
		gameobject.push(new Health({ position: new Vector(17, 3) },Type.Blue));
		gameobject.push(new Key({ position: new Vector(15, 3) },Type.Red));
		gameobject.push(new Health({ position: new Vector(5, 13) },Type.Red));
		gameobject.push(new Health({ position: new Vector(6, 13) },Type.Red));
		gameobject.push(new Health({ position: new Vector(5,14) },Type.Blue));
		gameobject.push(new Health({ position: new Vector(6,14) },Type.Blue));
		gameobject.push(new Sheld({ position: new Vector(5,19) }));
		gameobject.push(new Sword({ position: new Vector(6,19) }));
		gameobject.push(new Key({ position: new Vector(19,18) },Type.Blue));
		gameobject.push(new Key({ position: new Vector(16,18) },Type.Yellow));
		gameobject.push(new Key({ position: new Vector(15,18) },Type.Yellow));
		for(let x=15;x<20;x++)
		{
			gameobject.push(new Stun({ position: new Vector(x,19) },Type.Red));
		}

		return gameobject;
	}
	GenerateMonster()
	{
		const monsters= [];
		monsters.push(MonsterFactory.createInstance(MonsterType.Boss, { position: new Vector(5,1)}));
		for(let x=6;x<10;x++)
		{
			monsters.push(MonsterFactory.createInstance(MonsterType.Gard, { position: new Vector(x,1)}));
		}
		for(let x=10;x<20;x++)
		{
			monsters.push(MonsterFactory.createInstance(MonsterType.Samurai, { position: new Vector(x,1)}));
		}
		for(let y=2;y<15;y++)
		{
			monsters.push(MonsterFactory.createInstance(MonsterType.Zombi, { position: new Vector(19,y)}));
		}
		for(let x=8;x<20;x++)
		{
			monsters.push(MonsterFactory.createInstance(MonsterType.Green, { position: new Vector(x,16)}));
		}
		for(let x=9;x<20;x++)
		{
			monsters.push(MonsterFactory.createInstance(MonsterType.Red, { position: new Vector(x,15)}));
		}
		for(let x=15;x<18;x++)
		{
			monsters.push(MonsterFactory.createInstance(MonsterType.Red, { position: new Vector(x,13)}));
		}
		monsters.push(MonsterFactory.createInstance(MonsterType.Zombi, { position: new Vector(10,6)}));
		monsters.push(MonsterFactory.createInstance(MonsterType.Zombi, { position: new Vector(17,18)}));
		monsters.push(MonsterFactory.createInstance(MonsterType.Sword, { position: new Vector(6,3)}));
		monsters.push(MonsterFactory.createInstance(MonsterType.BloodBat, { position: new Vector(5,8)}));
		monsters.push(MonsterFactory.createInstance(MonsterType.BloodBat, { position: new Vector(5,16)}));
		return monsters;
	}

	update(dt) {
		this.player.update(dt);
		this.objects.forEach((object) => {
			object.update(dt);
			
		});
		this.monsters.forEach((monster) => {
			monster.update(dt);
			
		});
	}

	render() {
		this.bottomLayer.render();
		this.collisionLayer.render();
		this.objects.forEach((object) => {
			object.render();
			
		});
		this.monsters.forEach((monster) => {
			monster.render();
			
		});
		this.player.render();
		this.interface.render();
		//this.topLayer.render();

		if (DEBUG) {
			Map.renderGrid();
		}
	}

	/**
	 * Draws a grid of squares on the screen to help with debugging.
	 */
	static renderGrid() {
		context.save();
		context.strokeStyle = Colour.White;

		for (let y = 1; y < CANVAS_HEIGHT / Tile.SIZE; y++) {
			context.beginPath();
			context.moveTo(0, y * Tile.SIZE);
			context.lineTo(CANVAS_WIDTH, y * Tile.SIZE);
			context.closePath();
			context.stroke();

			for (let x = 1; x < CANVAS_WIDTH / Tile.SIZE; x++) {
				context.beginPath();
				context.moveTo(x * Tile.SIZE, 0);
				context.lineTo(x * Tile.SIZE, CANVAS_HEIGHT);
				context.closePath();
				context.stroke();
			}
		}

		context.restore();
	}
}

import GameEntity from "./GameEntity.js";
import { images} from "../globals.js";
import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import Map from "../services/Map.js";
import ImageName from "../enums/ImageName.js";
import Animation from "../../lib/Animation.js";

export default class GreenCookie extends GameEntity {
	static Defult_Attack = 11;
	static Defult_Defense = 5;
	static Defult_Gold=25;
	/**
	 * The character that the player controls in the map.
	 * Has a party of Pokemon they can use to battle other Pokemon.
	 *
	 * @param {object} entityDefinition
	 * @param {Map} map
	 */
	constructor(entityDefinition = {}) {
		super(entityDefinition);
		this.dimensions = new Vector(GameEntity.WIDTH, GameEntity.HEIGHT);
		this.attack=GreenCookie.Defult_Attack;
		this.defense=GreenCookie.Defult_Defense;
		this.gold=GreenCookie.Defult_Gold;
		this.sprites = this.initializeSprites()
		this.currentAnimation = new Animation([0,1,2,3], 0.2);
	}

	update(dt) {
		if(this.alive)
		{
			this.currentAnimation.update(dt);
		    this.currentFrame = this.currentAnimation.getCurrentFrame();
		    
		}
	}

	render() {
		const x = Math.floor(this.canvasPosition.x);
		const y = Math.floor(this.canvasPosition.y - this.dimensions.y / 2);

		super.render(x, y);
	}

	initializeSprites() {
        const sprites = [];
        let y=38;
        for(let x=0;x<4;x++)
        {
            sprites.push(new Sprite(
                images.get(ImageName.Tiles),
                x * GameEntity.WIDTH,
                y * GameEntity.HEIGHT,
                GameEntity.WIDTH,
                GameEntity.HEIGHT
            ));
        }
        return sprites;
	}
}
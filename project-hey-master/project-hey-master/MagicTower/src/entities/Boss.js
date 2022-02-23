import GameEntity from "./GameEntity.js";
import { images} from "../globals.js";
import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import ImageName from "../enums/ImageName.js";
import Animation from "../../lib/Animation.js";

export default class Boss extends GameEntity {
	static Defult_Attack = 500;
	static Defult_Defense = 400;
	static Defult_Gold=400;
	
	constructor(entityDefinition = {}) {
		super(entityDefinition);
		this.dimensions = new Vector(GameEntity.WIDTH, GameEntity.HEIGHT);
		this.attack=Boss.Defult_Attack;
		this.defense=Boss.Defult_Defense;
		this.gold=Boss.Defult_Gold;
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
        let y=37;
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
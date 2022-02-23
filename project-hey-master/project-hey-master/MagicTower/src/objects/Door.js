import Tile from "../services/Tile.js";
import GameObject from "./GameObject.js";
import ImageName from "../enums/ImageName.js";
import Type from "../enums/type.js";
import Sprite from "../../lib/Sprite.js";
import { images, timer} from "../globals.js";
import Animation from "../../lib/Animation.js";

export default class Door extends GameObject {
	static WIDTH = Tile.SIZE;
	static HEIGHT = Tile.SIZE;

	/**
	 * A toggle that the player can hit to open the dungeon doors.
	 *
	 * @param {Vector} dimensions
	 * @param {Vector} position
	 */
	constructor(objectDefinition = {},type) {
		super(objectDefinition);
        this.Type=type;

		this.Collision=true;
		
        
		this.sprites = Door.generateSprites(this.Type)
        this.currentAnimation = new Animation([0,1,2,3], 0.2,1);
        this.isConsumable=false;
		this.currentFrame = 0;
        
		
	}
    update(dt) {
		super.update(dt);
        if(this.isConsumable)
        {
            this.currentAnimation.update(dt);
		    this.currentFrame = this.currentAnimation.getCurrentFrame();
            if (this.currentAnimation.isDone()) {
                this.wasConsumed=true;
            }
    
        }
	}

	render() {
		const x = Math.floor(this.canvasPosition.x);
		const y = Math.floor(this.canvasPosition.y - this.dimensions.y / 2);
		super.render(x, y);
	}
    static generateSprites(type) {
        const sprites = [];
        let x;
        if(type=="yellow")
        {
            x=0;
        }
        else if(type=="blue")
        {
            x=1;
        }
        else if(type=="red")
        {
            x=2
        }
        for (let y = 0; y <= 3; y++) {
            sprites.push(new Sprite(
                images.get(ImageName.Door),
                x * Door.WIDTH,
                y * Door.HEIGHT,
                Door.WIDTH,
                Door.HEIGHT
            ));
        }
        return sprites;
    }
}
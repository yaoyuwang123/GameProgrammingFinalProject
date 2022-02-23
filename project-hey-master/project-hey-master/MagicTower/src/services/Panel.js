
import Colour from "../enums/Color.js";
import { roundedRectangle } from ".././../lib/DrawingHelpers.js";
import { context } from "../globals.js";
import UserInterfaceElement from "./UserInterfaceElement.js";

export default class Panel extends UserInterfaceElement {
	static Main_DIALOGUE = { x: 0, y: 15, width: 15, height: 3 };
	static TOP_DIALOGUE = { x: 0, y: 0, width: 15, height: 3 };

	static DEFAULT_PADDING = 20;
	static BORDER_WIDTH = 10;

	/**
	 * A UI element that is simply a rectangle that
	 * other UI elements are placed on top of.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 * @param {object} options
	 */
	constructor(x, y, width, height, options = {}) {
		super(x, y, width, height);

		this.borderColour = options.borderColour ?? Colour.White;
		this.panelColour = options.panelColour ?? Colour.White;
		this.padding = options.padding ?? Panel.DEFAULT_PADDING;
		this.discardsvalue=options.change??0;
		this.ifhealthbar=options.ifheal??false;
		this.ifbar=options.ifheals??false;
		this.isVisible = true;
		this.ifex=options.ifex??false;
	}

	render() {
		if (!this.isVisible) {
			return;
		}

		context.save();
		this.renderBackground();
		this.renderForeground();
		context.restore();
	}

	renderBackground() {
		context.fillStyle = this.borderColour;
		roundedRectangle(
			context,
			this.position.x,
			this.position.y,
			this.dimensions.x,
			this.dimensions.y,
			Panel.BORDER_WIDTH,
			true,
			false
		);
	}

	renderForeground() {
		context.fillStyle = this.panelColour;
		if(this.ifhealthbar)
		{
			roundedRectangle(
				context,
				this.position.x + Panel.BORDER_WIDTH / 2,
				this.position.y + Panel.BORDER_WIDTH / 2,
				this.healthdimension.x - Panel.BORDER_WIDTH,
				this.healthdimension.y - Panel.BORDER_WIDTH,
				Panel.BORDER_WIDTH,
				true,
				false
			);
		}
		else if(this.ifbar)
		{
			roundedRectangle(
				context,
				this.position.x + Panel.BORDER_WIDTH / 2,
				this.position.y + Panel.BORDER_WIDTH / 2,
				this.enemy.x - Panel.BORDER_WIDTH,
				this.enemy.y - Panel.BORDER_WIDTH,
				Panel.BORDER_WIDTH,
				true,
				false
			);
		}
		else if(this.ifex)
		{
			roundedRectangle(
				context,
				this.position.x + Panel.BORDER_WIDTH / 2,
				this.position.y + Panel.BORDER_WIDTH / 2,
				this.ex.x,
				this.ex.y - Panel.BORDER_WIDTH,
				Panel.BORDER_WIDTH,
				true,
				false
			);
		}
		else
		{
			roundedRectangle(
				context,
				this.position.x + Panel.BORDER_WIDTH / 2,
				this.position.y + Panel.BORDER_WIDTH / 2,
				this.dimensions.x - Panel.BORDER_WIDTH,
				this.dimensions.y - Panel.BORDER_WIDTH,
				Panel.BORDER_WIDTH,
				true,
				false
			);
		}
		
	}

	toggle() {
		this.isVisible = !this.isVisible;
	}
}
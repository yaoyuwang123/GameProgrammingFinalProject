import State from "../../lib/State.js";
import Textbox from "../services/TextBox.js";
import Panel from "../services/Panel.js";
import { stateStack, timer } from "../globals.js";

export default class MessageState extends State {
	/**
	 * Any text to display to the Player during battle
	 * is shown in this state.
	 *
	 * @param {string} message
	 * @param {number} waitDuration How long to wait before auto-closing the textbox.
	 * @param {function} onClose
	 */
	constructor(message, waitDuration = 0, onClose = () => { }) {
		super();

		this.textbox = new Textbox(
			0,
			6,
			20,
			10,
			message,
			{ isAdvanceable: waitDuration === 0 }
		);
		this.waitDuration = waitDuration;
		this.onClose = onClose;

		if (waitDuration > 0) {
			timer.wait(this.waitDuration, () => {
				stateStack.pop();
				onClose();
			});
		}
	}

	update() {
		if (this.waitDuration === 0) {
			this.textbox.update();

			if (this.textbox.isClosed) {
				stateStack.pop();
				this.onClose();
			}
		}
	}

	render() {
		this.textbox.render();
	}
}

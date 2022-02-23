import MonsterType from "../enums/MonsterType.js";
import BloodBat from "./BloodBat.js";
import Boss from "./Boss.js";
import Gard from "./Gard.js";
import GreenCookie from "./GreenCookie.js";
import RedCookie from "./RedCookie.js";
import Samurai from "./Samurai.js";
import Zombi from "./Zombi.js";
import Sworder from "./Sworder.js";


export default class MonsterFactory {
	
	static createInstance(type, Defination) {
		switch (type) {
			    case MonsterType.BloodBat:
				return new BloodBat(Defination);
                case MonsterType.Boss:
                return new Boss(Defination);
                case MonsterType.Gard:
				return new Gard(Defination);
                case MonsterType.Green:
				return new GreenCookie(Defination);
                case MonsterType.Red:
				return new RedCookie(Defination);
                case MonsterType.Samurai:
				return new Samurai(Defination);
                case MonsterType.Sword:
				return new Sworder(Defination);
                case MonsterType.Zombi:
				return new Zombi(Defination);
		}
	}
}
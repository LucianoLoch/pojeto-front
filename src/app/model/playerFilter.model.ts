import { PlayerAttributes } from './playerAttributes.model';

export enum OrdType {
	NAME = 0,
	POSITION = 1,
	RATING = 2
}

export class PlayerFilter {
	constructor(
		public name?: string,
		public position?: string,
		public rating?: number,
		public ratingend?: number,
		public endValue?: number,
		public startValue?: number,
		public league?: number){}
		public attributes?: Array<PlayerAttributes>
		public ordenation?: Array<OrdType>	
}



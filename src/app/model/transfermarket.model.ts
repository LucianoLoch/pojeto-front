import { Player } from './player.model';
import { Team } from './team.model';
import { PlayerAttributes } from './playerAttributes.model';



export class Transfermarket {
	constructor(
		public player?: Player,
		public idPlayer?: number,
		public name?: string,
		public position?: string,
		public rating?: number,
		public idBid?: number,
		public bidValue?: number,
		public teamId?: number,
		public originalValue?: number,
		public playerId?: number,
		public bidAproved?: boolean,
		public hasBid?: boolean,
		public team?: Team,
		public expanded?: boolean,
		public icon?: string,
		public attributes?: PlayerAttributes,
		public clubName?:string) { }
}


export class TransfermarketRest {
	constructor(
		public transfermarkets?: Transfermarket[],
		public first?: boolean,
		public last?: boolean,
		public number?: number,
		public numberOfElements?: number,
		public size?: number,
		public sort?: null,
		public totalElements?: number,
		public totalPages?: number) { }

}
import { Bidinfo } from './bidinfo.model';
import { PlayerAttributes } from './playerAttributes.model';
export class Player {
	constructor(
		public id?: number,
		public name?: string,
		public position?: string,
		public baseId?: number,
		public rating?: number,
		public attributes?: PlayerAttributes[],
        public clubName?:string,
        public height?: number,
        public weight?: number,
        public age?:number,
        public foot?:string,
        public atkWorkRate?: string,
        public defWorkRate?: string,
        public headshotImgUrl?:string,
        public bid?: Bidinfo){}
}


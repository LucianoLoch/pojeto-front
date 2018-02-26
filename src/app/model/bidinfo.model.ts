export class Bidinfo {
	constructor(
		public id?: number,
		public bidValue?: number,
		public team?: number,
		public originalValue?: number,
        public status?: string,
        public nextValue?: number,
        public bidTime?: Date){}
} 
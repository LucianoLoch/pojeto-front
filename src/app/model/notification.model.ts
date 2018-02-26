export class Notification {
	constructor(
		public id?: number,
		public playerName?: string,
		public notification?: string,
        public teamId?: number,
		public read?: boolean){}
}

export class NotificationrRest {
	constructor(
       public content?: Notification[],
       public first?: boolean,
       public last?: boolean,
       public number?: number,
       public numberOfElements?: number,
       public size?: number,
       public sort?: null,
       public totalElements?: number,
       public totalPages?: number){}
}
 
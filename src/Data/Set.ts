export default interface Set {
	name: string;
	image: string;
	setNumber: string;
	year: number;
	pieceCount: number;
	id?: string;
}

export interface SetsResponse {
	sets: Set[];
	hasNextPage: boolean;
}

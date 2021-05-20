export default interface Piece {
	partNumber: string;
	name: string;
	image: string;
	color?: string;
	id?: string;
}

export interface PiecesResponse {
	pieces: Piece[];
	hasNext: boolean;
}

export interface Color {
	name: string;
	image: string;
}

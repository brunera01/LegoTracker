export default interface Piece {
	partNum: string;
	name: string;
	partImage: string;

}

export interface PiecesResponse {
	pieces: Piece[];
	hasNext: boolean;
}

export interface Color {
	name: string;
	image: string;
}
import { SetsResponse } from '../Data/Set';
import User from '../Data/User';
import {PiecesResponse, Color} from '../Data/Piece';

export async function getSets(user: User, page: string, search?: string): Promise<SetsResponse> {
	const { APIKey } = user;
	console.log('page is ' + page);
	const parameters = { page, page_size: '60', search: search ?? '', ordering: '-year', min_parts: '1' };
	const url = 'https://rebrickable.com/api/v3/lego/sets?' + new URLSearchParams(parameters).toString();
	const response = await fetch(url, {headers: { authorization: `key ${APIKey}` }});
	if(!response.ok){
		//some error handling
	}
	const content: rebrickableSetResponse = await response.json();
	const result =  {
		hasNextPage: !!content.next,
		sets: content.results.map((set) => ({
			setNumber: set.set_num,
			year: set.year,
			name: set.name,
			pieceCount: set.num_parts,
			image: set.set_img_url,
		}))
	};
	// console.log(result);
	return result
}

export async function getPieces(user: User, page: string, search?: string): Promise<PiecesResponse> {
	const { APIKey} = user;
	const parameters = {page,page_size: '60', search: search??'', ordering: 'part_cat_id'};
	const url = 'https://rebrickable.com/api/v3/lego/parts/?' + new URLSearchParams(parameters).toString();
	const response = await fetch(url, {headers: {authorization: `key ${APIKey}`}});
	if(!response.ok){
		//Error handling
	}
	const content: rebrickablePieceResponse = await response.json();
	const result = {
		hasNext: !!content.next,
		pieces: content.results.map((piece) => ({
			partNum: piece.part_num,
			name: piece.name,
			partImage: piece.part_img_url,
		}))
	};

	return result;
}

export async function getColors(user: User, part: string): Promise<Color[]> {
	const {APIKey} = user;
	const url = `https://rebrickable.com/api/v3/lego/parts/${part}/colors`;
	const response = await fetch(url, {headers: {authorization: `key ${APIKey}`}});
	if(!response.ok) {
		//Error handling that we definitely do
	}
	const content: rebrickableColorResponse = await response.json();
	return content.results.map((color) =>  ({
		name: color.color_name,
		image: color.part_img_url
	}))
}

interface rebrickableSetResponse {
	count: number;
	next: string;
	results: rebrickableSet[];
}
interface rebrickablePieceResponse {
	count: number;
	next: string;
	results: rebrickablePiece[];
}
interface rebrickableColorResponse {
	count: number;
	results: rebrickableColor[];
}


interface rebrickableSet {
	set_num: string;
	name: string;
	year: number;
	num_parts: number;
	set_img_url: string;
}

interface rebrickablePiece {
	part_num: string;
	name: string;
	part_img_url: string;
}

interface rebrickableColor {
	color_name: string;
	part_img_url: string;
}


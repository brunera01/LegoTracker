import { SetsResponse } from '../Data/Set';
import User from '../Data/User';

export interface ICollectionManager {
	getItems: (user: User, page: number) => SetsResponse;
}

export async function getItems(user: User, page: string, search?: string): Promise<SetsResponse> {
	const { APIKey } = user;
	console.log('page is ' + page);
	const parameters: rebrickableSetRequest = { page, page_size: '60', search: search ?? '', ordering: '-year', min_parts: '1' };
	const url = 'https://rebrickable.com/api/v3/lego/sets?' + new URLSearchParams(parameters).toString();
	const response = await fetch(url, {headers: { authorization: `key ${APIKey}` }});
	if(!response.ok){
		//some error handling
	}
	const content: rebrickableResponse = await response.json();
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
	console.log(result);
	return result
}

interface rebrickableResponse {
	count: number;
	next: string;
	results: rebrickableSet[];
}

interface rebrickableSet {
	set_num: string;
	name: string;
	year: number;
	num_parts: number;
	set_img_url: string;
}

interface rebrickableSetRequest extends Record<string, string>{
	page: string;
	page_size: string;
	search: string;
	ordering: string;
	min_parts: string;
}

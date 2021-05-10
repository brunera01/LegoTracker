import User from '../Data/User';
import Set from '../Data/Set'
import { getItems } from '../Model/CollectionManager';
import { htmlToDivElement } from '../util';

export class CollectionController {
	constructor(user: User, page: string, uid?: string) {
		const searchInput = document.querySelector('#searchText');
		if (!searchInput || !(searchInput instanceof HTMLInputElement)) {
			console.error('could not find valid search input');
			return;
		}
		if (!uid) {
			getItems(user, page, searchInput.value).then((setsResponse) => {
				this.updateList(setsResponse.sets)
			});
		}
	}

	updateList(sets: Set[]): void {
		const newList = htmlToDivElement('<div id="listContainer" class="row"></div>');

		for (let i = 0; i < sets.length; i++) {
			console.log('another quote');
			const newCard = this._createCard(sets[i]);
			newCard.addEventListener('click', () => {
				const yearDisplay = document.querySelector('#modalYear') as HTMLParagraphElement;
				const setNumber = document.querySelector('#modalSetNumber') as HTMLParagraphElement;
				const setPieceCount = document.querySelector('#modalPieceCount') as HTMLParagraphElement;
				const setImage = document.querySelector('#modalImage') as HTMLImageElement;
				const setName = document.querySelector('#modalName') as HTMLHeadingElement;
				const button = document.querySelector('#modalButton') as HTMLButtonElement;
				yearDisplay.innerHTML = `Year: ${sets[i].year}`;
				setNumber.innerHTML = `Set Number ${sets[i].setNumber}`;
				setPieceCount.innerHTML = `pieces: ${sets[i].pieceCount}`;
				setImage.src = sets[i].image;
				setName.innerHTML = sets[i].name;
				button.addEventListener('click', () => {
					//todo later
					console.log('figure this out later');
				});
				button.innerHTML = 'Add To Collection';

			})
			newList.appendChild(newCard);
		}

		const oldList = document.querySelector('#listContainer');
		if (!oldList || !(oldList instanceof HTMLDivElement) || !oldList.parentElement) {
			console.error('could not find list container element');
			return;
		}
		oldList.removeAttribute('id');
		oldList.hidden = true;

		oldList.parentElement.appendChild(newList);
	}

	_createCard(set: Set): HTMLDivElement {
		return htmlToDivElement(`
				<div class="col-12 col-md-4 col-lg-3">
					<div class="set-card card" data-toggle="modal" data-target="#setInfo" >
						<img class="mh-25 card-img-top" src="${set.image}"
							alt="Card image cap">
						<div class="card-body" >
							<h5 class="card-title">${set.name}</h5>
						</div>
					</div>
				</div>`);
	}
}

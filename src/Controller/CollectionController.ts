import User from '../Data/User';
import Set from '../Data/Set';
import Piece from '../Data/Piece';
import { Color } from '../Data/Piece';
import { getSets, getPieces, getColors } from '../Model/CatalogManager';
import { htmlToElement } from '../util';
import { addToCollection, CollectionManager } from '../Model/CollectionManager';
import firebase from 'firebase';



export class CollectionController {
	user: User;
	constructor(user: User, page: string, sets: boolean, uid?: string, search?: string,) {
		this.user = user;
		const searchButton = document.querySelector('#searchButton') as HTMLButtonElement;
		const searchInput = document.querySelector('#searchText') as HTMLInputElement;
		const titleText = document.querySelector('#titleText') as HTMLAnchorElement;
		searchInput.value = search ?? "";
		console.log(searchInput);
		const nextPageButton = document.querySelector("#nextPageButton") as HTMLButtonElement;
		const prevPageButton = document.querySelector("#prevPageButton") as HTMLButtonElement;
		const setsSelection = document.querySelector("#setsSelection") as HTMLAnchorElement;
		const piecesSelection = document.querySelector("#piecesSelection") as HTMLAnchorElement;
		const myCollectionButton = document.querySelector("#myCollectionButton") as HTMLAnchorElement;
		const button = document.querySelector('#modalButton') as HTMLButtonElement;
		const signOut = document.querySelector('#signOutButton') as HTMLAnchorElement;
		nextPageButton.addEventListener("click", () => {
			const params = `?uid=${uid}&page=${parseInt(page) + 1}&search=${search ?? ""}`;
			window.location.href = `/collection.html${params}`;
		})
		if (page != "1") {
			prevPageButton.addEventListener("click", () => {
				const params = `?uid=${uid ?? ""}&page=${parseInt(page) - 1}&search=${search ?? ""}`;
				window.location.href = `/collection.html${params}`;
			})
		} else {
			prevPageButton.style.display = "none";
		}
		searchButton.addEventListener("click", () => {
			const params = `?uid=${uid ?? ""}&page=1&search=${searchInput.value ?? ""}&set=${sets ? sets : ""}`
			window.location.href = `/collection.html${params}`;
		})
		myCollectionButton.href = `/collection.html?set=true&uid=${user.uid}`;
		signOut.addEventListener("click", () => {
			firebase.auth().signOut();
		})
		if (!uid && sets) {
			//Sets Catalog
			getSets(user, page, search).then((setsResponse) => {
				this.updateSetsList(setsResponse.sets, (index) => {
					const set = setsResponse.sets[index];
					const uid = this.user.uid;
					addToCollection(set, uid).then(() => {
						console.log('Added set to collection');
						const modal = document.querySelector('setInfo') as HTMLDivElement;

					});
					console.log('figure this out later');
				})
				if (!setsResponse.hasNextPage) {
					nextPageButton.style.display = "none";
				}
			});
			console.log(searchButton);
			titleText.innerHTML = "Catalog"
			setsSelection.classList.add("active");
			button.innerHTML = 'Add To Collection';

		}
		if (!uid && !sets) {
			//Pieces Catalog
			piecesSelection.classList.add("active");
			getPieces(user, page, search).then((piecesResponse) => {
				this.updatePieceList(piecesResponse.pieces, (index: number) => {
					
				});
			})
		}
		if (uid && sets) {
			// Sets collection
			console.log("On Sets collection");
			setsSelection.classList.add("active");
			const collectionManager = new CollectionManager(user);
			collectionManager.beginListening(uid, () => {
				this.updateSetsList(collectionManager.getSets(), (index) => {
					const set = collectionManager.getSets()[index].id;
					if (set) {
						collectionManager.removeSet(set);
					} else {
						console.log("you messed up");
					}
				});
			});
			button.innerHTML = 'Remove From Collection';
			if (user.uid !== uid) {
				button.style.display = "none";
			}
		}
		console.log(!!uid + " " + !!sets);
		if (uid && !sets) {
			piecesSelection.classList.add("active");
			//Pieces Collection
		}
	}

	updateSetsList(sets: Set[], buttonFunction: (index: number) => void): void {
		const newList = htmlToElement('<div id="listContainer" class="row"></div>') as HTMLDivElement;

		for (let i = 0; i < sets.length; i++) {
			// console.log('another quote');
			const newCard = this._createSetCard(sets[i]);
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
				var newButton = button.cloneNode(true);
				button.parentNode?.replaceChild(newButton, button);
				newButton.addEventListener('click', () => {
					buttonFunction(i);
				});
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

	updatePieceList(pieces: Piece[], buttonFunction: (index: number)=>void): void {
		const newList = htmlToElement('<div id="listContainer" class="row"></div>') as HTMLDivElement;
		for (let i = 0; i < pieces.length; i++) {
			const newCard = this._createPieceCard(pieces[i]);
			newCard.addEventListener('click', () => {
				const newSelect = htmlToElement('<select id="colorListSelect"></select>') as HTMLSelectElement;
				const colors = getColors(this.user, pieces[i].partNum).then((colors: Color[]) => {
					for (let i = 0; i < colors.length; i++) {
						const newOption = htmlToElement(`<option value=${colors[i].name}>${colors[i].name}</option>`) as HTMLOptionElement;
						newSelect.add(newOption);
					}
					const oldSelect = document.querySelector("#colorListSelect") as HTMLSelectElement;
					oldSelect.removeAttribute('id');
					oldSelect.hidden = true;
					oldSelect.parentElement?.appendChild(newSelect);
					const partNameDisplay = document.querySelector("#modalPartName") as HTMLParagraphElement;
					const partTitleDisplay = document.querySelector("#modalPartTitle") as HTMLHeadingElement;
					const partImage = document.querySelector("#modalPartImage") as HTMLImageElement;
					const partNumDisplay = document.querySelector("#modalPartNumber") as HTMLParagraphElement;
					const button = document.querySelector("#modalPartButton") as HTMLButtonElement;
					partNameDisplay.innerHTML = `Part Name: ${pieces[i].name}`;
					partTitleDisplay.innerHTML = pieces[i].partNum;
					partImage.src = pieces[i].partImage;
					partNumDisplay.innerHTML = `Part Number: ${pieces[i].partNum}`;
					var newButton = button.cloneNode(true);
					button.parentNode?.replaceChild(newButton, button);
					newButton.addEventListener('click', () => {
						buttonFunction(i);
					});
				});
				console.log("TODO: Create Piece Modal");
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

	_createSetCard(set: Set): HTMLDivElement {
		return htmlToElement(`
				<div class="col-12 col-sm-6 col-md-4 col-lg-3">
					<div class="set-card card" data-toggle="modal" data-target="#setInfo" >
						<img class="mh-25 card-img-top" src="${set.image}"
							alt="Card image cap">
						<div class="card-body" >
							<h5 class="card-title">${set.name}</h5>
						</div>
					</div>
				</div>`) as HTMLDivElement;
	}

	_createPieceCard(piece: Piece): HTMLDivElement {
		return htmlToElement(`
				<div class="col-12 col-sm-6 col-md-4 col-lg-3">
					<div class="set-card card" data-toggle="modal" data-target="#pieceInfo" >
						<img class="mh-25 card-img-top" src="${piece.partImage}"
							alt="Card image cap">
						<div class="card-body" >
							<h5 class="card-title">${piece.partNum}</h5>
						</div>
					</div>
				</div>`) as HTMLDivElement;
	}
}

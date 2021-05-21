import clamp = require('clamp-js');
import User from '../Data/User';
import Set from '../Data/Set';
import Piece from '../Data/Piece';
import { Color } from '../Data/Piece';
import { getSets, getPieces, getColors } from '../Model/CatalogManager';
import { htmlToElement } from '../util';
import { addSetToCollection, SetManager } from '../Model/CollectionManager';
import { addPieceToCollection, PieceManager } from '../Model/PieceManager';
import firebase from 'firebase/app';
import 'firebase/auth';



export class CollectionController {
	user: User;
	constructor(user: User, page: string, sets: boolean, uid?: string, search?: string,) {
		this.user = user;
		const searchButton = document.querySelector('#searchButton') as HTMLButtonElement;
		const searchInput = document.querySelector('#searchText') as HTMLInputElement;
		const titleText = document.querySelector('#titleText') as HTMLAnchorElement;
		searchInput.value = search ?? '';
		const nextPageButton = document.querySelector('#nextPageButton') as HTMLButtonElement;
		const prevPageButton = document.querySelector('#prevPageButton') as HTMLButtonElement;
		const setsSelection = document.querySelector('#setsSelection') as HTMLAnchorElement;
		const piecesSelection = document.querySelector('#piecesSelection') as HTMLAnchorElement;
		const myCollectionButton = document.querySelector('#myCollectionButton') as HTMLAnchorElement;
		const button = document.querySelector('#modalButton') as HTMLButtonElement;
		const signOut = document.querySelector('#signOutButton') as HTMLAnchorElement;
		const partButton = document.querySelector('#modalPartButton') as HTMLButtonElement;
		nextPageButton.addEventListener('click', () => {
			const url = window.location.href;
			window.location.href=url.replace(`page=${page}`,`page=${parseInt(page)+1}`);
		})
		if (page != '1') {
			prevPageButton.addEventListener('click', () => {
				const url = window.location.href;
				window.location.href=url.replace(`page=${page}`,`page=${parseInt(page)-1}`);
			})
		} else {
			prevPageButton.style.display = 'none';
		}
		if(uid) {
			prevPageButton.style.display = 'none';
			nextPageButton.style.display = 'none';
		}
		searchButton.addEventListener('click', () => {
			const params = `?uid=${uid ?? ''}&page=1&search=${searchInput.value ?? ''}&set=${sets ? sets : ''}`
			window.location.href = `/collection.html${params}`;
		})
		myCollectionButton.href = `/collection.html?set=true&uid=${user.uid}`;
		signOut.addEventListener('click', () => {
			firebase.auth().signOut();
		})
		if (!uid && sets) {
			this.initializeSetsCatalog(page, search);
		}
		if (!uid && !sets) {
			//Pieces Catalog
			this.initializePiecesCatalog(page, search);
		}
		const searchBar = document.querySelector('#searchBar') as HTMLDivElement;
		if (uid && sets) {
			// Sets collection
			this.initializeSetsCollection(page, uid);
		}
		console.log(!!uid + ' ' + !!sets);
		if (uid && !sets) {
			piecesSelection.classList.add('active');
			//Pieces Collection
			searchBar.style.display = 'none';
			const pieceManager = new PieceManager(user);
			pieceManager.beginListening(uid, () => {
				this.updatePieceList(pieceManager.getPieces(), (index) => {
					const piece = pieceManager.getPieces()[index].id;
					if (piece) {
						pieceManager.removePiece(piece);
					} else {
						console.log('you messed up');
					}
				}, async (_, piece) => ([
					{
						name: piece.color ?? '',
						image: piece.image ?? ''
					}
				]));
			});
			partButton.innerHTML = 'Remove From Collection';
			if (user.uid !== uid) {
				partButton.style.display = 'none';
			}
			piecesSelection.href = `/collection.html?uid=${uid}`;
			setsSelection.href = `/collection.html?uid=${uid}&set=true`;
			button.innerHTML = 'Remove From Collection';
			if (user.uid !== uid) {
				button.style.display = 'none';
			}
		}
	}

	initializeSetsCatalog(page: string, search?: string): void {
		const searchInput = document.querySelector('#searchText') as HTMLInputElement;
		searchInput.value = search ?? '';
		getSets(this.user, page, search).then((setsResponse) => {
			this.updateSetsList(setsResponse.sets, (index) => {
				const set = setsResponse.sets[index];
				const uid = this.user.uid;
				addSetToCollection(set, uid);
				console.log('figure this out later');
			})
			if (!setsResponse.hasNextPage) {
				const nextPageButton = document.querySelector('#nextPageButton') as HTMLButtonElement;
				nextPageButton.style.display = 'none';
			}
		});
		const titleText = document.querySelector('#titleText') as HTMLAnchorElement;
		titleText.innerHTML = 'Catalog'
		const setsSelection = document.querySelector('#setsSelection') as HTMLAnchorElement;
		setsSelection.classList.add('active');
		const button = document.querySelector('#modalButton') as HTMLButtonElement;
		button.innerHTML = 'Add To Collection';
	}

	initializePiecesCatalog(page: string, search?: string): void {
		const titleText = document.querySelector('#titleText') as HTMLAnchorElement;
		titleText.innerHTML = 'Catalog'
		const piecesSelection = document.querySelector('#piecesSelection') as HTMLAnchorElement;
		piecesSelection.classList.add('active');
		getPieces(this.user, page, search).then((piecesResponse) => {
			this.updatePieceList(piecesResponse.pieces, (index: number) => {
				const piece = piecesResponse.pieces[index];
				const uid = this.user.uid;
				addPieceToCollection(piece, uid);
			}, (user, piece) => getColors(user, piece.partNumber));
		})
	}

	initializeSetsCollection(page: string, uid: string): void {
		const searchBar = document.querySelector('#searchBar') as HTMLDivElement;
		searchBar.style.display = 'none';
		const piecesSelection = document.querySelector('#piecesSelection') as HTMLAnchorElement;
		piecesSelection.href = `/collection.html?uid=${uid}`;
		const setsSelection = document.querySelector('#setsSelection') as HTMLAnchorElement;
		setsSelection.href = `/collection.html?uid=${uid}&set=true`;
		setsSelection.classList.add('active');
		const setManager = new SetManager(this.user);
		setManager.beginListening(uid, () => {
			this.updateSetsList(setManager.getSets(), (index) => {
				const set = setManager.getSets()[index].id;
				if (set) {
					setManager.removeSet(set);
				} else {
					console.log('you messed up');
				}
			});
		});
		const button = document.querySelector('#modalButton') as HTMLButtonElement;
		button.innerHTML = 'Remove From Collection';
		if (this.user.uid !== uid) {
			button.style.display = 'none';
		}
	}

	initializePiecesCollection(page: string, uid: string): void {
		const searchBar = document.querySelector('#searchBar') as HTMLDivElement;
		searchBar.style.display = 'none';
		const piecesSelection = document.querySelector('#piecesSelection') as HTMLAnchorElement;
		piecesSelection.classList.add('active');
		piecesSelection.classList.add('active');
		const setsSelection = document.querySelector('#setsSelection') as HTMLAnchorElement;
		setsSelection.href = `/collection.html?uid=${uid}&set=true`;
		const pieceManager = new PieceManager(this.user);
		pieceManager.beginListening(uid, () => {
			this.updatePieceList(pieceManager.getPieces(), (index) => {
				const piece = pieceManager.getPieces()[index].id;
				if (piece) {
					pieceManager.removePiece(piece);
				} else {
					console.log('you messed up');
				}
			}, async (_, piece) => ([
				{
					name: piece.color ?? '',
					image: piece.image ?? ''
				}
			]));
		});
		const partButton = document.querySelector('#modalPartButton') as HTMLButtonElement;
		partButton.innerHTML = 'Remove From Collection';
		if (this.user.uid !== uid) {
			partButton.style.display = 'none';
		}
		piecesSelection.href = `/collection.html?uid=${uid}`;
		setsSelection.href = `/collection.html?uid=${uid}&set=true`;
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
				const newButton = button.cloneNode(true);
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

		const titles = document.querySelectorAll('.card-title');
		titles.forEach(element => {
			clamp(element as HTMLParagraphElement, { clamp: 3 });
		})
	}

	updatePieceList(pieces: Piece[], buttonFunction: (index: number) => void, getColors: (user: User, piece: Piece) => Promise<Color[]>): void {
		const newList = htmlToElement('<div id="listContainer" class="row"></div>') as HTMLDivElement;
		for (let i = 0; i < pieces.length; i++) {
			const newCard = this._createPieceCard(pieces[i]);
			newCard.addEventListener('click', () => {
				const newSelect = htmlToElement('<select id="colorListSelect"></select>') as HTMLSelectElement;
				getColors(this.user, pieces[i]).then((colors: Color[]) => {
					for (let i = 0; i < colors.length; i++) {
						const newOption = htmlToElement(`<option value=${i}>${colors[i].name}</option>`) as HTMLOptionElement;
						newSelect.add(newOption);
					}
					pieces[i].color = colors[0].name;
					pieces[i].image = colors[0].image;
					const oldSelect = document.querySelector('#colorListSelect') as HTMLSelectElement;
					oldSelect.removeAttribute('id');
					oldSelect.hidden = true;
					oldSelect.parentElement?.appendChild(newSelect);
					const partNameDisplay = document.querySelector('#modalPartName') as HTMLParagraphElement;
					const partTitleDisplay = document.querySelector('#modalPartTitle') as HTMLHeadingElement;
					const partImage = document.querySelector('#modalPartImage') as HTMLImageElement;
					const partNumDisplay = document.querySelector('#modalPartNumber') as HTMLParagraphElement;
					const button = document.querySelector('#modalPartButton') as HTMLButtonElement;
					const reload = () => {
						partNameDisplay.innerHTML = `Part Name: ${pieces[i].name}`;
						partTitleDisplay.innerHTML = pieces[i].partNumber;
						partImage.src = pieces[i].image;
						partNumDisplay.innerHTML = `Part Number: ${pieces[i].partNumber}`;
						const newButton = button.cloneNode(true);
						button.parentNode?.replaceChild(newButton, button);
						newButton.addEventListener('click', () => {
							buttonFunction(i);
						});
					}
					newSelect.addEventListener('change', (event: any) => {
						pieces[i].color = colors[event.target.value].name;
						pieces[i].image = colors[event.target.value].image;
						reload();
					});
					reload();
				});
				console.log('TODO: Create Piece Modal');
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

		const titles = document.querySelectorAll('.card-title');
		titles.forEach(element => {
			clamp(element as HTMLParagraphElement, { clamp: 3 });
		})
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
						<img class="mh-25 card-img-top" src="${piece.image}"
							alt="Card image cap">
						<div class="card-body" >
							<p class="card-title">${piece.name}</p>
						</div>
					</div>
				</div>`) as HTMLDivElement;
	}
}

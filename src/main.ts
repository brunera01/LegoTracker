import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import LoginController from './Controller/LoginController';
import CreateAccountController from './Controller/CreateAccountController'
import User from './Data/User';
import { UserManager } from './Model/UserManager';
import { CollectionController } from './Controller/CollectionController';

const firebaseConfig = {
	apiKey: 'AIzaSyB0j0AJr111FHLNuH6_7lJdgo4E-h92C6c',
	authDomain: 'legotracker-63157.firebaseapp.com',
	projectId: 'legotracker-63157',
	storageBucket: 'legotracker-63157.appspot.com',
	messagingSenderId: '510283508339',
	appId: '1:510283508339:web:6598cea8db658d749f9806',
	measurementId: 'G-4RCL0VVXHB'
};
firebase.initializeApp(firebaseConfig);

const authStateChanged = (user: User | null) => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	if (!user && !document.querySelector('#loginPage') && !document.querySelector('#createAccountPage')) {
		console.log('here');
		document.location.href = '/';
	} else if (user && (document.querySelector('#loginPage') || document.querySelector('#createAccountPage'))) {
		console.log('sign in successful');
		document.location.href = `/collection.html?uid=${user.uid}&set=true`;
	} else {
		if (user) {
			const isOnSetsPage = !!urlParams.get('set');
			new CollectionController(user, urlParams.get('page') ?? '1', isOnSetsPage, urlParams.get('uid') ?? undefined,urlParams.get('search')??undefined);
		}
	}
}

const userManager = new UserManager(authStateChanged);
if (document.querySelector('#loginPage')) {
	new LoginController(userManager);
} else if (document.querySelector('#createAccountPage')) {
	new CreateAccountController();
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createUser = exports.UserManager = void 0;
var firebase_1 = require("firebase");
var COLLECTION_NAME = 'users';
var API_KEY = 'apiKey';
var UserManager = /** @class */ (function () {
    function UserManager(changeListener) {
        var _this = this;
        this._user = null;
        this._unsubscribe = firebase_1["default"].auth().onAuthStateChanged(function (user) {
            console.log('Here');
            if (!user) {
                _this._user = null;
                changeListener(null);
                return;
            }
            _this.getApiKey(user.uid).then(function (APIKey) {
                if (user.email == null) {
                    console.error('null email');
                    return;
                }
                _this._user = { uid: user.uid, email: user.email, APIKey: APIKey };
                changeListener(_this._user);
            });
        });
    }
    UserManager.prototype.stopListening = function () {
        this._unsubscribe();
    };
    UserManager.prototype.signIn = function (email, password, handleSignInFailed) {
        firebase_1["default"].auth().signInWithEmailAndPassword(email, password)["catch"](function (error) {
            handleSignInFailed(error.message);
            console.error(error.message);
        });
    };
    UserManager.prototype.getApiKey = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firebase_1["default"].firestore().collection(COLLECTION_NAME).doc(uid).get()];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, doc.get(API_KEY)];
                }
            });
        });
    };
    UserManager.prototype.isUserSignedIn = function () {
        return !!this._user;
    };
    return UserManager;
}());
exports.UserManager = UserManager;
function createUser(username, password, APIKey, handleCreateAccountFailed) {
    firebase_1["default"].auth().createUserWithEmailAndPassword(username, password).then(function (credentials) {
        var _a;
        if (!credentials.user) {
            console.error('Error');
            return;
        }
        firebase_1["default"].firestore().collection(COLLECTION_NAME).doc(credentials.user.uid).set((_a = {},
            _a[API_KEY] = APIKey,
            _a));
    })["catch"](function (error) {
        handleCreateAccountFailed(error);
    });
}
exports.createUser = createUser;

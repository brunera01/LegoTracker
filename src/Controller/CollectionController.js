"use strict";
exports.__esModule = true;
exports.CollectionController = void 0;
var CollectionManager_1 = require("../Model/CollectionManager");
var util_1 = require("../util");
var CollectionController = /** @class */ (function () {
    function CollectionController(user, page, uid) {
        var _this = this;
        var searchButton = document.querySelector('#searchButton');
        var searchInput = document.querySelector('#searchText');
        console.log(searchInput);
        if (!searchInput || !(searchInput instanceof HTMLInputElement)) {
            console.error('could not find valid search input');
            return;
        }
        if (!uid) {
            CollectionManager_1.getItems(user, page, searchInput.value).then(function (setsResponse) {
                _this.updateList(setsResponse.sets);
            });
            console.log(searchButton);
            if (searchButton) {
                searchButton.addEventListener("click", function (event) {
                    console.log("hello");
                    CollectionManager_1.getItems(user, page, searchInput.value).then(function (setsResponse) {
                        _this.updateList(setsResponse.sets);
                    });
                });
            }
        }
    }
    CollectionController.prototype.updateList = function (sets) {
        var newList = util_1.htmlToDivElement('<div id="listContainer" class="row"></div>');
        var _loop_1 = function (i) {
            // console.log('another quote');
            var newCard = this_1._createCard(sets[i]);
            newCard.addEventListener('click', function () {
                var yearDisplay = document.querySelector('#modalYear');
                var setNumber = document.querySelector('#modalSetNumber');
                var setPieceCount = document.querySelector('#modalPieceCount');
                var setImage = document.querySelector('#modalImage');
                var setName = document.querySelector('#modalName');
                var button = document.querySelector('#modalButton');
                yearDisplay.innerHTML = "Year: " + sets[i].year;
                setNumber.innerHTML = "Set Number " + sets[i].setNumber;
                setPieceCount.innerHTML = "pieces: " + sets[i].pieceCount;
                setImage.src = sets[i].image;
                setName.innerHTML = sets[i].name;
                button.addEventListener('click', function () {
                    //todo later
                    console.log('figure this out later');
                });
                button.innerHTML = 'Add To Collection';
            });
            newList.appendChild(newCard);
        };
        var this_1 = this;
        for (var i = 0; i < sets.length; i++) {
            _loop_1(i);
        }
        var oldList = document.querySelector('#listContainer');
        if (!oldList || !(oldList instanceof HTMLDivElement) || !oldList.parentElement) {
            console.error('could not find list container element');
            return;
        }
        oldList.removeAttribute('id');
        oldList.hidden = true;
        oldList.parentElement.appendChild(newList);
    };
    CollectionController.prototype._createCard = function (set) {
        return util_1.htmlToDivElement("\n\t\t\t\t<div class=\"col-12 col-md-4 col-lg-3\">\n\t\t\t\t\t<div class=\"set-card card\" data-toggle=\"modal\" data-target=\"#setInfo\" >\n\t\t\t\t\t\t<img class=\"mh-25 card-img-top\" src=\"" + set.image + "\"\n\t\t\t\t\t\t\talt=\"Card image cap\">\n\t\t\t\t\t\t<div class=\"card-body\" >\n\t\t\t\t\t\t\t<h5 class=\"card-title\">" + set.name + "</h5>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>");
    };
    return CollectionController;
}());
exports.CollectionController = CollectionController;

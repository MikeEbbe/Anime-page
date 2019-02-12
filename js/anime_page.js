"use strict";

/**
 * Page variables
 */
var home = document.getElementById('home');
var completed = document.getElementById('completed');
var watching;
var planToWatch;
var titlePage = document.getElementById('title-page');

/**
 * Image zoom
 */
document.addEventListener('DOMContentLoaded', function () {
    var imgs = document.querySelectorAll('.table-img');
    Array.prototype.forEach.call(imgs, function (el, i) {
        if (el.tabIndex <= 0) el.tabIndex = 10000;
    });
});

// Hide all pages
function hideAllPages() {
    home.style.display = 'none';
    completed.style.display = 'none';
    titlePage.style.display = 'none';
}

// Show home page
function showHome() {
    hideAllPages();
    home.style.display = 'block';
}

// Show completed page
function showCompleted() {
    hideAllPages();
    completed.style.display = 'block';
}

// Show title page
function showTitlePage() {
    hideAllPages();
    titlePage.style.display = 'block';
}

// Go to coresponding title onclick
var titles = document.getElementsByClassName('title');
for (var i = 0; i < titles.length; i++) {
    titles[i].addEventListener('click', showTitlePage);
}

/**
 * Add button actions
 */
function addButtonActions() {
    var homeButton = document.getElementById('home-button');
    var completedButton = document.getElementById('completed-button');

    homeButton.addEventListener("click", function () {
        showHome();
    });

    completedButton.addEventListener("click", function () {
        showCompleted();
    });
}

// Initialize
showHome();
addButtonActions();
// console.log(titles[0].innerHTML);
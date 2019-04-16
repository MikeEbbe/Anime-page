"use strict";

/*jshint esversion: 6 */

/**
 * Page variables
 */
var home = document.getElementById('home');
var completed = document.getElementById('completed');
var watching;
var planToWatch;
var titlePage = document.getElementById('title-page');
var backToCompleted = document.getElementById("back-to-completed");
var addTitleButton = document.getElementById("add-title-button");
var noSpacesTitle;
var getSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://titlelist-85ef.restdb.io/rest/title-list",
    "method": "GET",
    "headers": {
        "content-type": "application/json",
        "x-apikey": "5cae686593d77c26f9734a8d",
        "cache-control": "no-cache"
    }
};

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
    backToCompleted.style.display = 'none';
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
    backToCompleted.style.display = 'block';
}

// Converts all new words to capitalized
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Shows the info about the clicked anime
function showTitleInfo(id, title, type, episodes, summary, review, image1, image2, image3, image4, info1, info2, info3, info4, stat1, stat2, stat3, stat4) {
    console.log(id, title, type, episodes, summary, review, image1, image2, image3, image4, info1, info2, info3, info4, stat1, stat2, stat3, stat4);

    document.getElementById("title-text").innerHTML = title + " (" + type + ")";
    document.getElementById("summary").innerHTML = summary;
    document.getElementById("review").innerHTML = review;
    changeSlideImg(image1, image2, image3, image4);
    changeInfo(info1, info2, info3, info4);
    changeStats(stat1, stat2, stat3, stat4);

    showTitlePage();
}

// Function to sort by title ascending
function preSort(a, b) {
    const titleA = a.series_title.toUpperCase();
    const titleB = b.series_title.toUpperCase();

    let comparison = 0;
    if (titleA > titleB) {
        comparison = 1;
    } else if (titleA < titleB) {
        comparison = -1;
    }
    return comparison;
}

// Generates completed titles in table
function renderTitleTable(response) {
    response.sort(preSort);
    // for (var i = 0; i < response.length; i++) {
    Array.from(response).forEach(function (currentTitle) {
        if (currentTitle.my_status == "Completed") {
            var tableContent = document.getElementById("table-content");

            // Replaces weird symbols with normal symbols
            var noDubbleQuotes = currentTitle.series_title.replace(/[/\"/]/g, "\'"); // Check of dit weg kan
            var sanitizedTitle = currentTitle.series_title.replace(/[ä]/g, "a");
            sanitizedTitle = sanitizedTitle.replace(/[-;]/g, " ");
            sanitizedTitle = sanitizedTitle.replace(/[Ψ]/g, "Psi");
            sanitizedTitle = sanitizedTitle.replace(/[√]/g, "Root ");
            // Capitalizes each new word
            var capitalizedTitle = toTitleCase(sanitizedTitle);
            // Deletes spaces in the title
            noSpacesTitle = capitalizedTitle.replace(/[^A-Za-z0-9]/g, '');

            currentTitle.image1 = "img/slideshow-images/image1/" + noSpacesTitle + "1.jpg"
            currentTitle.image2 = "img/slideshow-images/image2/" + noSpacesTitle + "2.jpg"
            currentTitle.image3 = "img/slideshow-images/image3/" + noSpacesTitle + "3.jpg"
            currentTitle.image4 = "img/slideshow-images/image4/" + noSpacesTitle + "4.jpg"

            // Renders titles in the table
            tableContent.innerHTML += "<tr>" +
                "<td><img src='img/table-images/" + noSpacesTitle + ".bmp' class='table-img'></td>" +
                `<td><span onclick="showTitleInfo('${currentTitle._id}', '${currentTitle.series_title}', '${currentTitle.series_type}', '${currentTitle.series_episodes}', '${currentTitle.summary}', '${currentTitle.review}', '${currentTitle.image1}', '${currentTitle.image2}', '${currentTitle.image3}', '${currentTitle.image4}', '${currentTitle.info1}', '${currentTitle.info2}', '${currentTitle.info3}', '${currentTitle.info4}', '${currentTitle.stats1}', '${currentTitle.stats2}', '${currentTitle.stats4}', '${currentTitle.stats4}')" class="title">${
                noDubbleQuotes
                }</span>` + '<button onclick="deleteTitle(\'' + currentTitle._id + '\', \'' + currentTitle.series_title + '\')" class="delete-title">-</button>' + "</td>" +
                "<td>" + currentTitle.my_score + "</td>" +
                "<td>" + currentTitle.my_watched_episodes + "</td>" +
                '<td>' + currentTitle.series_episodes + '</td>' +
                "</tr>";
            console.log(currentTitle);
        }
    });
}

/*
function addClasses() {
    [...document.querySelectorAll('.title')].forEach(function (item) {
        item.addEventListener('click', function () {
            console.log(item);
            console.log(item.innerHTML);
            // console.log(newTest[0][item]._id);
        });
    })
}*/

function clearTable() {
    var tableContent = document.getElementById("table-content");
    tableContent.innerHTML = "";
}

function deleteTitle(id, title) {
    var confirmDeletion = confirm("Do you want to delete " + title + "?");

    if (confirmDeletion === true) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://titlelist-85ef.restdb.io/rest/title-list/" + id,
            "method": "DELETE",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "5cae686593d77c26f9734a8d",
                "cache-control": "no-cache"
            }
        };
        $.ajax(settings).done(function (response) {
            console.log("Title deleted:", response);
            clearTable();
            $.ajax(getSettings).done(function (response) {
                renderTitleTable(response);
                console.log("New response:", response);
            });
        });
    }
}

// Adds a new title to the anime array
function addTitle() {
    var title = document.getElementById("title-input");
    var status = document.getElementById("status-input");
    var score = document.getElementById("ageInputId");
    var watchedEps = document.getElementById("watched-eps-input");
    var totalEps = document.getElementById("total-eps-input");

    var jsondata = {
        "series_title": title.value,
        "series_type": "",
        "series_episodes": totalEps.value,
        "my_watched_episodes": watchedEps.value,
        "my_score": score.value,
        "my_status": status.value,
        "summary": "",
        "review": "",
        "image1": "",
        "image2": "",
        "image3": "",
        "image4": "",
        "info1": "",
        "info2": "",
        "info3": "",
        "info4": "",
        "stat1": "",
        "stat2": "",
        "stat3": "",
        "stat4": ""
    };
    var postSettings = {
        "async": true,
        "crossDomain": true,
        "url": "https://titlelist-85ef.restdb.io/rest/title-list",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "5cae686593d77c26f9734a8d",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
    };

    console.log(jsondata);
    $.ajax(postSettings).done(function () {
        clearTable();
        $.ajax(getSettings).done(function (response) {
            renderTitleTable(response);
            console.log("New response:", response);
        });
    });
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

    addTitleButton.addEventListener("click", function () {
        addTitle();
    });

    backToCompleted.addEventListener("click", function () {
        showCompleted();
    });
}

function changeSlideImg(img1, img2, img3, img4) {
    var slideShow = document.getElementById("slideshow");

    var slide1 = slideShow.children[3];
    var slide2 = slideShow.children[2];
    var slide3 = slideShow.children[1];
    var slide4 = slideShow.children[0];

    slide1.src = img1;
    slide2.src = img2;
    slide3.src = img3;
    slide4.src = img4;
}

function changeInfo(inf1, inf2, inf3, inf4) {
    var list1 = document.getElementsByClassName("list-property")[0];
    var list2 = document.getElementsByClassName("list-property")[1];
    var list3 = document.getElementsByClassName("list-property")[2];
    var list4 = document.getElementsByClassName("list-property")[3];

    list1.innerHTML = inf1;
    list2.innerHTML = inf2;
    list3.innerHTML = inf3;
    list4.innerHTML = inf4;
}

function changeStats(stat1, stat2, stat3, stat4) {
    var statsList = document.getElementById("stats-list");

    var data1 = statsList.children[0];
    var data2 = statsList.children[1];
    var data3 = statsList.children[2];
    var data4 = statsList.children[3];

    data1.innerHTML = stat1;
    data2.innerHTML = stat2;
    data3.innerHTML = stat3;
    data4.innerHTML = stat4;
}

// Initialize
showHome();
addButtonActions();
$.ajax(getSettings).done(function (response) {
    renderTitleTable(response);
    console.log("Response:", response);
});
console.log(titleList);
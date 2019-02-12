// /**
//  * Slideshow
//  */
// var i = 0; // Start point
// var steinsGateImages = ['img/table-images/steins-gate.bmp', 'img/table-images/steins-gate.bmp', 'img/table-images/watamote.bmp'];
// var attackOnTitanImages = ['img/table-images/attack-on-titan.bmp', 'img/table-images/attack-on-titan.bmp', 'img/table-images/watamote.bmp'];
// var deathNoteImages = ['img/table-images/death-note.bmp', 'img/table-images/death-note.bmp', 'img/table-images/watamote.bmp'];
// var time = 3000;

// /**
//  * Change Image
//  */
// // Steins;Gate
// function changeImgSteinsGate() {
//     document.slide.src = steinsGateImages[i];

//     if (i < (steinsGateImages.length - 1)) {
//         i++;
//     } else {
//         i = 0;
//     }

//     setTimeout("changeImgSteinsGate()", time);
// }

// // Attack on Titan
// function changeImgAttackOnTitan() {
//     document.slide.src = attackOnTitanImages[i];

//     if (i < (attackOnTitanImages.length - 1)) {
//         i++;
//     } else {
//         i = 0;
//     }

//     setTimeout("changeImgAttackOnTitan()", time);
// }

// // Death Note
// function changeImgDeathNote() {
//     document.slide.src = deathNoteImages[i];

//     if (i < (deathNoteImages.length - 1)) {
//         i++;
//     } else {
//         i = 0;
//     }

//     setTimeout("changeImgDeathNote()", time);
// }

// window.onload = changeImgSteinsGate;
// window.onload = changeImgAttackOnTitan;
// window.onload = changeImgDeathNote;
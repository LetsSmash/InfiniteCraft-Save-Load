// ==UserScript==
// @name         InfiniteCraft Load & Save
// @version      2024-02-20
// @description  Just a Basic Userscript to handle Save and Loading Functionality in Neal.Fun's Infinite Craft
// @author       LetsSmash
// @homepage     https://github.com/LetsSmash/InfiniteCraft-Save-Load
// @match        https://neal.fun/infinite-craft/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://raw.githubusercontent.com/eligrey/FileSaver.js/master/src/FileSaver.js
// ==/UserScript==

(function() {
    'use strict';

    const x = document.querySelector("body");

    const content = window.localStorage.getItem("infinite-craft-data");

    const blob = new Blob([content], {type: "text/plain;charset=utf-8"});

    const button = document.createElement("button");

    button.innerHTML = "Save";
    button.style.marginLeft = "150px";
    button.style.marginTop = "1em";
    button.style.position = 'absolute'; // Set position to absolute for simplicity
    button.style.top = '0px'; // Adjust top position
    button.style.left = '0px'; // Adjust left position

    const button2 = document.createElement("button");

    button2.innerHTML = "Load";
    button2.style.marginLeft = "13px";
    button2.style.marginTop = "1em";
    button2.style.position = 'absolute';
    button2.style.top = '0px';
    button2.style.left = '200px';

    const datenow = new Date();
    const fulldate = datenow.getFullYear() + "-" + datenow.getDate() + "-" + Math.floor(datenow.getMonth() + 1)

    function download() {
        saveAs(blob, `InfiniteCraftSave-${fulldate}.txt`);
    }

    button.addEventListener("click", download);

    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none'; // Hide the file input element

    // Add event listener to the file input element
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const fileContent = event.target.result;
            window.localStorage.setItem("infinite-craft-data", `${fileContent}`)
        };

        // Read the file as text
        reader.readAsText(file);
    });

    button2.addEventListener('click', function() {
        // Trigger click event on the file input element
        fileInput.click();
    });
    x.append(button);
    x.append(button2);
})();

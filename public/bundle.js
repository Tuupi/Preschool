/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("        const res = fetch(\"/comments\", {method: \"GET\"}).then(res => res.json()).then(datares => datares.forEach(item=>{\r\n            var div = document.createElement(div);\r\n            div.innerHTML =  item.name + \"<br>\" + item.email + \"<br>\" + item.comment + \"<br>\";\r\n            // div.classList.add(\"bg-white\");\r\n            div.classList.add(\"my-6\");\r\n            div.classList.add(\"p-4\");\r\n            div.classList.add(\"rounded-lg\");\r\n            div.classList.add(\"shadow-md\");\r\n            document.getElementById(\"commentcontent\").appendChild(div);\r\n        }))\r\n\r\n\r\nconst addCommentForm = document.querySelector('#Comment-form')\r\naddCommentForm.addEventListener('submit', (e) => {\r\n    e.preventDefault\r\n    const formData = JSON.stringify({\r\n        name: addCommentForm.name.value,\r\n        email: addCommentForm.email.value,\r\n        comment: addCommentForm.comment.value\r\n    });\r\n\r\n    console.log(formData)\r\n    fetch(\"/comments\",{\r\n        method: \"POST\",\r\n        headers: {\r\n            'Content-Type':'application/json',\r\n            'Accept':'application/json'\r\n        },\r\n        body: formData\r\n    }).then(response => response.json()).then(response => console.log(response));\r\n\r\n})\r\n\n\n//# sourceURL=webpack://preschool/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;
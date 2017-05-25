"use strict";

window.addEventListener("load", (e) => {
  console.log("load");

  document.getElementById("imageView").addEventListener("mouseover", (e) => {
    console.log("mouseover");
  });
  document.getElementById("imageView").addEventListener("mouseout", (e) => {
    console.log("mouseout");
  });
});


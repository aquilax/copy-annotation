var sp = new URLSearchParams(window.location.search);

const text = `${sp.get("selection")} [${sp.get("title")}](${sp.get("url")})`;

console.log(text);
var ta = document.querySelector("textarea");
ta.value = text;

document.querySelector("#copy").onclick = event => {
  event.preventDefault();
  ta.select();
  document.execCommand("copy");
};

import "@babel/polyfill"

import image from "../assets/image.png";

import "./style.css";

var btn = document.createElement("button");
btn.innerHTML = "新增";
document.body.appendChild(btn);

btn.onclick = function () {
  var div = document.createElement("div");
  div.innerHTML = "item";
  document.body.appendChild(div);
  console.log("item", div?.innerHTML + "123");

  // es6 语法转换
  const sayHello = () => {
    const message = `Hello ES${6}`;
    console.log(message);
  };
  class Demo {}
  sayHello();
};

export const greet = (name: string): string => {
  return `Hello, ${name}! Welcome to 01webpack.`;
};
export const farewell = (name: string): string => {
  return `Goodbye, ${name}!`;
};

export const getImage = () => {
  return image;
};

console.log(greet("John"));

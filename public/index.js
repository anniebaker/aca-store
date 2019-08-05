// Code goes here
const bootstrap = require("bootstrap");

let state = {
  searchText: "",
  currentProductToAdd: null
}
let cart = [];
let addCartButton = null;
let txtEmail = null;
let txtPassword = null;
let btnSignUp = null;
let signup = null;
let home = null;
let mainDiv = null;
let Users = [];
let products = [];
let id = 0;


window.onload = function () {
  fetch("https://acastore.herokuapp.com/products")
    .then(response => response.json())
    .then(myJson => (products = myJson))
    .then(products => {
      console.log(products)
      listProducts(products);
    })
  mainDiv = document.getElementById("main");
  signup = document.getElementById("signup");
  home = document.getElementById("home");


  addCartButton = document.getElementById("btnAddToCart");
  txtEmail = document.getElementById("email");
  txtPassword = document.getElementById("password");
  btnSignUp = document.getElementById("btnSignUp");
  btnSignUp.onclick = signUp;
}

class User {
  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}

function signUp() {
  txtEmail = document.getElementById("email");
  txtPassword = document.getElementById("password");
  id += 1;
  let newUser = new User(id, txtEmail.value, txtPassword.value);
  Users.push(newUser);
  console.log(Users);
  document.getElementById("home").style.display = "block";
  document.getElementById("signup").style.display = "none";
  fetch("https://acastore.herokuapp.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  }).then(response => {
    console.log("response: ", response.json());
  });

}

function searchTextChanged(e) {
  state.searchText = e.value;
}
function search() {
  let filteredProducts = products.filter(p => p.name.indexOf(state.searchText) > -1);
  listProducts(filteredProducts);
}

function showProductDetail(id) {
  addCartButton.style.display = "block";
  let product = products.find(p => p.id === id);
  state.currentProductToAdd = product;
  mainDiv.innerHTML = product.description;
}
function listProducts(products) {
  let prodDivs = products.map(p => {
    return `<hr><div onclick="showProductDetail(${p.id})">${p.name}</div>`

  });
  mainDiv.innerHTML = prodDivs.join("");
}
function addToCart(prod) {
  cart.push(prod);
  showHome();
}
function showHome() {
  addCartButton.style.display = "none";
  state.currentProductToAdd = null;
  listProducts(products);
}
function placeOrder() {

}
function showCart() {
  listProducts(cart);
  var e = document.createElement('div');
  e.innerHTML = "<button onClick='placeOrder()'>Place Order</button>";
  mainDiv.appendChild(e);
}
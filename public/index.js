function Products(products) {
  let productDivs = "";
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    productDivs += `<div>
    <div>${product.name}</div>
    <button onclick="ProductDetail(${product.id})">View Details</button>
    <button onclick="AddCart(${product.id})">Add to Cart</button>
    </div>`;
  }
  document.getElementById("products").innerHTML = productDivs;
}

window.onload = () => {
  Products(products);
};

function ProductDetail(id) {
  let prod = products.find(p => p.id === id);
  document.getElementById("productDetail").innerHTML = `
  <div>Average rating of ${FindAverage(id)} from ${
    prod.reviews.length
  } reviews</div>
  <div>${prod.description}</div>
  <div>${prod.price}</div>`;
}

function FindAverage(id) {
  let prod = products.find(p => p.id === id);
  let averageRating =
    Math.round(
      (prod.reviews.map(p => p.rating).reduce((a, b) => a + b) /
        prod.reviews.length) *
        10
    ) / 10;
  return averageRating;
}

let cart = [];
function AddCart(id) {
  let prod = products.find(p => p.id === id);
  cart.push(prod);
  let cartItems = cart
    .map(p => {
      return `
      <div id="cartRow">
      <div>${p.name}</div>
      <div>${p.price}</div>
      Quantity: 
      <select id="quantityDropdown" onchange="howMany(${p.id}, value)">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
    </select>
      <button onclick="removeCart()">Remove</button>
      </div>`;
      // let e = document.getElementById("quantityDropdown");
      // let mult = e.options[e.selectedIndex].value;
      // let newPrices = cart.map(p => Number(p.price.substr(1))) * mult;
      // console.log(newPrices);
    })
    .join(" ");
  document.getElementById("cart").innerHTML = `
  <div>${cartItems} </div>`;
}
function howMany(prodID, qty) {
  let product = cart.find(p => p.id === prodID);
  product.quantity = Number(qty);
  console.log(product.quantity);
}

function removeCart() {
  let cartElement = document.getElementById("cartRow");
  console.log(cartElement);
}

function search() {
  let searchWord = document.getElementById("search").value.toLowerCase();
  let filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchWord)
  );
  Products(filteredProducts);
  document.getElementById("search").value = "";
}

function categorySearch(cat) {
  if (cat.toLowerCase() === "all") {
    Products(products);
  } else {
    let filteredCategories = products.filter(
      p => p.category === cat.toLowerCase()
    );
    Products(filteredCategories);
  }
}

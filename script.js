// Data
const productsData = fetch("data/data.json")
  .then((res) => res.json())
  .then((datas) => displayProducts(datas));

// DOM Selectors
const labelProducts = document.querySelector(".products");
const labelBrands = document.querySelector(".brands");
const labelCategory = document.querySelector(".categories");
const labelCollections = document.querySelector(".collection");
const viewCarts = document.querySelector(".view__cart");
const cartList = document.querySelector(".cart__list");
const closeCart = document.querySelector(".close__cart");
const cartListDetails = document.querySelector(".cart__list__details");
// Global Scope
let brands = [];
let categories = [];
let collectionTypes = [];
let totalProducts = [];
let selectedProducts = [];
let totalSelectedItems = [];
let cart = [];

// All Functions
const displayProducts = (products) => {
  let htmlString = "";
  products.map((product) => {
    totalProducts = [...totalProducts, product];
    htmlString += `<div class="products__product">
                               <div>
                                   <img src=${product.image}alt=""/>
                               </div>
                               <div class="column">
                                   <div><strong>${product.name}</strong></div>
                                   <div><strong>Price:</strong> <span>$${product.price}</span></div>
                                   <div><strong>Category:</strong> <span>${product.category}</span></div>
                                   <div>
                                   <strong>Available Color:</strong> <span>${product.color}</span>
                                   </div>
                                   <div><button onclick="addToCart(${product.id})">Add to Cart</button></div>
                                </div>
                            </div>`;
  });
  labelProducts.insertAdjacentHTML("beforeEnd", htmlString);
  displayBrands(products);
  displayCategory(products);
  displayCollectionTypes(products);
};

const itemsIncrease = (id) => {
    const addedProduct = totalProducts.find((product) => product.id === id);
    if(addedProduct.quantity){
      addedProduct.quantity++;
    }else{
        addedProduct.quantity=1;
    }
    console.log(id)
};

const itemsDecrease = () => {};

const itemRemove = () => {};

const addToCart = (id) => {
    const addedProduct = totalProducts.find((product) => product.id === id)
    console.log(addedProduct.quantity);
    if(addedProduct.quantity){
        addedProduct.quantity += 1;
    }else{
        addedProduct.quantity = 1;
        cart = [...cart, addedProduct];
        displayCart()
    }
    // console.log(addedProduct.quantity)
}

const displayCart = () => {
    console.log(cart)
    const filteredItems = cart.filter((item) => item.quantity === 1);
    const cartItems = document.createElement('div');
    filteredItems.map((item) => {
            cartItems.innerHTML = `
            <div class="cart__list__detail">
                <div class="inc-dec">
                <div><i class="fa-solid fa-plus plus" onclick="itemsIncrease(${item.id})"></i></div>
                <div><strong>${item.quantity}</strong></div>
                <div><i class="fa-solid fa-minus minus"></i></div>
            </div>
            <div>
                <img src=${item.image}/>
            </div>
            <div>
                <p><strong>${item.name}</strong></p>
                <p>${item.price}/piece</p>
            </div>
            <div>${item.price}<strong>$</strong></div>
            <div><i class="fa-solid fa-xmark cross" onclick="itemRemove(${item.id})"></i></div>
            </div>
        `;
        
    });
    cartListDetails.appendChild(cartItems);
}


const displayBrands = (products) => {
  let brandsString = "";
  products.filter((product) => {
    if (brands.includes(product.brand)) {
      return false;
    } else {
      brands = [...brands, product.brand];
    }
    brandsString += `<input type="checkbox"> ${product.brand}`;
  });
  labelBrands.insertAdjacentHTML("beforeEnd", brandsString);
};

const displayCategory = (products) => {
  let categoryString = "";
  products.filter((product) => {
    if (categories.includes(product.category)) {
      return false;
    } else {
      categories = [...categories, product.category];
    }
    categoryString += ` <input type="checkbox" id="category"/>
        <label for="category">${product.category}</label>`;
  });
  labelCategory.insertAdjacentHTML("beforeend", categoryString);
};

const displayCollectionTypes = (products) => {
  let collectionString = "";
  products.filter((product) => {
    if (collectionTypes.includes(product.collectionType)) {
      return;
    } else {
      collectionTypes = [...collectionTypes, product.collectionType];
    }
    collectionString += `<input type="checkbox" name="${product.collectionType}" id="${product.collectionType}"> ${product.collectionType}`;
  });
  labelCollections.insertAdjacentHTML("beforeend", collectionString);
};

const displayViewCart = () => {
  cartList.classList.add("active");
};

const hideCart = () => {
  cartList.classList.remove("active");
};

// Event Listener
viewCarts.addEventListener("click", displayViewCart);
closeCart.addEventListener("click", hideCart);

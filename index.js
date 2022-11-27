// http://localhost:3000/items

const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".products-center");
const btns = document.querySelectorAll(".btn");
let allProductsData = [];
const filters = {
    searchItems: "",
}

document.addEventListener('DOMContentLoaded', () => {
    axios
        .get('http://localhost:3000/items')
        .then((res) => {
            allProductsData = res.data;
            // render products on DOM
            renderProducts(res.data, filters);
        })
        .catch((err) => console.log(err));
});

function renderProducts(_products, _filters) {
    const filteredProducts = _products.filter(p => {
        return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
    });
    productsDOM.innerHTML = "";
    // render to DOM
    filteredProducts.forEach((item, index) => {
        const productsDiv = document.createElement('div');
        productsDiv.classList.add("product");
        productsDiv.innerHTML = `
        <div class="img-container">
            <img src=${item.image} alt="p-${index}" class="product-img">
        </div>
        <div class="product-description">
            <p class="product-price">${item.price} $</p>
            <p class="product-title">${item.title}</p>
        </div>`;
        productsDOM.appendChild(productsDiv);
    });
}

searchInput.addEventListener("input", (e) => {
    filters.searchItems = e.target.value;
    renderProducts(allProductsData, filters);
});

// filter based on groups

btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        filters.searchItems = filter;
        renderProducts(allProductsData, filters);
    });
});
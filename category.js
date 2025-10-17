document.addEventListener("DOMContentLoaded", () => {
  // Cập nhật số lượng giỏ hàng
  const cartCount = document.getElementById("cart-count");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    if (cartCount) {
      cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    }
  }
  // Lấy tham số loại danh mục từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const categoryType = urlParams.get("type");
  const categoryTitle = document.getElementById("category-title");
  const productGrid = document.getElementById("category-product-grid");
  const brandFilter = document.getElementById("brand-filter");
  const priceSort = document.getElementById("price-sort");

  let allProducts = Object.values(PRODUCTS);
  let categoryProducts = allProducts.filter((p) => p.category === categoryType);

  function renderProducts(productsToRender) {
    productGrid.innerHTML = "";
    if (productsToRender.length === 0) {
      productGrid.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
      return;
    }

    productsToRender.forEach((product) => {
      const defaultOption = product.options[0];
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      // Sửa lại cách lấy ID sản phẩm cho chính xác
      const productId = Object.keys(PRODUCTS).find(
        (key) => PRODUCTS[key] === product
      );
      productCard.innerHTML = `
                <img src="${product.defaultImage}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${defaultOption.price.toLocaleString(
                  "vi-VN"
                )}₫</p>
                <div class="actions">
                    <a href="product.html?id=${productId}" class="btn-view-detail">Xem chi tiết</a>
                </div>
            `;
      productGrid.appendChild(productCard);
    });
  }
  // Tạo tùy chọn bộ lọc thương hiệu
  function populateBrandFilter() {
    const brands = [...new Set(categoryProducts.map((p) => p.brand))];
    brands.forEach((brand) => {
      const option = document.createElement("option");
      option.value = brand;
      option.textContent = brand;
      brandFilter.appendChild(option);
    });
  }
  // Áp dụng bộ lọc và sắp xếp
  function applyFiltersAndSort() {
    let filteredProducts = [...categoryProducts];
    const selectedBrand = brandFilter.value;
    if (selectedBrand !== "all") {
      filteredProducts = filteredProducts.filter(
        (p) => p.brand === selectedBrand
      );
    }
    const sortMethod = priceSort.value;
    if (sortMethod === "price-asc") {
      filteredProducts.sort((a, b) => a.options[0].price - b.options[0].price);
    } else if (sortMethod === "price-desc") {
      filteredProducts.sort((a, b) => b.options[0].price - a.options[0].price);
    }
    renderProducts(filteredProducts);
  }

  brandFilter.addEventListener("change", applyFiltersAndSort);
  priceSort.addEventListener("change", applyFiltersAndSort);

  if (categoryTitle) categoryTitle.textContent = categoryType;

  updateCartCount(); // Gọi hàm cập nhật giỏ hàng
  populateBrandFilter();
  renderProducts(categoryProducts);
});

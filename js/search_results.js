document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get("q") || "";
  const resultsGrid = document.getElementById("search-results-grid");
  const resultsTitle = document.getElementById("search-results-title");

  // Đảm bảo đối tượng PRODUCTS đã được load
  if (typeof PRODUCTS === "undefined") {
    resultsGrid.innerHTML =
      "<p>Lỗi: Không tìm thấy dữ liệu sản phẩm.</p>";
    return;
  }
  
  // Cập nhật tiêu đề trang
  if (resultsTitle) {
      resultsTitle.textContent = `Kết quả tìm kiếm cho: "${searchTerm}"`;
  }

  /**
   * Hàm hiển thị sản phẩm tương tự như trong script.js
   * @param {Object} productsToRender - Đối tượng chứa các sản phẩm cần hiển thị.
   */
  function renderSearchResults(productsToRender) {
    if (!resultsGrid) return;

    resultsGrid.innerHTML = "";
    if (Object.keys(productsToRender).length === 0) {
      resultsGrid.innerHTML =
        "<p>Không tìm thấy sản phẩm nào phù hợp với từ khóa này.</p>";
      return;
    }

    for (const productId in productsToRender) {
      const product = productsToRender[productId];
      const defaultOption = product.options[0];
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
                <img src="${product.defaultImage}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${defaultOption.price.toLocaleString(
                  "vi-VN"
                )}₫</p>
                <div class="actions">
                    <button class="btn-add-cart" data-product-id="${productId}">Thêm vào giỏ</button>
                    <a href="product.html?id=${productId}" class="btn-view-detail">Xem chi tiết</a>
                </div>
            `;
      resultsGrid.appendChild(productCard);
    }
  }

  /**
   * Lọc sản phẩm theo từ khóa tìm kiếm.
   * @param {string} query - Từ khóa tìm kiếm.
   */
  function filterProductsByQuery(query) {
    const lowerCaseQuery = query.toLowerCase().trim();
    const filteredProducts = {};

    for (const productId in PRODUCTS) {
      const product = PRODUCTS[productId];
      // Tìm kiếm theo tên sản phẩm
      if (product.name.toLowerCase().includes(lowerCaseQuery)) {
        filteredProducts[productId] = product;
      }
    }
    renderSearchResults(filteredProducts);
  }

  // Thực hiện tìm kiếm khi trang tải
  filterProductsByQuery(searchTerm);

  // Thêm xử lý cho thanh tìm kiếm trên trang kết quả (nếu cần tìm kiếm tiếp)
  const searchInputResults = document.getElementById("search-input-results");
  const searchButtonResults = document.getElementById("search-button-results");
  
  if (searchInputResults) {
      // Điền từ khóa tìm kiếm hiện tại vào ô input
      searchInputResults.value = searchTerm;
  }

  if (searchButtonResults && searchInputResults) {
      searchButtonResults.addEventListener('click', () => {
          const newSearchTerm = searchInputResults.value.trim();
          if (newSearchTerm.length > 0) {
              // Chuyển hướng đến trang kết quả tìm kiếm mới
              window.location.href = `search_results.html?q=${encodeURIComponent(newSearchTerm)}`;
          }
      });
      searchInputResults.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
              e.preventDefault();
              searchButtonResults.click();
          }
      });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const productGrid = document.getElementById("product-grid");
  const cartCount = document.getElementById("cart-count");
  const userSection = document.getElementById("user-section");
  
  // KHỞI TẠO BIẾN TÌM KIẾM VÀ ĐỀ XUẤT
  const searchInput = document.getElementById("search-input");
  const suggestionsContainer = document.getElementById("search-suggestions");

  // Cập nhật số lượng giỏ hàng
  function updateCartCount() {
    if (cartCount) {
      cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    }
  }
  // Hiển thị thông tin người dùng
  function displayUser() {
    if (userSection) {
      if (currentUser) {
        userSection.innerHTML = `
                <div class="nav-button">
                    <i class="fa-solid fa-user"></i>
                    <div class="user-info-text">
                        <span>Xin chào, ${currentUser.name}</span>
                        <a href="#" id="logout-btn">Đăng xuất</a>
                    </div>
                </div>
                `;
        document.getElementById("logout-btn").addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("currentUser");
          alert("Bạn đã đăng xuất.");
          window.location.reload();
        });
      } else {
        userSection.innerHTML = `
                <a href="login.html" class="nav-button">
                    <i class="fa-solid fa-user"></i>
                    <span>Đăng nhập</span>
                </a>
                `;
      }
    }
  }
  // Render danh sách sản phẩm
  function renderProducts() {
    if (!productGrid) return;
    productGrid.innerHTML = "";
    for (const productId in PRODUCTS) {
      const product = PRODUCTS[productId];
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
      productGrid.appendChild(productCard);
    }
  }
  // Xử lý sự kiện thêm vào giỏ hàng
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-add-cart")) {
      const productId = event.target.dataset.productId;
      const product = PRODUCTS[productId];
      const defaultOption = product.options[0];
      addToCart(
        productId,
        product.name,
        defaultOption.price,
        product.defaultImage
      );
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    }
  });
  // Thêm sản phẩm vào giỏ hàng
  function addToCart(id, name, price, image, quantity = 1) {
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ id, name, price, image, quantity });
    }
    saveCart();
    updateCartCount();
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // --- HÀM TÌM KIẾM CHÍNH (Kích hoạt bằng Enter) ---
  function executeSearch() {
    if (!searchInput) return;
    const searchTerm = searchInput.value.trim();
    if (searchTerm.length > 0) {
      // Chuyển hướng đến trang kết quả tìm kiếm với từ khóa
      window.location.href = `search_results.html?q=${encodeURIComponent(
        searchTerm
      )}`;
      if (suggestionsContainer) {
          suggestionsContainer.style.display = 'none';
      }
    } else {
      alert("Vui lòng nhập từ khóa tìm kiếm.");
    }
  }

  // --- LOGIC TÌM KIẾM VÀ ĐỀ XUẤT ---
  if (searchInput && suggestionsContainer && typeof PRODUCTS !== "undefined") {
    
    // XỬ LÝ SỰ KIỆN NHẬP (INPUT) CHO ĐỀ XUẤT
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      suggestionsContainer.innerHTML = "";

      if (searchTerm.length === 0) {
        suggestionsContainer.style.display = "none";
        return;
      }

      const maxSuggestions = 5;
      let suggestionCount = 0;

      for (const productId in PRODUCTS) {
        const product = PRODUCTS[productId];
        const productName = product.name;

        // Lọc: Chỉ lấy các sản phẩm có category là 'Điện thoại' và tên chứa từ khóa
        const isPhone = product.category && product.category === "Điện thoại";

        if (isPhone && productName.toLowerCase().includes(searchTerm)) {
          if (suggestionCount >= maxSuggestions) break;

          const suggestionItem = document.createElement("a");
          suggestionItem.className = "suggestion-item";
          suggestionItem.textContent = productName;
          suggestionItem.href = `product.html?id=${productId}`; // Link trực tiếp đến trang chi tiết

          suggestionsContainer.appendChild(suggestionItem);
          suggestionCount++;
        }
      }

      // Hiển thị/Ẩn container đề xuất
      if (suggestionCount > 0) {
        suggestionsContainer.style.display = "block";
      } else {
        suggestionsContainer.style.display = "none";
      }
    });

    // XỬ LÝ SỰ KIỆN ENTER ĐỂ TÌM KIẾM
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Ngăn hành vi mặc định của form
        executeSearch();
      }
    });

    // Xử lý đóng đề xuất khi click ngoài
    document.addEventListener("click", (e) => {
      if (
        !e.target.closest(".search-bar") &&
        suggestionsContainer.style.display === "block"
      ) {
        suggestionsContainer.style.display = "none";
      }
    });
  }
  // --- END LOGIC TÌM KIẾM VÀ ĐỀ XUẤT ---

  // BẮT ĐẦU CÁC LỆNH KHỞI TẠO
  updateCartCount();
  displayUser();
  renderProducts();
  
  // Xử lý dropdown menu
  const dropdown = document.querySelector(".dropdown");
  if (dropdown) {
    const dropdownButton = dropdown.querySelector(".nav-button");
    const dropdownContent = dropdown.querySelector(".dropdown-content");
    dropdownButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      dropdownContent.classList.toggle("show");
    });
  }
  // Đóng dropdown khi click ngoài
  window.addEventListener("click", function (event) {
    const openDropdown = document.querySelector(".dropdown-content.show");
    if (openDropdown) {
      openDropdown.classList.remove("show");
    }
  });
  // Khởi tạo Swiper
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
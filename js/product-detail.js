document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const productData = PRODUCTS[productId];

  const productDetailContainer = document.getElementById("product-detail");
  const cartCountEl = document.getElementById("cart-count");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let currentSelectedOption = productData ? productData.options[0] : null;

  function updateCartCount() {
    if (cartCountEl) {
      cartCountEl.textContent = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    }
  }

  function addToCart(id, name, price, image, quantity = 1) {
    const productToAdd = {
      id: `${id}-${currentSelectedOption.color}-${currentSelectedOption.storage}`,
      name: `${name} (${currentSelectedOption.color} - ${currentSelectedOption.storage})`,
      price: price,
      image: image,
      quantity: quantity,
    };

    const existingItem = cart.find((item) => item.id === productToAdd.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push(productToAdd);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  }

  function renderProductDetail() {
    if (!productData) {
      productDetailContainer.innerHTML = "<h1>Không tìm thấy sản phẩm!</h1>";
      return;
    }

    const colors = [...new Set(productData.options.map((opt) => opt.color))];
    const storages = [
      ...new Set(productData.options.map((opt) => opt.storage)),
    ];

    productDetailContainer.innerHTML = `
            <div class="product-image">
                <img id="main-product-image" src="${
                  currentSelectedOption.image
                }" alt="${productData.name}">
            </div>
            <div class="product-info">
                <h1 id="product-name">${productData.name}</h1>
                <p class="product-price" id="product-price">${currentSelectedOption.price.toLocaleString(
                  "vi-VN"
                )}₫</p>
                
                <div class="options-group">
                    <h3>Màu sắc</h3>
                    <div id="color-options">
                        ${colors
                          .map(
                            (color) =>
                              `<button class="option-btn color-btn" data-color="${color}">${color}</button>`
                          )
                          .join("")}
                    </div>
                </div>

                <div class="options-group">
                    <h3>Dung lượng</h3>
                    <div id="storage-options">
                        ${storages
                          .map(
                            (storage) =>
                              `<button class="option-btn storage-btn" data-storage="${storage}">${storage}</button>`
                          )
                          .join("")}
                    </div>
                </div>

                <button class="add-to-cart-btn" id="add-to-cart">Thêm vào giỏ hàng</button>
            </div>
        `;

    updateActiveButtons();
    addEventListenersToOptions();
  }

  function updateProductDisplay() {
    const selectedColorEl = document.querySelector(".color-btn.active");
    const selectedStorageEl = document.querySelector(".storage-btn.active");

    // Dừng lại nếu chưa chọn đủ
    if (!selectedColorEl || !selectedStorageEl) return;

    const selectedColor = selectedColorEl.dataset.color;
    const selectedStorage = selectedStorageEl.dataset.storage;

    const newOption = productData.options.find(
      (opt) => opt.color === selectedColor && opt.storage === selectedStorage
    );

    if (newOption) {
      currentSelectedOption = newOption;
      document.getElementById("main-product-image").src = newOption.image;
      document.getElementById(
        "product-price"
      ).textContent = `${newOption.price.toLocaleString("vi-VN")}₫`;
    } else {
      // Xử lý khi không có sự kết hợp này, ví dụ: vô hiệu hóa nút mua
      document.getElementById("add-to-cart").disabled = true;
      document.getElementById("product-price").textContent =
        "Không có phiên bản này";
    }
  }

  function updateActiveButtons() {
    document.querySelectorAll(".color-btn").forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.dataset.color === currentSelectedOption.color
      );
    });
    document.querySelectorAll(".storage-btn").forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.dataset.storage === currentSelectedOption.storage
      );
    });
  }

  // === HÀM addEventListenersToOptions ĐÃ ĐƯỢC SỬA LẠI HOÀN TOÀN ===
  function addEventListenersToOptions() {
    productDetailContainer.addEventListener("click", function (event) {
      const target = event.target;

      // Xử lý khi click nút màu
      if (target.classList.contains("color-btn")) {
        // Xóa active ở tất cả các nút màu khác
        document
          .querySelectorAll(".color-btn")
          .forEach((btn) => btn.classList.remove("active"));
        // Thêm active cho nút vừa bấm
        target.classList.add("active");
        // Gọi hàm cập nhật giao diện
        updateProductDisplay();
      }

      // Xử lý khi click nút dung lượng
      if (target.classList.contains("storage-btn")) {
        document
          .querySelectorAll(".storage-btn")
          .forEach((btn) => btn.classList.remove("active"));
        target.classList.add("active");
        updateProductDisplay();
      }

      // Xử lý khi click nút "Thêm vào giỏ hàng"
      if (target.id === "add-to-cart") {
        addToCart(
          productId,
          productData.name,
          currentSelectedOption.price,
          currentSelectedOption.image
        );
      }
    });
  }

  updateCartCount();
  renderProductDetail();
});

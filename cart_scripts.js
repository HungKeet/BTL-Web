document.addEventListener('DOMContentLoaded', () => {
    const cartListContainer = document.getElementById('cart-list');
    const subtotalDisplay = document.getElementById('subtotal-display');
    const totalDisplay = document.getElementById('total-display');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutLink = document.getElementById('checkout-link');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateHeaderCartCount(); // Gọi hàm cập nhật header
    }

    // Hàm cập nhật số lượng trên header chính (cần ID 'cart-count' trên header)
    function updateHeaderCartCount() {
        const cartCountHeader = document.getElementById('cart-count');
         if (cartCountHeader) {
             cartCountHeader.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
         }
    }

function renderCart() {
    cartListContainer.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        if (emptyCartMessage) emptyCartMessage.classList.remove('hidden');
        if (checkoutLink) checkoutLink.classList.add('disabled-link');
        if (subtotalDisplay) subtotalDisplay.textContent = '0₫';
        if (totalDisplay) totalDisplay.textContent = '0₫';
        updateHeaderCartCount();
        return;
    }

    if (emptyCartMessage) emptyCartMessage.classList.add('hidden');
    if (checkoutLink) checkoutLink.classList.remove('disabled-link');

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        const itemTotalPrice = item.price * item.quantity;
        subtotal += itemTotalPrice;
        const imageUrl = item.image || 'https://placehold.co/80x80/E0E0E0/333333?text=DT';

        // Updated HTML structure for the new grid layout (no wrapper)
        itemElement.innerHTML = `
            <img src="${imageUrl}" alt="${item.name}" onerror="this.onerror=null;this.src='https://placehold.co/80x80/E0E0E0/333333?text=DT';">
            <span class="product-name">${item.name}</span>
            <span class="item-price">${item.price.toLocaleString('vi-VN')}₫</span>
            <div class="quantity-control">
                <button class="decrease-btn" data-index="${index}">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}" readonly>
                <button class="increase-btn" data-index="${index}">+</button>
            </div>
            <span class="item-total-price">${itemTotalPrice.toLocaleString('vi-VN')}₫</span>
            <button class="remove-btn" data-index="${index}">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        cartListContainer.appendChild(itemElement);
    });

    if (subtotalDisplay) subtotalDisplay.textContent = `${subtotal.toLocaleString('vi-VN')}₫`;
    if (totalDisplay) totalDisplay.textContent = `${subtotal.toLocaleString('vi-VN')}₫`;
    updateHeaderCartCount();
}

    // --- Xử lý sự kiện click trên danh sách giỏ hàng (SỬ DỤNG addEventListener) ---
    if(cartListContainer) { // Chỉ thêm listener nếu cartListContainer tồn tại
        cartListContainer.addEventListener('click', (event) => {
            const target = event.target;
            const button = target.closest('button'); // Tìm nút gần nhất được click

            if (!button) return; // Nếu không click vào nút thì dừng

            const index = button.dataset.index; // Lấy index từ thuộc tính data-index

            if (button.classList.contains('remove-btn')) {
                // Thêm xác nhận trước khi xóa
                if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
                    cart.splice(index, 1); // Xóa sản phẩm khỏi mảng cart
                    saveCart(); // Lưu và render lại
                    renderCart();
                }
            } else if (button.classList.contains('increase-btn')) {
                cart[index].quantity++;
                saveCart();
                renderCart();
            } else if (button.classList.contains('decrease-btn')) {
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    saveCart();
                    renderCart();
                } else {
                    // Nếu số lượng là 1 mà bấm giảm -> hỏi xác nhận xóa
                    if (confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?')) {
                        cart.splice(index, 1);
                        saveCart();
                        renderCart();
                    }
                }
            }
        });
    }

    // --- Khởi chạy khi tải trang ---
    renderCart();

    // --- Xử lý User Section (Copy từ script.js nếu cần đồng bộ) ---
    const userSectionCart = document.getElementById('user-section');
    if (userSectionCart && typeof displayUser === 'function') {
         try {
            displayUser(); // Gọi hàm displayUser từ script.js (nếu script.js được tải trước)
         } catch (e) { console.error("Could not call displayUser from script.js:", e); }
    } else if (userSectionCart) {
         // Fallback cơ bản nếu không tìm thấy hàm displayUser
         const currentUser = JSON.parse(localStorage.getItem("currentUser"));
         if (currentUser) {
              userSectionCart.innerHTML = `<span class="nav-button">Xin chào, ${currentUser.name}</span>`;
         } else {
              userSectionCart.innerHTML = `<a href="login.html" class="nav-button"><i class="fa-solid fa-user"></i><span>Đăng nhập</span></a>`;
         }
    }
});

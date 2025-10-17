// --- 1. BIẾN VÀ HÀM TIỆN ÍCH ---

// Hàm định dạng tiền tệ Việt Nam
function formatCurrency(amount) {
    // Đảm bảo amount là số
    if (typeof amount !== 'number') return '0₫';
    return amount.toLocaleString('vi-VN') + '₫';
}

// Lấy giỏ hàng từ localStorage (Khởi tạo)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// --- 2. HÀM CẬP NHẬT GIỎ HÀNG VÀ GIAO DIỆN ---

// Lưu giỏ hàng vào localStorage và render lại
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Thay đổi số lượng sản phẩm (Được gọi từ HTML)
function changeQuantity(id, change) {
    const itemId = String(id);
    const itemIndex = cart.findIndex(i => String(i.id) === itemId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity < 1) {
            // Nếu số lượng nhỏ hơn 1, xóa sản phẩm
            cart.splice(itemIndex, 1);
        }
        saveCart();
    }
}

// Xóa sản phẩm khỏi giỏ hàng (Được gọi từ HTML)
function removeItem(id) {
    const itemId = String(id);
    cart = cart.filter(i => String(i.id) !== itemId);
    saveCart();
}

// Render (Hiển thị) giỏ hàng và tóm tắt
function renderCart() {
    // Luôn đọc lại dữ liệu từ localStorage để đảm bảo giỏ hàng luôn mới nhất
    cart = JSON.parse(localStorage.getItem('cart')) || []; 
    
    const cartListElement = document.getElementById('cart-list');
    const subtotalDisplay = document.getElementById('subtotal-display');
    const totalDisplay = document.getElementById('total-display');
    const emptyMessage = document.getElementById('empty-cart-message'); // Selector của thông báo "Giỏ hàng trống"
    const checkoutLink = document.getElementById('checkout-link');
    
    let subtotal = 0;
    
    // --- LOGIC ẨN/HIỆN THÔNG BÁO ---
    if (cart.length === 0) {
        cartListElement.innerHTML = '';
        emptyMessage.classList.remove('hidden'); // HIỆN thông báo
        checkoutLink.classList.add('disabled-link'); // Vô hiệu hóa nút
        subtotalDisplay.textContent = formatCurrency(0);
        totalDisplay.textContent = formatCurrency(0);
        return;
    }

    emptyMessage.classList.add('hidden'); // ẨN thông báo khi có hàng
    checkoutLink.classList.remove('disabled-link'); // Kích hoạt nút
    // ---------------------------------
    
    cartListElement.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        // Đảm bảo image có sẵn, nếu không thì dùng placeholder 
        const imageUrl = item.image || 'https://placehold.co/80x80/E0E0E0/333333?text=DT';

        return `
            <div class="product-card">
                <!-- Thông tin sản phẩm (2/5) -->
                <div class="product-info col-product">
                    <img src="${imageUrl}" alt="${item.name}" onerror="this.onerror=null;this.src='https://placehold.co/80x80/E0E0E0/333333?text=DT';" class="product-image">
                    <span>${item.name}</span>
                </div>
                
                <!-- Đơn giá (1/5) -->
                <span class="price-display col-price text-gray-600">${formatCurrency(item.price)}</span>
                
                <!-- Số lượng (1/5) -->
                <div class="quantity-control col-quantity">
                    <button onclick="changeQuantity('${item.id}', -1)">-</button>
                    <input type="number" value="${item.quantity}" min="1" readonly>
                    <button onclick="changeQuantity('${item.id}', 1)">+</button>
                </div>
                
                <!-- Thành tiền (1/5) -->
                <span class="total-display col-total">${formatCurrency(itemTotal)}</span>

                <!-- Nút Xóa -->
                <button onclick="removeItem('${item.id}')" class="remove-btn">
                    <svg class="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        `;
    }).join('');

    // Cập nhật tóm tắt
    const totalAmount = subtotal; 
    subtotalDisplay.textContent = formatCurrency(subtotal);
    totalDisplay.textContent = formatCurrency(totalAmount);
}

// --- 3. KHỞI TẠO CHUNG ---
document.addEventListener('DOMContentLoaded', () => {
    // Gán các hàm tương tác vào đối tượng window 
    window.changeQuantity = changeQuantity;
    window.removeItem = removeItem;
    
    renderCart();
}
);

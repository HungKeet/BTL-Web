function formatCurrency(amount) {
    if (typeof amount !== 'number') return '0₫';
    return amount.toLocaleString('vi-VN') + '₫';
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const subtotalDisplay = document.getElementById('subtotal-display');
    const totalDisplay = document.getElementById('total-display');

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    subtotalDisplay.textContent = formatCurrency(subtotal);
    totalDisplay.textContent = formatCurrency(subtotal); // No shipping fee

    const payBtn = document.getElementById('pay-btn');
    const qrModal = document.getElementById('qr-modal');
    const closeModal = document.getElementById('close-modal');

    payBtn.addEventListener('click', () => {
        const name = document.querySelector('[name="name"]').value.trim();
        const phone = document.querySelector('[name="phone"]').value.trim();
        const address = document.querySelector('[name="address"]').value.trim();

        if (!name || !phone || !address) {
            alert("Vui lòng điền đầy đủ thông tin giao hàng.");
            return;
        }

        // Mở modal mã QR
        qrModal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', () => {
        qrModal.classList.add('hidden');
    });

    qrModal.addEventListener('click', (e) => {
        if (e.target === qrModal) {
            qrModal.classList.add('hidden');
        }
    });
});

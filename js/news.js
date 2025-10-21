// KHAI BÁO DỮ LIỆU TIN TỨC TOÀN CỤC (GLOBAL)
// Để script article.js có thể truy cập được.
const NEWS_DATA = [
 {
    id: "a001",
    title: "Apple ra mắt iOS 19: Những tính năng đột phá sắp đổ bộ!",
    summary:
      "iOS 19 được kỳ vọng mang đến giao diện visionOS-esque, tích hợp AI sâu rộng hơn qua Siri và mở rộng tính năng theo yêu cầu của EU.",
    image: "https://www.iculture.nl/wp-content/uploads/2025/03/ios-19-video-mockup.webp",
    link: "article.html?id=a001",
    // SỬ DỤNG DẤU BACKTICK (`) ĐỂ BAO BỌC CHUỖI
    fullContent: `
        <p>iOS 19, phiên bản hệ điều hành di động tiếp theo của Apple, được dự đoán sẽ mang đến những thay đổi thiết kế lớn nhất kể từ iOS 7, cùng với hàng loạt tính năng mới tập trung vào AI và tuân thủ quy định thị trường.</p>

        <h2>1. Giao diện “visionOS-esque” và Cải tiến Camera</h2>
        <p>Giao diện của iOS 19 được cho là sẽ lấy cảm hứng từ visionOS, nền tảng phần mềm của kính thực tế ảo Vision Pro. Những thay đổi này có thể lan rộng sang các khu vực khác của iOS, áp dụng phong cách trong suốt cho nhiều ứng dụng và thông báo hệ thống hơn.</p>
        
        <p>Ứng dụng Camera được đồn đoán sẽ thiết kế lại, nổi bật với menu trong suốt cho các điều khiển. So với phiên bản trước, kính ngắm sẽ hiển thị rõ hơn, và các nút điều khiển sẽ được phân chia thành hai danh mục: Ảnh và Video. Thêm vào đó, các tùy chọn để ghi video không gian, bộ hẹn giờ và điều chỉnh độ phân giải/tốc độ khung hình sẽ được tích hợp.</p>

        <h2>2. Stage Manager và Cải tiến Tin nhắn RCS</h2>
        <ul>
            <li><strong>Stage Manager trên iPhone:</strong> Tính năng vốn độc quyền cho iPadOS có thể sẽ cập bến iPhone (ít nhất là trên những thiết bị dùng cổng USB-C như dòng iPhone 15 trở về sau). Khi kết nối với màn hình ngoài, người dùng có thể chạy nhiều ứng dụng cùng lúc.</li>
            <li><strong>Mã hóa đầu cuối cho RCS:</strong> Apple có kế hoạch bổ sung hỗ trợ mã hóa đầu cuối cho tin nhắn RCS trong ứng dụng Tin nhắn. Tính năng RCS trên iOS 19 cũng có thể bao gồm trả lời trực tiếp, chỉnh sửa/hủy gửi tin nhắn, và hỗ trợ đầy đủ Tapback.</li>
        </ul>
        
        <h2>3. Trí tuệ Nhân tạo (AI) và Siri</h2>
        <p>Apple gần đây đã trì hoãn việc phát hành phiên bản Siri được cá nhân hóa, nhưng những nâng cấp này được kỳ vọng sẽ tích hợp vào iOS 19. Những nâng cấp Siri hứa hẹn sẽ mang đến khả năng hiểu ngữ cảnh cá nhân của người dùng, nhận biết thông tin trên màn hình và kiểm soát sâu hơn đối với từng ứng dụng.</p>
        <p>Sau khi iOS 18.2 đã thêm tính năng tích hợp ChatGPT vào Siri, có khả năng iOS 19 sẽ tiếp tục mở rộng với việc tích hợp Gemini của Google.</p>

        <h2>4. Tính năng Sức khỏe và Dịch vụ mới</h2>
        <ul>
            <li><strong>Dịch thuật trực tiếp qua AirPods:</strong> Một số mẫu AirPods nhất định sẽ được trang bị tính năng dịch thuật trực tiếp mới khi kết hợp với iOS 19. Tính năng này hoạt động bằng cách dịch lời nói và truyền đến AirPods, đồng thời dịch ngược lại thông qua iPhone.</li>
            <li><strong>Ứng dụng Sức khỏe AI:</strong> Ứng dụng Health sẽ được làm mới, bổ sung tính năng huấn luyện sức khỏe cá nhân hóa dựa trên AI, nhận lời khuyên từ chuyên gia qua video và theo dõi các xu hướng sức khỏe.</li>
        </ul>

        <h2>5. Thay đổi theo yêu cầu của EU</h2>
        <p>Để tuân thủ Đạo luật Thị trường Kỹ thuật số, iOS 19 sẽ buộc phải thực hiện nhiều thay đổi, bao gồm:</p>
        <ul>
            <li>Đồng hồ thông minh của bên thứ ba phải có khả năng hiển thị và tương tác với thông báo iOS (dự kiến cuối năm 2025).</li>
            <li>Apple phải cung cấp tính năng chuyển đổi âm thanh tự động cho tai nghe của bên thứ ba (trước 1 tháng 6 năm 2026).</li>
            <li>Thực hiện những thay đổi để cho phép bên thứ ba cung cấp các giải pháp thay thế AirDrop tương đương (trước 1 tháng 6 năm 2026).</li>
        </ul>

        <h2>Tạm kết</h2>
        <p>Với những cải tiến lớn về giao diện, sự bùng nổ của AI và việc mở rộng khả năng tương thích theo luật định, iOS 19 được xem là một trong những bản cập nhật tham vọng nhất của Apple từ trước đến nay.</p>
    `,
  },
  {
    id: "a002",
    title: "Samsung Galaxy Z Fold 6 lộ diện: Mỏng hơn, nhẹ hơn và camera nâng cấp",
    summary:
      "Hình ảnh rò rỉ cho thấy thiết kế của Fold 6 đã được tinh chỉnh đáng kể, tập trung vào việc giảm độ dày và cải thiện khả năng chụp ảnh thiếu sáng.",
    image: "https://www.phonerol.com/wp-content/uploads/2024/02/samsung-galaxy-z-fold-6-img-01.jpg", 
    link: "article.html?id=a002",
    fullContent: "Galaxy Z Fold 6 được đồn đoán sẽ có thiết kế mỏng và nhẹ hơn đáng kể so với người tiền nhiệm, giúp cải thiện khả năng cầm nắm. Đi kèm là hệ thống camera được nâng cấp mạnh mẽ, đặc biệt là cảm biến chính, mang lại chất lượng ảnh chụp chuyên nghiệp hơn trong mọi điều kiện ánh sáng.", // Bổ sung nội dung chi tiết
  },
  {
    id: "a003",
    title: "Xiaomi 15 Pro xác nhận dùng chip Snapdragon mới nhất",
    summary:
      "Hãng công bố mẫu flagship tiếp theo sẽ trang bị Snapdragon 8 Gen 4, hứa hẹn hiệu năng chơi game và xử lý tác vụ vượt trội.",
    image: "https://cdn.mobilecity.vn/mobilecity-vn/images/2023/08/samsung-se-san-xuat-snapdragon-8-gen-4-cung-voi-tsmc-3.jpg.webp", 
    link: "article.html?id=a003",
    fullContent: "Xiaomi 15 Pro sẽ là một trong những chiếc điện thoại đầu tiên trên thị trường được trang bị chip Snapdragon 8 Gen 4. Bộ vi xử lý này được tối ưu hóa cho các tác vụ nặng, từ gaming đồ họa cao đến xử lý AI phức tạp, đặt ra một tiêu chuẩn mới về hiệu suất smartphone.", // Bổ sung nội dung chi tiết
  },
  {
    id: "a004",
    title: "Pin điện thoại: Làm sao để sạc đúng cách và kéo dài tuổi thọ?",
    summary:
      "Các chuyên gia công nghệ đưa ra lời khuyên về việc duy trì mức pin lý tưởng, tránh sạc qua đêm và chọn bộ sạc phù hợp.",
    image: "https://genk.mediacdn.vn/139269124445442048/2023/9/22/uthu4eh-1695360804613605064285-1695361981788-169536198207613492706.jpg",
    link: "article.html?id=a004",
    fullContent: "Các chuyên gia khuyến cáo nên giữ mức pin điện thoại ở khoảng 20% đến 80% để tối ưu hóa tuổi thọ pin. Tránh để điện thoại sập nguồn hoàn toàn hoặc sạc qua đêm liên tục. Sử dụng bộ sạc chính hãng hoặc bộ sạc đạt chuẩn là điều kiện tiên quyết để đảm bảo an toàn và hiệu quả.", // Bổ sung nội dung chi tiết
  },
  {
    id: "a005",
    title: "OPPO Reno12: Thiết kế độc đáo và công nghệ sạc siêu nhanh",
    summary:
      "Reno12 tập trung vào thiết kế thời trang với màu sắc gradient và công nghệ sạc 120W, cho phép sạc đầy pin chỉ trong 20 phút.",
    image: "https://progres.id/wp-content/uploads/2024/08/Oppo-reno-12-pro.jpg", 
    link: "article.html?id=a005",
    fullContent: "OPPO Reno12 nổi bật với thiết kế mỏng nhẹ, các tùy chọn màu sắc gradient bắt mắt, phù hợp với giới trẻ. Điểm nhấn lớn nhất là công nghệ sạc siêu nhanh 120W, cho phép người dùng nạp đầy năng lượng chỉ trong thời gian ngắn, giải quyết triệt để nỗi lo hết pin.", 
  },
];


document.addEventListener("DOMContentLoaded", () => {
  const newsListContainer = document.getElementById("news-list");

  /**
   * Hiển thị danh sách tin tức lên giao diện
   */
  function renderNews() {
    if (!newsListContainer) return;

    // Xóa nội dung đang tải
    newsListContainer.innerHTML = ""; 

    NEWS_DATA.forEach((news) => {
      const newsCard = document.createElement("div");
      newsCard.className = "news-card";
      newsCard.innerHTML = `
        <img src="${news.image}" alt="${news.title}">
        <div class="news-content">
          <h3>${news.title}</h3>
          <p>${news.summary}</p>
          <a href="${news.link}" class="read-more">Đọc thêm <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      `;
      newsListContainer.appendChild(newsCard);
    });
  }

  renderNews();
});
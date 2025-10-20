document.addEventListener("DOMContentLoaded", () => {
  // Lấy ID bài viết từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("id");
  const articleDetailContainer = document.getElementById("article-detail");
  
  // KIỂM TRA: Đảm bảo NEWS_DATA đã được load từ news.js (global)
  if (typeof NEWS_DATA === 'undefined') {
      articleDetailContainer.innerHTML = "<h1>Lỗi: Dữ liệu tin tức không được tải!</h1>";
      return;
  }
  
  // Tìm bài viết theo ID
  const articleData = NEWS_DATA.find(item => item.id === articleId);

  function renderArticleDetail() {
    if (!articleData) {
      articleDetailContainer.innerHTML = "<h1>Không tìm thấy bài viết này!</h1>";
      document.title = "Lỗi | K Store";
      return;
    }

    document.title = `${articleData.title} | K Store`;

    // Chuẩn bị nội dung HTML với cấu trúc bài báo
    articleDetailContainer.innerHTML = `
      <div class="article-header">
        <h1 class="article-title">${articleData.title}</h1>
        <p class="article-date">
            <i class="fa-solid fa-clock"></i> Cập nhật: ${new Date().toLocaleDateString('vi-VN')}
        </p>
      </div>
      
      <div class="article-summary-box">
        <p><strong>Tóm tắt:</strong> ${articleData.summary}</p>
      </div>

      <div class="article-body">
        <figure class="article-figure">
            <img src="${articleData.image}" alt="${articleData.title}" class="article-main-image">
            <figcaption>Ảnh minh họa: ${articleData.title}</figcaption>
        </figure>

        <p class="article-full-content">${articleData.fullContent}</p>
        
        <p class="article-source">Nguồn: K Store Tổng hợp</p>
      </div>
      
      <div class="article-footer">
          <a href="news.html" class="back-to-news">
             <i class="fa-solid fa-arrow-left"></i> Quay lại danh sách tin tức
          </a>
      </div>
    `;
  }

  renderArticleDetail();
});
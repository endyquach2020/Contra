# 🎮 Contra Edu Arena - Hướng Dẫn Deploy Lên GitHub Pages

Thư mục này chứa toàn bộ mã nguồn trò chơi **Contra Chiến Trường Tri Thức** được đóng gói hoàn chỉnh bằng **HTML5, CSS3 và JavaScript thuần (Vanilla JS)**:
* `index.html`: Cấu trúc giao diện game, các modal câu hỏi, CRT effect.
* `style.css`: Giao diện phong cách Retro Cyberpunk Gaming, hiệu ứng ánh sáng neon, hỗ trợ cảm ứng điện thoại.
* `game.js`: Toàn bộ logic game Contra, ăn Siêu Nấm, bắn đạn tỏa Spread Gun, vượt chướng ngại vật (chông, thùng nổ, cưa xoay), trả lời phím A B C D, âm thanh 8-bit Web Audio API.

---

## 🚀 Cách Deploy lên GitHub Pages (Chỉ mất 2 phút)

### Bước 1: Tạo Repository mới trên GitHub
1. Đăng nhập vào [GitHub](https://github.com/).
2. Nhấn nút **New** (hoặc dấu `+` ở góc phải trên) để tạo kho lưu trữ mới.
3. Đặt tên repository (Ví dụ: `contra-edu-arena`), chọn chế độ **Public**, sau đó nhấn **Create repository**.

### Bước 2: Upload các file lên GitHub
* Cách 1 (Kéo thả trực tiếp không cần cài Git):
  1. Trên trang repository vừa tạo, nhấn vào **Upload files**.
  2. Kéo thả 3 file từ thư mục này gồm: `index.html`, `style.css`, `game.js` vào trình duyệt.
  3. Nhấn nút xanh **Commit changes**.

* Cách 2 (Dùng lệnh Git trong terminal):
  ```bash
  git init
  git add index.html style.css game.js
  git commit -m "Deploy Contra Game"
  git branch -M main
  git remote add origin https://github.com/TÊN_GITHUB_CỦA_BẠN/contra-edu-arena.git
  git push -u origin main
  ```

### Bước 3: Bật GitHub Pages
1. Tại trang Repository trên GitHub, nhấn vào tab **Settings** (Cài đặt).
2. Ở thanh menu bên trái, chọn mục **Pages** (trong phần *Code and automation*).
3. Tại phần **Build and deployment**:
   * **Source**: Chọn `Deploy from a branch`.
   * **Branch**: Chọn `main` (hoặc `master`) và thư mục `/(root)`.
   * Nhấn **Save**.
4. Chờ khoảng 1-2 phút, GitHub sẽ hiển thị đường link trang web của bạn:
   👉 **`https://<tên-của-bạn>.github.io/contra-edu-arena/`**

---

## 🎯 Các Tính Năng Đã Tích Hợp
* ⌨️ **Phím tắt trả lời trắc nghiệm:** Bấm phím **A, B, C, D** (hoặc 1, 2, 3, 4) để chọn đáp án ngay lập tức.
* 🍄 **Ăn Siêu Nấm Khổng Lồ:** Biến hình to lớn gấp 1.35x, hào quang hoàng kim, nhảy cao và dẫm bẹp kẻ địch.
* 🔫 **Nhặt Đạn & Vũ Khí:** Bắn vỡ hộp bí ẩn hoặc tiêu diệt Drone trên trời để nhặt Spread Gun (bắn tỏa 5 tia), Machine Gun, Laser Beam.
* 💥 **Chướng ngại vật đa dạng:** Thùng thuốc nổ phát nổ lan, chông nhọn né tránh, cưa xoay tuần tra, ống phun lửa định kỳ.
* 📱 **Hỗ trợ Điện thoại:** Bàn phím ảo D-Pad + Nút Nhảy + Nút Bắn tự động nhận diện thiết bị cảm ứng.
* 🔊 **Âm thanh 8-bit:** Tự tạo sóng âm bằng Web Audio API, không cần file MP3 bên ngoài, không lo lỗi đường dẫn.

# 🎮 Arena Edu Connect - Contra Chiến Trường Tri Thức

Nền tảng game hóa giáo dục Contra vượt ải mở cổng laser bằng cách trả lời câu hỏi trắc nghiệm (phím A, B, C, D), ăn nấm khổng lồ, nhặt đạn dược và vượt qua các chướng ngại vật phong phú.

---

## 📂 Cấu Trúc Mã Nguồn

Dự án được chuẩn bị sẵn 2 lựa chọn triển khai linh hoạt:

1. **Bộ mã nguồn thuần HTML, CSS, JavaScript (Dễ deploy GitHub Pages nhất)**:
   * Nằm trong thư mục: **`github-deploy/`**
   * Bao gồm 3 file độc lập: `index.html`, `style.css`, `game.js`.
   * **Không cần Node.js, không cần npm build**, chỉ cần kéo thả 3 file này lên GitHub repository là website có thể chạy ngay lập tức thông qua GitHub Pages!

2. **Dự án React + Vite (Dành cho nhà phát triển muốn mở rộng mã nguồn)**:
   * Chạy lệnh `npm run dev` để phát triển tại local.
   * Chạy lệnh `npm run build` để xuất file tĩnh ra thư mục `dist/` (đã cấu hình sẵn `base: './'` tương thích 100% với GitHub Pages).

---

## 🚀 Hướng Dẫn Tải & Deploy Lên GitHub Pages Trong 3 Bước

### Cách 1: Sử dụng bộ mã nguồn thuần trong thư mục `github-deploy` (Khuyên dùng)
1. Đăng nhập [GitHub](https://github.com/) -> Nhấn **New Repository** -> Đặt tên (ví dụ: `contra-edu`).
2. Vào thư mục `github-deploy`, upload 3 file:
   - `index.html`
   - `style.css`
   - `game.js`
3. Vào **Settings** > **Pages** > Chọn Branch `main` > Nhấn **Save**.
4. Link chơi game của bạn sẽ xuất hiện tại: `https://<username>.github.io/contra-edu/`!

### Cách 2: Deploy toàn bộ mã nguồn lên Vercel / Netlify / GitHub Pages
* Dự án đã được cấu hình đường dẫn tương đối `base: './'` trong `vite.config.ts`.
* Khi đẩy toàn bộ mã nguồn lên GitHub, bạn có thể kết nối repository với [Vercel](https://vercel.com) hoặc [Netlify](https://netlify.com) để deploy hoàn toàn miễn phí chỉ với 1 cú click!
* Hoặc chạy lệnh `npm run build` và upload các file trong thư mục `dist` lên GitHub Pages.

---

## 🕹️ Điều Khiển & Phím Tắt
| Thao tác | Phím máy tính | Cảm ứng điện thoại |
|---|---|---|
| **Di chuyển** | `A` / `D` hoặc `←` / `→` | Cụm phím D-Pad ◀ ▶ |
| **Nhảy** | `W`, `Space`, `↑` | Nút **NHẢY** (JUMP) |
| **Ngồi né đạn** | `S` hoặc `↓` | Nút D-Pad ▼ |
| **Bắn súng** | `J`, `Z` hoặc `Space` | Nút **BẮN** (FIRE) |
| **Trả lời trắc nghiệm** | Phím chữ cái **`A`**, **`B`**, **`C`**, **`D`** | Chạm trực tiếp vào đáp án |
| **Tạm dừng** | `P` hoặc `Esc` | Nút Pause trên HUD |

---

## 🍄 Cơ Chế Nâng Cấp Trong Game
* **Siêu Nấm (Super Mushroom):** Nhảy đập hộp bí ẩn `[ ? ]` hoặc bắn hạ Drone bay trên cao để ăn nấm. Nhân vật sẽ hóa khổng lồ, tăng sức nhảy, miễn nhiễm chông nhọn và dẫm bẹp mọi kẻ địch trên đường.
* **Hộp tiếp đạn & Súng đặc biệt:**
  - `S` (Spread Gun): Súng bắn tỏa 5 viên đạn hình quạt.
  - `M` (Machine Gun): Súng liên thanh xả đạn cực nhanh.
  - `L` (Laser Beam): Tia laser công nghệ cao xuyên phá mọi mục tiêu.
* **Chướng ngại vật:** Thùng thuốc nổ TNT (bắn để kích nổ diện rộng), chông gai sắt, lưỡi cưa xoay tuần tra, ống phun lửa định kỳ.

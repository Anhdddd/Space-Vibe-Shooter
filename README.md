# Space Vibe Shooter 🎮

## Mô tả

Game bắn máy bay 2D được xây dựng bằng Phaser 3. Điều khiển máy bay của bạn, tiêu diệt kẻ thù và đánh bại boss để qua màn!

## Các tính năng

### 🎯 Hệ thống Stage

- **10 màn chơi** với độ khó tăng dần
- Mỗi màn cần tiêu diệt **10 kẻ thù** để boss xuất hiện
- Đánh bại boss để qua màn tiếp theo

### 👾 Các loại kẻ thù

| Loại   | Màu sắc | HP  | Điểm | Tốc độ     |
| ------ | ------- | --- | ---- | ---------- |
| Basic  | Đỏ      | 1   | 10   | Nhanh      |
| Medium | Cam     | 2   | 25   | Trung bình |
| Tank   | Tím     | 3   | 50   | Chậm       |

### 👹 Boss

- **HP**: 100 + (Stage - 1) × 50
  - Stage 1: 100 HP
  - Stage 10: 550 HP
- **Di chuyển**: Qua lại ngang màn hình
- **Bắn đạn**: Tùy theo stage
  - Stage 1-3: 3 đạn thẳng
  - Stage 4-6: 5 đạn chùm
  - Stage 7-10: 7 đạn quạt + 1 đạn nhắm

### ⚡ Power-ups

# Space Vibe Shooter 🎮

## Mô tả

Game bắn máy bay 2D được xây dựng bằng Phaser 3. Điều khiển máy bay của bạn, tiêu diệt kẻ thù và đánh bại boss để qua màn!

## Các tính năng

### 🎯 Hệ thống Stage

- **10 màn chơi** với độ khó tăng dần
- Mỗi màn cần tiêu diệt **10 kẻ thù** để boss xuất hiện
- Đánh bại boss để qua màn tiếp theo

### 👾 Các loại kẻ thù

| Loại   | Màu sắc | HP  | Điểm | Tốc độ     |
| ------ | ------- | --- | ---- | ---------- |
| Basic  | Đỏ      | 1   | 10   | Nhanh      |
| Medium | Cam     | 2   | 25   | Trung bình |
| Tank   | Tím     | 3   | 50   | Chậm       |

### 👹 Boss

- **HP**: 100 + (Stage - 1) × 50
  - Stage 1: 100 HP
  - Stage 10: 550 HP
- **Di chuyển**: Qua lại ngang màn hình
- **Bắn đạn**: Tùy theo stage
  - Stage 1-3: 3 đạn thẳng
  - Stage 4-6: 5 đạn chùm
  - Stage 7-10: 7 đạn quạt + 1 đạn nhắm

### ⚡ Power-ups

| Loại   | Màu        | Hiệu ứng            |
| ------ | ---------- | ------------------- |
| Double | Vàng       | Bắn 2 đạn song song |
| Triple | Xanh dương | Bắn 3 đạn           |
| Fan    | Hồng       | Bắn 5 đạn quạt      |
| HP Up  | Xanh lá    | Hồi 1 HP (Max 3)    |

> **Lưu ý**: Power-up **vĩnh viễn** cho đến khi bị trúng đạn hoặc va chạm kẻ thù

### ❤️ Hệ thống HP

- Player có **3 HP**
- Mất 1 HP khi:
  - Trúng đạn kẻ thù
  - Va chạm kẻ thù
- Power-up reset về single shot khi mất HP
- **Hồi máu**: Nhặt orb xanh "HP UP" để hồi 1 HP

## Điều khiển

| Phím    | Hành động            |
| ------- | -------------------- |
| ← → ↑ ↓ | Di chuyển            |
| W A S D | Di chuyển (thay thế) |
| Auto    | Bắn tự động          |

## Cách chơi

1.  **Bắt đầu**: Game tự động bắt đầu với Stage 1
2.  **Tiêu diệt**: Giết 10 kẻ thù để boss xuất hiện
3.  **Đánh boss**: Né đạn và bắn boss cho đến khi HP = 0
4.  **Qua màn**: Sau khi boss chết, chuyển sang stage tiếp theo
5.  **Chiến thắng**: Hoàn thành cả 10 stage!

## UI

- **Góc trái trên**: Score
- **Dưới score**: HP (trái tim)
- **Góc phải trên**: Stage X/10, Kills X/10
- **Giữa trên**: Boss HP bar (khi boss xuất hiện)
- **Giữa dưới**: Power-up hiện tại

## Chạy game

Mở file `index.html` trong browser

```
d:\vibeCode\airForce\index.html
```

## Cấu trúc dự án

Dự án được tổ chức theo mô hình module hóa để dễ dàng mở rộng và bảo trì:

```
airForce/
├── index.html              # Entry point của game
├── main.js                 # Khởi tạo Phaser Game config
├── src/
│   ├── config/
│   │   └── GameConfig.js   # Các hằng số, config game, enemy, power-up
│   ├── entities/           # Các thực thể trong game
│   │   ├── Player.js       # Class Player (di chuyển, bắn, HP)
│   │   ├── Enemy.js        # Class Enemy cơ bản
│   │   └── Boss.js         # Class Boss (logic phức tạp, state machine)
│   ├── systems/            # Các hệ thống quản lý logic
│   │   ├── BulletManager.js # Quản lý đạn (player & enemy)
│   │   ├── PowerUpManager.js # Spawner và xử lý power-up
│   │   └── StageManager.js  # Quản lý tiến trình stage, kill count
│   ├── scenes/
│   │   └── GameScene.js    # Scene chính, kết nối các module
│   ├── ui/
│   │   └── GameUI.js       # Quản lý hiển thị Score, HP, Text
│   └── utils/
│       ├── TextureGenerator.js # Tạo graphics procedurally (không cần asset ảnh)
│       └── Effects.js      # Hiệu ứng nổ, flash, tween
```

## Công nghệ

- **Phaser 3** - Game framework
- **HTML5 Canvas** - Rendering
- **JavaScript** - Logic

## 🚀 Hướng dẫn Deployment (VPS)

Để tự động deploy lên VPS 36.50.55.55 mỗi khi push code lên `main`:

### 1. Trên VPS (One-time Setup)

SSH vào VPS và thực hiện:

```bash
# 1. Cài đặt git và nginx (nếu chưa có)
sudo apt update
sudo apt install git nginx -y

# 2. Tạo thư mục chứa code và clone repo
sudo mkdir -p /var/www/space-vibe-shooter
sudo chown -R $USER:$USER /var/www/space-vibe-shooter
git clone https://github.com/Anhdddd/Space-Vibe-Shooter.git /var/www/space-vibe-shooter

# 3. Cấu hình Nginx
# Copy nội dung file deployment/nginx.conf vào /etc/nginx/sites-available/space-vibe
sudo nano /etc/nginx/sites-available/space-vibe
# (Paste nội dung từ deployment/nginx.conf - Đã được setup Port 3001)

# Enable site
sudo ln -s /etc/nginx/sites-available/space-vibe /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 4. Mở Port 3001 (Quan trọng)
sudo ufw allow 3001/tcp
# Nếu dùng AWS/GCP/Other Cloud, nhớ mở port 3001 trong Security Group/Firewall
```

### 2. Trên GitHub Repository

Vào **Settings** > **Secrets and variables** > **Actions** > **New repository secret** và thêm 3 secrets sau:

1.  `VPS_HOST`: `36.50.55.55`
2.  `VPS_USER`: `root` (hoặc username bạn dùng để SSH)
3.  `VPS_SSH_KEY`: (Nội dung Private Key SSH của bạn - `cat ~/.ssh/id_rsa` trên máy local của bạn nếu bạn dùng key đó để SSH vào VPS)

### 3. Deploy

Chỉ cần push code lên nhánh `main`:

```bash
git add .
git commit -m "Update game"
git push origin main
```

GitHub Actions sẽ tự động chạy, SSH vào VPS và pull code mới nhất về! 🎮

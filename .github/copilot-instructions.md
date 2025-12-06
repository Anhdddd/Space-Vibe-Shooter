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

> **Lưu ý**: Power-up **vĩnh viễn** cho đến khi bị trúng đạn hoặc va chạm kẻ thù

### ❤️ Hệ thống HP

- Player có **3 HP**
- Mất 1 HP khi:
  - Trúng đạn kẻ thù
  - Va chạm kẻ thù
- Power-up reset về single shot khi mất HP

## Điều khiển

| Phím    | Hành động            |
| ------- | -------------------- |
| ← → ↑ ↓ | Di chuyển            |
| W A S D | Di chuyển (thay thế) |
| Auto    | Bắn tự động          |

## Cách chơi

1. **Bắt đầu**: Game tự động bắt đầu với Stage 1
2. **Tiêu diệt**: Giết 10 kẻ thù để boss xuất hiện
3. **Đánh boss**: Né đạn và bắn boss cho đến khi HP = 0
4. **Qua màn**: Sau khi boss chết, chuyển sang stage tiếp theo
5. **Chiến thắng**: Hoàn thành cả 10 stage!

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

## Công nghệ

- **Phaser 3** - Game framework
- **HTML5 Canvas** - Rendering
- **JavaScript** - Logic

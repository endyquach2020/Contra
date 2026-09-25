import { X, Gamepad2, Award, Zap, Shield, Sparkles, AlertTriangle } from 'lucide-react';

interface InstructionsModalProps {
  onClose: () => void;
}

export function InstructionsModal({ onClose }: InstructionsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4 font-pixel">
      <div className="relative w-full max-w-2xl border-4 border-yellow-500 bg-[#0e1220] p-6 text-white shadow-[0_0_30px_rgba(234,179,8,0.4)] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-yellow-500/60 pb-3 mb-4">
          <div className="flex items-center gap-2 text-yellow-400">
            <Gamepad2 className="w-5 h-5" />
            <h2 className="text-xs md:text-sm font-bold tracking-wider">
              HƯỚNG DẪN CHIẾN DỊCH & VŨ KHÍ CONTRA
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content sections */}
        <div className="space-y-5 text-xs leading-relaxed">
          {/* Controls */}
          <div>
            <h3 className="text-amber-300 font-bold mb-2 flex items-center gap-2 text-xs">
              <Zap className="w-4 h-4 text-amber-400" />
              1. BỘ ĐIỀU KHIỂN CHIẾN BINH:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-[#161c30] p-3 border border-neutral-700">
              <div>
                <span className="text-[#3cbcfc]">← → / A D:</span> Di chuyển trái / phải
              </div>
              <div>
                <span className="text-emerald-400 font-bold">Space / W / ↑:</span> Nhảy bật cao
              </div>
              <div>
                <span className="text-[#f83800] font-bold">X / B / J:</span> Bắn đạn liên tục
              </div>
              <div>
                <span className="text-amber-300 font-bold">Phím A, B, C, D:</span> Chọn đáp án câu hỏi tại cổng
              </div>
              <div>
                <span className="text-white font-bold">Enter:</span> Xác nhận đáp án
              </div>
            </div>
          </div>

          {/* Mushroom & Powerups */}
          <div>
            <h3 className="text-amber-300 font-bold mb-2 flex items-center gap-2 text-xs">
              <Sparkles className="w-4 h-4 text-amber-400" />
              2. ĂN NẤM & NHẶT HỘP TIẾP TẾ:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
              <div className="p-2.5 border border-amber-500/50 bg-amber-950/20 rounded">
                <span className="text-amber-400 font-bold block mb-1">🍄 Siêu Nấm Khổng Lồ</span>
                <span className="text-neutral-300 text-[10px]">
                  Ăn nấm giúp bạn tăng ngay +1 Tim, phóng to thân hình gấp 1.35 lần, có hào quang vàng và có thể chạy xuyên nghiền nát lính địch!
                </span>
              </div>
              <div className="p-2.5 border border-cyan-500/50 bg-cyan-950/20 rounded">
                <span className="text-cyan-400 font-bold block mb-1">❓ Khối Hộp Bí Ẩn & Drone</span>
                <span className="text-neutral-300 text-[10px]">
                  Bắn hoặc húc vào các hộp [ ? ] màu vàng hoặc bắn rơi Drone bay lượn để nhận Nấm, đạn dược hoặc hồi máu.
                </span>
              </div>
            </div>
          </div>

          {/* Weapons */}
          <div>
            <h3 className="text-amber-300 font-bold mb-2 flex items-center gap-2 text-xs">
              <Shield className="w-4 h-4 text-[#00f0ff]" />
              3. KHO ĐẠN DƯỢC & HỎA LỰC CAO CẤP:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
              <div className="p-2 border border-red-500/50 bg-red-950/30 text-center rounded">
                <span className="text-sm font-bold text-red-400 block">[ S ]</span>
                <span className="text-neutral-300 font-semibold">Spread Gun</span>
                <span className="text-neutral-400 block text-[9px]">Tỏa chùm đạn lửa</span>
              </div>
              <div className="p-2 border border-blue-500/50 bg-blue-950/30 text-center rounded">
                <span className="text-sm font-bold text-[#00f0ff] block">[ M ]</span>
                <span className="text-neutral-300 font-semibold">Machine Gun</span>
                <span className="text-neutral-400 block text-[9px]">Liên thanh xả đạn cực nhanh</span>
              </div>
              <div className="p-2 border border-purple-500/50 bg-purple-950/30 text-center rounded">
                <span className="text-sm font-bold text-fuchsia-400 block">[ L ]</span>
                <span className="text-neutral-300 font-semibold">Laser Beam</span>
                <span className="text-neutral-400 block text-[9px]">Tia laser xuyên thấu</span>
              </div>
              <div className="p-2 border border-orange-500/50 bg-orange-950/30 text-center rounded">
                <span className="text-sm font-bold text-orange-400 block">[ F ]</span>
                <span className="text-neutral-300 font-semibold">Fire Gun</span>
                <span className="text-neutral-400 block text-[9px]">Cầu lửa xoay nổ sát thương</span>
              </div>
            </div>
          </div>

          {/* Obstacles & Hazards */}
          <div>
            <h3 className="text-amber-300 font-bold mb-2 flex items-center gap-2 text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              4. ĐA DẠNG CHƯỚNG NGẠI VẬT TRÊN CHIẾN TRƯỜNG:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] bg-[#161c30] p-3 border border-rose-900/60">
              <div>
                <span className="text-rose-400 font-bold">⚠️ Bẫy Chông Gai:</span> Cần căn bước nhảy qua, tránh chạm vào gai sắc.
              </div>
              <div>
                <span className="text-amber-400 font-bold">💥 Thùng Thuốc Nổ TNT:</span> Bắn nổ để tiêu diệt hàng loạt quân địch lân cận!
              </div>
              <div>
                <span className="text-cyan-400 font-bold">⚙️ Lưỡi Cưa Xoay:</span> Cưa thép quay tốc độ cao tuần tra trên đường ray.
              </div>
              <div>
                <span className="text-orange-400 font-bold">🔥 Ống Phun Lửa:</span> Phun cột lửa định kỳ, chỉ di chuyển khi lửa tắt.
              </div>
            </div>
          </div>

          {/* Quiz Gate */}
          <div className="p-3 border-2 border-emerald-500/60 bg-emerald-950/30 rounded">
            <h4 className="text-xs text-emerald-400 font-bold mb-1 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              CỔNG MẬT MÃ TRI THỨC:
            </h4>
            <p className="text-[10px] text-neutral-300">
              Chạm vào cột laser đỏ để giải mã câu hỏi. Bấm trực tiếp phím <strong className="text-white">A, B, C, D</strong> trên bàn phím để chọn và <strong className="text-white">Enter</strong> để xác nhận!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t border-neutral-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-yellow-500 hover:bg-yellow-400 border border-yellow-300 text-black font-bold text-xs cursor-pointer rounded"
          >
            ĐÃ HIỂU & CHIẾN ĐẤU
          </button>
        </div>
      </div>
    </div>
  );
}

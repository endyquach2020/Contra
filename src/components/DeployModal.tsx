import React, { useState } from 'react';
import { X, Copy, Check, Terminal, FileCode, CheckCircle2, Rocket, FolderArchive } from 'lucide-react';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployModal: React.FC<DeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(id);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const gitCommands = `# 1. Khởi tạo repository Git tại thư mục dự án
git init
git add .
git commit -m "Deploy Contra Edu Arena"

# 2. Liên kết đến GitHub repository của bạn (Thay <username> và <repo>)
git branch -M main
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#071a24] border-2 border-[#00f0ff] rounded-2xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.3)] max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#0d4a65]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#00f0ff] to-[#047857] flex items-center justify-center text-black font-black text-xl shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-black text-transparent bg-clip-text bg-linear-to-r from-[#bef264] via-[#00f0ff] to-white">
                HƯỚNG DẪN DEPLOY LÊN GITHUB
              </h2>
              <p className="text-xs text-neutral-400 font-reading">
                Đã chuẩn bị sẵn mã nguồn thuần HTML, CSS & JavaScript trong thư mục <code className="text-[#00f0ff] bg-black/40 px-1 py-0.5 rounded">github-deploy/</code>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/60 rounded-xl transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-5 text-sm font-reading">

          {/* Option 1: Super easy GitHub Pages via standalone HTML/CSS/JS */}
          <div className="bg-[#05131a] border border-[#10b981]/50 rounded-xl p-4 flex flex-col gap-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-heading font-extrabold text-[#34d399] text-base">
                <CheckCircle2 className="w-5 h-5 text-[#34d399]" />
                CÁCH 1: DÙNG BỘ MÃ NGUỒN THUẦN HTML/CSS/JS (DỄ NHẤT)
              </span>
              <span className="text-[10px] bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/50 px-2 py-0.5 rounded-full font-bold">
                KHÔNG CẦN CÀI ĐẶT
              </span>
            </div>
            <p className="text-xs text-neutral-300">
              Trong thư mục <b className="text-white">github-deploy/</b> có sẵn 3 file:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
              <div className="bg-[#020b0f] border border-[#0d4a65] p-2.5 rounded-lg flex items-center gap-2 text-amber-300">
                <FileCode className="w-4 h-4 text-amber-400" />
                <span>index.html</span>
              </div>
              <div className="bg-[#020b0f] border border-[#0d4a65] p-2.5 rounded-lg flex items-center gap-2 text-cyan-300">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <span>style.css</span>
              </div>
              <div className="bg-[#020b0f] border border-[#0d4a65] p-2.5 rounded-lg flex items-center gap-2 text-emerald-300">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span>game.js</span>
              </div>
            </div>

            <ol className="list-decimal list-inside text-xs text-neutral-300 flex flex-col gap-1.5 pl-1">
              <li>Lên <b>GitHub.com</b> tạo một Repository mới (đặt tên ví dụ <code className="text-[#00f0ff]">contra-game</code>, chọn Public).</li>
              <li>Nhấn <b>Upload files</b> và kéo thả 3 file trên vào rồi bấm <b>Commit changes</b>.</li>
              <li>Vào <b>Settings</b> &rarr; chọn <b>Pages</b> &rarr; tại <i>Branch</i> chọn <b>main</b> &rarr; nhấn <b>Save</b>.</li>
              <li>Chờ 1 phút, website sẽ hoạt động trực tiếp tại <code className="text-[#34d399]">https://&lt;username&gt;.github.io/contra-game/</code>!</li>
            </ol>
          </div>

          {/* Option 2: Full repository with Git & GitHub */}
          <div className="bg-[#05131a] border border-[#0d4a65] rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-heading font-extrabold text-[#00f0ff] text-base">
                <FolderArchive className="w-5 h-5 text-[#00f0ff]" />
                CÁCH 2: PUSH TOÀN BỘ REPOSITORY LÊN GITHUB
              </span>
              <span className="text-[10px] bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/50 px-2 py-0.5 rounded-full font-bold">
                GIT / VERCEL / NETLIFY
              </span>
            </div>
            <p className="text-xs text-neutral-300">
              Đã cấu hình đường dẫn tương đối <code className="text-[#00f0ff]">base: './'</code> trong <code className="text-[#00f0ff]">vite.config.ts</code>, tương thích 100% khi đẩy lên GitHub hoặc kết nối với Vercel / Netlify:
            </p>

            <div className="relative bg-[#020b0f] border border-[#0d4a65] rounded-xl p-3 font-mono text-xs text-neutral-200">
              <button
                onClick={() => handleCopy(gitCommands, 'git')}
                className="absolute right-3 top-3 px-2 py-1 bg-[#071a24] hover:bg-[#0c394b] border border-[#00f0ff]/40 rounded text-[11px] text-[#00f0ff] flex items-center gap-1 cursor-pointer"
              >
                {copiedTab === 'git' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedTab === 'git' ? 'Đã sao chép' : 'Sao chép lệnh'}</span>
              </button>
              <pre className="overflow-x-auto pr-24">{gitCommands}</pre>
            </div>
          </div>

          {/* Cleaned Files Note */}
          <div className="bg-[#0b241b]/80 border border-[#10b981]/40 rounded-xl p-3 text-xs text-neutral-300 flex items-center gap-2.5">
            <Terminal className="w-5 h-5 text-[#34d399] shrink-0" />
            <div>
              <b className="text-[#34d399]">Đã dọn dẹp các file không cần thiết:</b> Đã xóa <code className="text-amber-300">bun.lock</code>, loại bỏ các thư viện dư thừa (express, dotenv, v.v.), sẵn sàng để push lên GitHub mà không bị lỗi phụ thuộc.
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-[#0d4a65] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-linear-to-r from-[#00f0ff] to-[#047857] hover:from-[#38bdf8] hover:to-[#059669] text-black font-heading font-black rounded-xl text-xs sm:text-sm tracking-wider cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
          >
            ĐÃ HIỂU & ĐÓNG
          </button>
        </div>

      </div>
    </div>
  );
};

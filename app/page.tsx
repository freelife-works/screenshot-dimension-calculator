"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";

// ── デバイスプリセット ────────────────────────────────────────────────
type DeviceCategory = "iPhone" | "iPad" | "Android" | "Windows" | "Mac";

interface DevicePreset {
  name: string;
  category: DeviceCategory;
  width: number;
  height: number;
  dpi: number;
}

const DEVICE_PRESETS: DevicePreset[] = [
  // iPhone
  { name: "iPhone 16 Pro Max", category: "iPhone", width: 1320, height: 2868, dpi: 460 },
  { name: "iPhone 16 Pro", category: "iPhone", width: 1206, height: 2622, dpi: 460 },
  { name: "iPhone 16 / 16 Plus", category: "iPhone", width: 1179, height: 2556, dpi: 460 },
  { name: "iPhone 15 Pro Max", category: "iPhone", width: 1290, height: 2796, dpi: 460 },
  { name: "iPhone 15 / 15 Pro", category: "iPhone", width: 1179, height: 2556, dpi: 460 },
  { name: "iPhone SE (第3世代)", category: "iPhone", width: 750, height: 1334, dpi: 326 },
  { name: "iPhone 14 Plus", category: "iPhone", width: 1284, height: 2778, dpi: 458 },
  // iPad
  { name: "iPad Pro 13インチ (M4)", category: "iPad", width: 2064, height: 2752, dpi: 264 },
  { name: "iPad Pro 11インチ (M4)", category: "iPad", width: 1668, height: 2420, dpi: 264 },
  { name: "iPad Air 13インチ (M2)", category: "iPad", width: 2064, height: 2752, dpi: 264 },
  { name: "iPad Air 11インチ (M2)", category: "iPad", width: 1668, height: 2224, dpi: 264 },
  { name: "iPad (第10世代)", category: "iPad", width: 1640, height: 2360, dpi: 264 },
  { name: "iPad mini (第6世代)", category: "iPad", width: 1488, height: 2266, dpi: 326 },
  // Android
  { name: "Samsung Galaxy S24 Ultra", category: "Android", width: 1440, height: 3088, dpi: 505 },
  { name: "Samsung Galaxy S24+", category: "Android", width: 1080, height: 2340, dpi: 393 },
  { name: "Samsung Galaxy S24", category: "Android", width: 1080, height: 2340, dpi: 416 },
  { name: "Google Pixel 9 Pro XL", category: "Android", width: 1344, height: 2992, dpi: 486 },
  { name: "Google Pixel 9", category: "Android", width: 1080, height: 2424, dpi: 422 },
  { name: "Xiaomi 14 Ultra", category: "Android", width: 1260, height: 2712, dpi: 522 },
  // Windows
  { name: "Full HD (1920×1080)", category: "Windows", width: 1920, height: 1080, dpi: 96 },
  { name: "QHD (2560×1440)", category: "Windows", width: 2560, height: 1440, dpi: 109 },
  { name: "4K UHD (3840×2160)", category: "Windows", width: 3840, height: 2160, dpi: 163 },
  { name: "Surface Pro 11 (2880×1920)", category: "Windows", width: 2880, height: 1920, dpi: 267 },
  { name: "Surface Laptop 7 (2304×1536)", category: "Windows", width: 2304, height: 1536, dpi: 201 },
  // Mac
  { name: "MacBook Air 15インチ M3 (2560×1664)", category: "Mac", width: 2560, height: 1664, dpi: 224 },
  { name: "MacBook Pro 14インチ M4 (3024×1964)", category: "Mac", width: 3024, height: 1964, dpi: 254 },
  { name: "MacBook Pro 16インチ M4 (3456×2234)", category: "Mac", width: 3456, height: 2234, dpi: 254 },
  { name: "iMac 24インチ 4.5K (4480×2520)", category: "Mac", width: 4480, height: 2520, dpi: 218 },
  { name: "Studio Display 5K (5120×2880)", category: "Mac", width: 5120, height: 2880, dpi: 218 },
];

const CATEGORY_ICONS: Record<DeviceCategory, string> = {
  iPhone: "📱",
  iPad: "🖥️",
  Android: "🤖",
  Windows: "🪟",
  Mac: "🍎",
};

const CATEGORY_COLORS: Record<DeviceCategory, string> = {
  iPhone: "bg-blue-100 text-blue-700 border-blue-200",
  iPad: "bg-purple-100 text-purple-700 border-purple-200",
  Android: "bg-green-100 text-green-700 border-green-200",
  Windows: "bg-sky-100 text-sky-700 border-sky-200",
  Mac: "bg-gray-100 text-gray-700 border-gray-200",
};

// ── GCD ─────────────────────────────────────────────────────────────────
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function aspectRatio(w: number, h: number): string {
  if (!w || !h) return "–";
  const d = gcd(Math.round(w), Math.round(h));
  return `${Math.round(w) / d} : ${Math.round(h) / d}`;
}

// ── メインコンポーネント ──────────────────────────────────────────────
export default function Home() {
  const [width, setWidth] = useState<string>("1920");
  const [height, setHeight] = useState<string>("1080");
  const [dpi, setDpi] = useState<string>("96");
  const [activeCategory, setActiveCategory] = useState<DeviceCategory | "ALL">("ALL");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 計算値
  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const d = parseFloat(dpi) || 96;

  const ar = aspectRatio(w, h);
  const diagonal = w && h ? Math.sqrt(w * w + h * h).toFixed(1) : "–";
  const widthInch = w && d ? (w / d).toFixed(3) : "–";
  const heightInch = h && d ? (h / d).toFixed(3) : "–";
  const diagonalInch = w && h && d ? (Math.sqrt(w * w + h * h) / d).toFixed(2) : "–";
  const widthCm = w && d ? ((w / d) * 2.54).toFixed(2) : "–";
  const heightCm = h && d ? ((h / d) * 2.54).toFixed(2) : "–";
  const megapixels = w && h ? ((w * h) / 1_000_000).toFixed(2) : "–";

  // プリセット適用
  const applyPreset = useCallback((preset: DevicePreset) => {
    setWidth(String(preset.width));
    setHeight(String(preset.height));
    setDpi(String(preset.dpi));
  }, []);

  // PNG エクスポート
  const exportPng = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cw = 800;
    const ch = 480;
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 背景グラデーション
    const grad = ctx.createLinearGradient(0, 0, cw, ch);
    grad.addColorStop(0, "#eef2ff");
    grad.addColorStop(1, "#ffffff");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cw, ch);

    // ヘッダー帯
    ctx.fillStyle = "#4f46e5";
    ctx.fillRect(0, 0, cw, 64);

    // タイトル
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("スクリーンショット仕様書", 24, 42);

    // 日付
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "#c7d2fe";
    ctx.textAlign = "right";
    ctx.fillText(new Date().toLocaleDateString("ja-JP"), cw - 24, 42);
    ctx.textAlign = "left";

    // 解像度大見出し
    ctx.fillStyle = "#312e81";
    ctx.font = "bold 52px sans-serif";
    ctx.fillText(`${w || "–"} × ${h || "–"} px`, 24, 150);

    // サブ情報
    const items: [string, string][] = [
      ["アスペクト比", ar],
      ["DPI", `${d} dpi`],
      ["対角線 (px)", diagonal + " px"],
      ["幅 (インチ)", widthInch + " in"],
      ["高さ (インチ)", heightInch + " in"],
      ["対角線 (インチ)", diagonalInch + " in"],
      ["幅 (cm)", widthCm + " cm"],
      ["高さ (cm)", heightCm + " cm"],
      ["メガピクセル", megapixels + " MP"],
    ];

    ctx.font = "14px sans-serif";
    items.forEach(([label, value], i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = 24 + col * 258;
      const y = 210 + row * 70;

      // カード背景
      ctx.fillStyle = "#f0f4ff";
      ctx.beginPath();
      ctx.roundRect(x, y, 240, 52, 8);
      ctx.fill();

      ctx.fillStyle = "#6366f1";
      ctx.font = "12px sans-serif";
      ctx.fillText(label, x + 12, y + 20);

      ctx.fillStyle = "#1e1b4b";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(value, x + 12, y + 40);
    });

    // フッター
    ctx.fillStyle = "#a5b4fc";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Generated by スクリーンショット寸法計算機 | FreeLifeTools", cw / 2, ch - 16);

    // ダウンロード
    const link = document.createElement("a");
    link.download = `screenshot-spec_${w}x${h}_${d}dpi.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [w, h, d, ar, diagonal, widthInch, heightInch, diagonalInch, widthCm, heightCm, megapixels]);

  // フィルタ済みプリセット
  const filteredPresets =
    activeCategory === "ALL"
      ? DEVICE_PRESETS
      : DEVICE_PRESETS.filter((p) => p.category === activeCategory);

  const categories: (DeviceCategory | "ALL")[] = ["ALL", "iPhone", "iPad", "Android", "Windows", "Mac"];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center gap-3">
          <span className="text-3xl">📐</span>
          <div>
            <h1 className="text-xl font-bold leading-tight">スクリーンショット寸法計算機</h1>
            <p className="text-indigo-200 text-sm">解像度・DPI・インチ・アスペクト比を一括計算</p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-8">
        <AdBanner slot="1234567890" format="horizontal" />

        {/* ── 入力パネル ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6">
          <h2 className="text-base font-semibold text-indigo-700 mb-4 flex items-center gap-2">
            <span>🔢</span> 解像度・DPI を入力
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">幅 (px)</label>
              <input
                type="number"
                min={1}
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="1920"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">高さ (px)</label>
              <input
                type="number"
                min={1}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="1080"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">DPI / PPI</label>
              <input
                type="number"
                min={1}
                value={dpi}
                onChange={(e) => setDpi(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="96"
              />
            </div>
          </div>
        </section>

        {/* ── 計算結果 ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6">
          <h2 className="text-base font-semibold text-indigo-700 mb-4 flex items-center gap-2">
            <span>📊</span> 計算結果
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { label: "アスペクト比", value: ar, icon: "⬛" },
              { label: "対角線 (px)", value: diagonal !== "–" ? `${diagonal} px` : "–", icon: "📏" },
              { label: "メガピクセル", value: megapixels !== "–" ? `${megapixels} MP` : "–", icon: "🔭" },
              { label: "DPI / PPI", value: `${d} dpi`, icon: "🎯" },
              { label: "幅 (インチ)", value: widthInch !== "–" ? `${widthInch} in` : "–", icon: "↔️" },
              { label: "高さ (インチ)", value: heightInch !== "–" ? `${heightInch} in` : "–", icon: "↕️" },
              { label: "対角線 (インチ)", value: diagonalInch !== "–" ? `${diagonalInch} in` : "–", icon: "📐" },
              { label: "幅 (cm)", value: widthCm !== "–" ? `${widthCm} cm` : "–", icon: "↔️" },
              { label: "高さ (cm)", value: heightCm !== "–" ? `${heightCm} cm` : "–", icon: "↕️" },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
                <div className="text-xs text-indigo-500 mb-0.5 flex items-center gap-1">
                  <span>{icon}</span> {label}
                </div>
                <div className="text-base font-bold text-indigo-900 font-mono truncate">{value}</div>
              </div>
            ))}
          </div>

          {/* PNG エクスポートボタン */}
          <div className="mt-5 flex justify-end">
            <button
              onClick={exportPng}
              disabled={!w || !h}
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm text-sm"
            >
              <span>🖼️</span> 仕様書を PNG でエクスポート
            </button>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </section>

        {/* ── ピクセル↔インチ変換表 ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6">
          <h2 className="text-base font-semibold text-indigo-700 mb-4 flex items-center gap-2">
            <span>🔄</span> ピクセル ↔ インチ 変換表（DPI: {d}）
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-indigo-50 text-indigo-700">
                  <th className="text-left px-3 py-2 rounded-tl-lg">ピクセル (px)</th>
                  <th className="text-left px-3 py-2">インチ (in)</th>
                  <th className="text-left px-3 py-2 rounded-tr-lg">センチメートル (cm)</th>
                </tr>
              </thead>
              <tbody>
                {[8, 16, 32, 64, 72, 96, 128, 160, 192, 256, 320, 480, 512, 720, 1024].map((px) => (
                  <tr key={px} className="border-b border-gray-50 hover:bg-indigo-50/40 transition-colors">
                    <td className="px-3 py-1.5 font-mono font-medium text-gray-700">{px} px</td>
                    <td className="px-3 py-1.5 font-mono text-indigo-600">{(px / d).toFixed(4)} in</td>
                    <td className="px-3 py-1.5 font-mono text-indigo-600">{((px / d) * 2.54).toFixed(4)} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <AdBanner slot="0987654321" format="rectangle" />

        {/* ── デバイスプリセット ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6">
          <h2 className="text-base font-semibold text-indigo-700 mb-4 flex items-center gap-2">
            <span>📱</span> デバイスプリセット
          </h2>

          {/* カテゴリフィルタ */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                  activeCategory === cat
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-indigo-300"
                }`}
              >
                {cat === "ALL" ? "すべて" : `${CATEGORY_ICONS[cat]} ${cat}`}
              </button>
            ))}
          </div>

          {/* プリセット一覧 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all text-left group"
              >
                <span className="text-xl mt-0.5">{CATEGORY_ICONS[preset.category]}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 leading-snug truncate group-hover:text-indigo-700">
                    {preset.name}
                  </div>
                  <div className="text-xs text-gray-400 font-mono mt-0.5">
                    {preset.width} × {preset.height} px · {preset.dpi} DPI
                  </div>
                </div>
                <span className={`text-xs px-1.5 py-0.5 rounded-md border font-medium self-start ${CATEGORY_COLORS[preset.category]}`}>
                  {preset.category}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ── 使い方ガイド ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6">
          <h2 className="text-base font-semibold text-indigo-700 mb-3 flex items-center gap-2">
            <span>💡</span> 使い方・機能説明
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2"><span className="text-indigo-400 font-bold shrink-0">①</span>幅・高さ・DPIを直接入力するか、プリセットをクリックして自動入力します。</li>
            <li className="flex gap-2"><span className="text-indigo-400 font-bold shrink-0">②</span>計算結果セクションでアスペクト比・対角線・メガピクセル・インチ・cm換算を確認できます。</li>
            <li className="flex gap-2"><span className="text-indigo-400 font-bold shrink-0">③</span>変換表ではよく使うピクセル数のインチ・cm換算を一覧表示します。DPI変更で即時更新されます。</li>
            <li className="flex gap-2"><span className="text-indigo-400 font-bold shrink-0">④</span>「仕様書をPNGでエクスポート」ボタンで全情報をまとめた画像ファイルをダウンロードできます。</li>
          </ul>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t border-indigo-100 bg-white mt-8">
        <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© 2026 スクリーンショット寸法計算機 | FreeLifeTools</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-indigo-500 transition-colors">プライバシーポリシー</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

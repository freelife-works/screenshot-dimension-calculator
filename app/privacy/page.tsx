import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | スクリーンショット寸法計算機",
  description: "スクリーンショット寸法計算機のプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center gap-3">
          <Link href="/" className="text-indigo-200 hover:text-white transition-colors text-sm">← ホームに戻る</Link>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-8 space-y-6">
          <h1 className="text-2xl font-bold text-indigo-700">プライバシーポリシー</h1>
          <p className="text-sm text-gray-500">最終更新日：2026年4月26日</p>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">1. 収集する情報</h2>
            <p className="text-sm text-gray-600">
              本アプリ（スクリーンショット寸法計算機）は、ユーザーが入力した解像度・DPI等の数値をブラウザ内のみで処理します。
              入力された数値はサーバーに送信・保存されることはありません。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">2. Google AdSense について</h2>
            <p className="text-sm text-gray-600">
              本サービスでは、Google AdSense による広告を掲載する場合があります。
              Google AdSense は Cookie を使用して、ユーザーの興味に基づいた広告を表示することがあります。
              詳細は
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline mx-1"
              >
                Google のプライバシーポリシー
              </a>
              をご覧ください。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">3. アクセス解析</h2>
            <p className="text-sm text-gray-600">
              本サービスでは、サービス改善のためにアクセス解析ツールを使用する場合があります。
              これらのツールは Cookie を使用しますが、個人を特定する情報は収集しません。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">4. お問い合わせ</h2>
            <p className="text-sm text-gray-600">
              プライバシーポリシーに関するご質問は、FreeLifeTools のサポートページよりお問い合わせください。
            </p>
          </section>
        </div>
      </main>
      <footer className="border-t border-indigo-100 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-4 text-xs text-gray-400 text-center">
          © 2026 スクリーンショット寸法計算機 | FreeLifeTools
        </div>
      </footer>
    </div>
  );
}

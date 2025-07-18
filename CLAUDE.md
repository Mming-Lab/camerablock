# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

このプロジェクトは、Minecraft Education Edition用のMakeCode拡張機能で、カメラ制御ブロックを提供します。MakeCodeエディタでビジュアルブロックを通じてカメラの動き、角度、エフェクトを制御できます。

## プロジェクト構造

- `src/camera.ts`: TypeScript APIを使用したコアカメラ制御機能
- `main.ts`: エントリーポイント（現在は空）
- `main.blocks`: ビジュアルブロック定義
- `test.ts`: テストファイル（現在は空）
- `pxt.json`: MakeCodeプロジェクト設定
- `_locales/ja/`: 日本語ローカライゼーション文字列
- `icon.png`: 拡張機能アイコン

## ビルドと開発コマンド

このプロジェクトはMakeCode/PXTビルドシステムを使用：

```bash
# 拡張機能をビルド
pxt build

# ローカルシミュレーターにデプロイ
pxt deploy

# テストを実行
pxt test
```

またはMakefileを使用：

```bash
# ビルドとデプロイ
make

# ビルドのみ
make build

# デプロイのみ
make deploy

# テスト実行
make test
```

## コアアーキテクチャ

拡張機能は`src/camera.ts`の`Camera`名前空間を中心に構築されており、以下を提供：

1. **基本カメラ制御**: 位置設定、回転、ターゲティング
2. **イージング機能**: 様々なイージングタイプでスムーズなカメラ移動
3. **フェードエフェクト**: カスタマイズ可能な色でのスクリーンフェードイン/アウト
4. **Minecraftコマンド統合**: カメラコマンドの生成と実行

### 主要コンポーネント

- **Easing列挙型**: スムーズなカメラ遷移のための28種類のイージングタイプを定義
- **Camera名前空間**: 機能別にグループ化されたメインAPI：
  - 基本位置設定（`Pos`, `Rot`, `FacingEntity`, `FacingPosition`）
  - スムーズな移動（`EasePosition`, `EaseEntity`, `EaseRot`）
  - エフェクト（`fadeTime`, `CameraClear`）
  - ユーティリティ（`rgb`, `setcolors`, `_getEasingId`）

### コマンド生成

すべてのカメラ機能は以下のベースパターンでMinecraftカメラコマンドを生成：
```
camera @s set minecraft:free [追加パラメータ]
```

## ローカライゼーション

拡張機能は`_locales/ja/camerablock-strings.json`を通じて日本語ローカライゼーションをサポートし、英語ブロック名を日本語に対応させています。

## ターゲットプラットフォーム

- ターゲット: Minecraft Education Edition (v1.7.28)
- 言語: TypeScript
- フレームワーク: MakeCode/PXT
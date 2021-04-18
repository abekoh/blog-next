import path from 'path';

import { createCanvas, registerFont } from 'canvas';
import { NextApiRequest, NextApiResponse } from 'next';

import theme from '../../theme/theme';

const generateOgpImage = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  // inputs
  const width = parseInt(getOneQueryElement(req, 'width')) || 1300;
  const height = parseInt(getOneQueryElement(req, 'height')) || 630;

  // setup
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  registerFont(path.resolve('./fonts/NotoSansJP-Medium.otf'), {
    family: 'Noto Sans JP',
  });

  // background
  ctx.fillStyle = theme.palette.background.default;
  ctx.fillRect(0, 0, width, height);

  // text
  ctx.font = "60px 'Noto Sans JP'";
  ctx.fillStyle = theme.palette.text.primary;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(
    insertNewLine('GitHub Actions + PlantUMLでドメインモデルの管理を楽にする'),
    width / 2,
    height / 2 - 60,
  );

  const buffer = canvas.toBuffer();

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  });
  res.end(buffer, 'binary');
};

// eslint-disable-next-line no-control-regex
const ASCII_REGEX = /[\x00-\x7F]/;

/**
 * 1文字の幅のサイズ。ASCIIなら1、それ以外なら2
 * @param input サイズを測る文字列、1文字のみを想定
 * @returns サイズ
 */
const charSize: (input: string) => number = (input) =>
  ASCII_REGEX.test(input) ? (1 as number) : (2 as number);

/**
 * 文字列を適度に改行する
 * @param input 改行対象の文字列
 * @param lengthPerLine 1行あたりの幅
 * @returns 改行が入った文字列
 */
const insertNewLine: (input: string, lengthPerLine?: number) => string = (
  input,
  lengthPerLine = 30,
) => {
  let charSizeSum = 0;
  let nextNewLineSum = lengthPerLine;
  let result = '';
  for (const char of input.split('')) {
    charSizeSum += charSize(char);
    if (charSizeSum >= nextNewLineSum) {
      result += '\n' + char;
      nextNewLineSum += lengthPerLine;
    } else {
      result += char;
    }
  }
  return result;
};

/**
 * クエリを配列でなく、最初の1つに絞ったものにする
 *
 * @param req NextApiRequest
 * @param key キー
 * @returns stringの値
 */
const getOneQueryElement: (req: NextApiRequest, key: string) => string = (
  req,
  key,
) => {
  return Array.isArray(req.query[key])
    ? req.query[key][0]
    : (req.query[key] as string);
};

export default generateOgpImage;

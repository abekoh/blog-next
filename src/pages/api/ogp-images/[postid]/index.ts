import path from 'path';

import { createCanvas, loadImage, registerFont } from 'canvas';
import { NextApiRequest, NextApiResponse } from 'next';

import { siteData } from '../../../../data/site';
import theme from '../../../../theme/theme';
import { client } from '../../../../utils/api';

const generateOgpImage = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  // inputs
  const width = parseInt(getOneQueryElement(req, 'width')) || 1200;
  const height = parseInt(getOneQueryElement(req, 'height')) || 630;
  const post = await client.v1.posts
    ._id(getOneQueryElement(req, 'postid'))
    .$get({
      query: {
        fields: 'title',
      },
    });
  const title = post.title || '';

  // setup
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  registerFont(path.resolve('./fonts/NotoSansJP-Medium.otf'), {
    family: 'Noto Sans JP',
  });
  const fontFamilyName = "'Noto Sans JP'";

  // background
  const margin = 32;
  ctx.fillStyle = theme.palette.primary.light;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = theme.palette.background.paper;
  ctx.fillRect(margin, margin, width - margin * 2, height - margin * 2);

  // sitename
  const padding = 10;
  ctx.font = `35px ${fontFamilyName}`;
  ctx.fillStyle = theme.palette.text.secondary;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText(
    siteData.title,
    width - padding - margin,
    height - padding - margin,
  );

  // logo
  const logoImage = await loadImage(path.resolve('./public/logo.png'));
  ctx.drawImage(
    logoImage,
    width - padding - margin - 380,
    height - padding - margin - 62,
  );

  // text
  const titleFontSize = 60;
  ctx.font = `${titleFontSize}px ${fontFamilyName}`;
  ctx.fillStyle = theme.palette.text.primary;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const { withNewLine, numOfNewLine } = insertNewLine(title);
  ctx.fillText(
    withNewLine,
    width / 2,
    height / 2 - titleFontSize * numOfNewLine,
  );

  const buffer = canvas.toBuffer();

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
    // 1週間
    'Cache-Control': 's-maxage=604800, stale-while-revalidate',
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
const insertNewLine: (
  input: string,
  lengthPerLine?: number,
) => { withNewLine: string; numOfNewLine: number } = (
  input,
  lengthPerLine = 30,
) => {
  let charSizeSum = 0;
  let nextNewLineSum = lengthPerLine;
  let result = '';
  let numOfNewLine = 0;
  for (const char of input.split('')) {
    charSizeSum += charSize(char);
    if (charSizeSum >= nextNewLineSum) {
      result += '\n' + char;
      numOfNewLine++;
      nextNewLineSum += lengthPerLine;
    } else {
      result += char;
    }
  }
  return {
    withNewLine: result,
    numOfNewLine,
  };
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

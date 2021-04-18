import { createCanvas } from 'canvas';
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

  // background
  ctx.fillStyle = theme.palette.background.default;
  ctx.fillRect(0, 0, width, height);

  const buffer = canvas.toBuffer();

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  });
  res.end(buffer, 'binary');
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

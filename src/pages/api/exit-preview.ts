import { NextApiRequest, NextApiResponse } from 'next';

import { microcmsClient } from '../../utils/api';
import { toStringId } from '../../utils/toStringId';

const exitPreview = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const id = toStringId(req.query.id);
  const post = await microcmsClient.v1.posts._id(id).$get({
    query: { fields: 'id' },
  });

  res.clearPreviewData();
  res.writeHead(307, { Location: post ? `/posts/${post.id}` : '/' });
  res.end();
};

export default exitPreview;

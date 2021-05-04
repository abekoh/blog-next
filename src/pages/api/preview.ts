import { NextApiRequest, NextApiResponse } from 'next';

import { microcmsClient } from '../../utils/api';
import { toStringId } from '../../utils/toStringId';

const preview = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const id = toStringId(req.query.id);
  const draftKey = toStringId(req.query.draftKey);
  const post = await microcmsClient.v1.posts._id(id).$get({
    query: {
      fields: 'id,title,body,htmlBody,isHtml,tags,categories,publishedAt',
      draftKey,
    },
  });

  if (!post) {
    return res.status(401).json({ message: 'Invalid contentId' });
  }

  res.setPreviewData({ ...post, draftKey });
  res.writeHead(307, { Location: `/posts/${post.id}` });
  res.end();
};

export default preview;

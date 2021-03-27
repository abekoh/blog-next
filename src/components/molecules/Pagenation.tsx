import React from 'react';

import Link from 'next/link';

type Props = {
  perPageCount: number;
  totalCount: number;
};

const Pagenation: React.FC<Props> = ({ perPageCount, totalCount }) => {
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  return (
    <ul>
      {range(1, Math.ceil(totalCount / perPageCount)).map((number, index) => (
        <li key={index}>
          <Link href={`/posts/page/${number}`}>
            <a>{number}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Pagenation;

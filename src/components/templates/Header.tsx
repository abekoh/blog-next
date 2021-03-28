import React from 'react';

import Link from 'next/link';

type Props = {
  blogTitle: string;
};
const Header: React.FC<Props> = ({ blogTitle }) => {
  return (
    <header>
      <h1>{blogTitle}</h1>
      <ul>
        <li>
          <Link href={`/`}>Home</Link>
        </li>
        <li>
          <Link href={`/about`}>About</Link>
        </li>
        <li>
          <Link href={`/posts`}>Posts</Link>
        </li>
        <li>
          <Link href={`/tags`}>Tags</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;

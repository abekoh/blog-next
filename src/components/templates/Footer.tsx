import React from 'react';

type Props = {
  copyright: string;
};
const Footer: React.FC<Props> = ({ copyright }) => {
  return (
    <footer>
      <p>{copyright}</p>
    </footer>
  );
};

export default Footer;

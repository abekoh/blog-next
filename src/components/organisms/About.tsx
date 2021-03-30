import React from 'react';

type Props = {
  title: string;
  body: string;
};

const About: React.FC<Props> = ({ title, body }) => {
  return (
    <>
      <header>
        <h2>{title}</h2>
      </header>
      <article
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      />
    </>
  );
};

export default About;
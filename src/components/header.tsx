import { Link } from 'gatsby';
import React from 'react';
import { css } from '@emotion/core';

type Props = {
  siteTitle: string;
};

const Header = ({ siteTitle }: Props) => (
  <header
    css={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      css={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          css={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

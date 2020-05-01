import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const aboutPath = `${__PATH_PREFIX__}/about`
    let header
    deckDeckGoHighlightElement();

    if (location.pathname === rootPath || location.pathname === aboutPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            textTransform: `uppercase`,
            textAlign: 'center',
            fontFamily: 'Quattrocento Sans'
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Quattrocento Sans`,
            marginTop: 0,
            textTransform: 'uppercase',
            textAlign: 'center'
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer style={{fontSize: '11px'}}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://github.com/gatsbyjs/gatsby-starter-blog">Gatsby</a>. 
        </footer>
      </div>
    )
  }
}

export default Layout

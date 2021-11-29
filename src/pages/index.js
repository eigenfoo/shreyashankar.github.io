import React from "react"
import { Link, graphql } from "gatsby"

import Links from "../components/links"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import kebabCase from "lodash/kebabCase"
import addToMailchimp from 'gatsby-plugin-mailchimp'

class BlogIndex extends React.Component {

  state = {
    name: null,
    email: null,
    subscribed: false,
    text: 'Stay up-to-date:'
  }

  _handleChange = e => {
    this.setState({
      [`${e.target.name}`]: e.target.value,
    })
  }

  _handleSubmit = e => {
    e.preventDefault();
    addToMailchimp(this.state.email, { name: this.state.name })
      .then(({ msg, result }) => {
        console.log('msg', `${result}: ${msg}`);
        if (result !== 'success') {
          this.setState({ text: 'You might already be subscribed. Try again!' });
        } else {
          this.setState({ subscribed: true, text: 'Thanks for subscribing!' });
        }
      })
      .catch(err => {
        console.log('err', err);
        // this.setState({text: err});
      });
  }

  formStyle = () => {
    return {
      paddingTop: '10px',
      justifyContent: 'center',
      display: 'flex',
      marginBottom: '0'
    };
  }

  inputStyle = () => {
    return {
      border: '1px solid #808080',
      borderRadius: '3px',
      paddingLeft: '10px',
      paddingRight: '10px'
    };
  }

  buttonStyle = () => {
    return {
      borderRadius: '3px',
      cursor: 'pointer',
      border: '1px solid #808080',
      background: 'rgba(0, 0, 0, 0.01)',
      marginLeft: '10px',
      padding: '10px'
    };
  }

  subscribeStyle = () => {
    return {
      justifyContent: 'center',
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      marginTop: '20px',
      paddingTop: '20px',
      paddingBottom: '20px',
      marginBottom: '20px',
      background: 'rgba(0, 0, 0, 0.05)'
    };
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    let subscribeComponent = (
      <div style={this.subscribeStyle()}>
        <div style={{ alignItems: 'center' }}>{this.state.text}</div>
      </div>
    );
    if (!this.state.subscribed) {
      subscribeComponent = (
        <div style={this.subscribeStyle()}>
          <div style={{ alignItems: 'center' }}>{this.state.text}</div>
          <form onSubmit={this._handleSubmit} style={this.formStyle()}>
            <input type="email" onChange={this._handleChange} placeholder="email" name="email" style={this.inputStyle()} />
            <input type="submit" value="Subscribe" style={this.buttonStyle()} />
          </form>
        </div>
      );
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Shreya Shankar"
          keywords={[`blog`, `ai`, `diversity`, `computers`]}
        />
        <Links />
        {subscribeComponent}
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug} >
              <small >{node.frontmatter.date} in </small>
              <small style={{ textTransform: 'uppercase', color: '#00688B' }}>
                <Link to={`/tags/${kebabCase(node.frontmatter.tags)}/`}>
                  #{node.frontmatter.tags}
                </Link>
              </small>
              <small> · {node.fields.readingTime.text} </small>
              <h3
                style={{
                  marginBottom: rhythm(1.5),
                  marginTop: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>

              {/* <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              /> */}
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
          fields {
            slug
            readingTime {
              text
            }
          }
        }
      }
    }
  }
`

import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";
const Blog = (props) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const fetchBlog = async (id) => {
    let res = await fetch("http://localhost:3002/blogPosts/" + id);
    if (res.ok) {
      let data = await res.json();
      setBlog(data);
    }
  };
  useEffect(() => {
    const { id } = params;
    fetchBlog(id);
  }, []);
  useEffect(() => {
    if (blog) {
      setLoading(false);
    }
  }, [blog]);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <>
        {blog && (
          <div className="blog-details-root">
            <Container>
              <Image className="blog-details-cover" src={blog.cover} fluid />
              <h1 className="blog-details-title">{blog.title}</h1>

              <div className="blog-details-container">
                <div className="blog-details-author">
                  <BlogAuthor {...blog.author} />
                </div>
                <div className="blog-details-info">
                  <div>{blog.createdAt}</div>
                  <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
                  <div
                    style={{
                      marginTop: 20,
                    }}
                  >
                    <BlogLike defaultLikes={["123"]} onChange={console.log} />
                  </div>
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: blog.content,
                }}
              ></div>
            </Container>
          </div>
        )}
      </>
    );
  }
};

export default Blog;

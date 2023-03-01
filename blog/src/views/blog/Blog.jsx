import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import "./styles.css";
const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const fetchBlog = async () => {
    let res = await fetch("http://localhost:3002/blogPosts/");
    if (res.ok) {
      let data = await res.json();
      console.log(data);
      setBlog(data);
      console.log(data);
      setLoading(false);
    } else {
      navigate("/404");
    }
  };
  useEffect(() => {
    // const { id } = params;
    fetchBlog();
    // posts.find((post) => post._id.toString() === id);

    // if (blog) {
    //   setBlog(blog);
    //   setLoading(false);
    // } else {
    //   navigate("/404");
    // }
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          {blog.map((b) => {
            return (
              <>
                {" "}
                <Image className="blog-details-cover" src={b.cover} fluid />
                <h1 className="blog-details-title">{b.title}</h1>
                <div className="blog-details-container">
                  <div className="blog-details-author">
                    <BlogAuthor {...b.author} />
                  </div>
                  <div className="blog-details-info">
                    <div>{blog.createdAt}</div>
                    <div>{`${b.readTime.value} ${b.readTime.unit} read`}</div>
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
                    __html: b.content,
                  }}
                ></div>
              </>
            );
          })}
          {/* <Image className="blog-details-cover" src={blog.cover} fluid />
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
          ></div> */}
        </Container>
      </div>
    );
  }
};

export default Blog;

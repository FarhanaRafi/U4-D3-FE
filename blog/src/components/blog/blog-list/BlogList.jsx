import React from "react";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchBlog = async () => {
    let res = await fetch("http://localhost:3001/blogPosts/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      let data = await res.json();
      console.log(data);
      setPosts(data);
      console.log(data);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <Row>
      {posts.map((post) => (
        <Col
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;

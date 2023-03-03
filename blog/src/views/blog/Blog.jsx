import React, { useEffect, useState } from "react";
import {
  Container,
  Image,
  Form,
  Button,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import { format, parseISO } from "date-fns";
import "./styles.css";
const Blog = (props) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState("");
  const [comments, setComments] = useState([]);
  const [commentToPost, setCommentToPost] = useState("");
  const [author, setAuthor] = useState("");
  const params = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
  };

  const handleImageUpload = async (id) => {
    try {
      const formData = new FormData();
      formData.append("cover", file);
      let response = await fetch(
        `http://localhost:3002/blogPosts/${id}/uploadCover`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        console.log("Yey!");
      } else {
        console.log("Try again!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlog = async (id) => {
    let res = await fetch("http://localhost:3002/blogPosts/" + id);
    if (res.ok) {
      let data = await res.json();
      setBlog(data);
    }
  };

  const getBlogComments = async (id) => {
    try {
      let response = await fetch(
        `http://localhost:3002/blogPosts/${id}/comments`
      );
      if (response.ok) {
        let allComments = await response.json();
        setComments(allComments);
        console.log(allComments);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (id) => {
    try {
      let response = await fetch(
        `http://localhost:3002/blogPosts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: commentToPost,
            author: author,
          }),
        }
      );
      if (response.ok) {
        console.log("OK");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (postId, commentId) => {
    try {
      await fetch(
        `http://localhost:3002/blogPosts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const { id } = params;
    fetchBlog(id);
    getBlogComments(id);
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
              <Form.Group className="d-flex">
                <Form.Control
                  type="file"
                  label="Example file input"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      setFile(files[0]);
                    } else {
                      setFile(null);
                    }
                  }}
                />
                <Button
                  variant="success"
                  style={{ marginLeft: "5px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (file) {
                      handleImageUpload(blog._id);
                    }
                  }}
                >
                  Update
                </Button>
              </Form.Group>
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
              {comments && (
                <ListGroup>
                  {comments.map((comment) => {
                    return (
                      <ListGroup.Item key={comment._id}>
                        <div className="d-flex">
                          <div
                            className="d-flex flex-column"
                            style={{ marginRight: "auto" }}
                          >
                            <div>{comment.comment}</div>
                            <div style={{ fontSize: "14px" }}>
                              - {comment.author}
                            </div>
                          </div>
                          <div className="d-flex">
                            <Button
                              className="mt-2"
                              style={{ marginRight: "5px" }}
                              variant="outline-primary"
                              onClick={() => {
                                handleShow(comment._id);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              className="mt-2"
                              variant="danger"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(blog._id, comment._id);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
              <Form.Group controlId="blog-form" className="mt-3">
                <Form.Control
                  className="mt-2"
                  size="lg"
                  placeholder="Add a comment"
                  value={commentToPost}
                  onChange={(e) => setCommentToPost(e.target.value)}
                />
                <Form.Control
                  className="mt-2"
                  size="lg"
                  placeholder="Your name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <Button
                  className="mt-2"
                  variant="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(blog._id);
                  }}
                >
                  Submit
                </Button>
              </Form.Group>
            </Container>
          </div>
        )}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control as="textarea" rows={5} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
};

export default Blog;

import React from "react";
import { Button, Container, Form, FormControl, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./styles.css";
const NavBar = (props) => {
  const [query, setQuery] = useState("");

  const fetchBlog = async () => {
    let res = await fetch("http://localhost:3002/blogPosts?title=" + query);
    if (res.ok) {
      let data = await res.json();
      console.log(data);
    }
  };
  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src="logo.svg" />
        </Navbar.Brand>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            fetchBlog();
          }}
        >
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form>
        <Button
          as={Link}
          to="/new"
          className="blog-navbar-add-button bg-dark"
          size="lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
          Post Article
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavBar;

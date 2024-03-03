import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
const Home = () => {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);

  async function fetchListOfBlog() {
    setPending(true);
    const response = await axios.get("http://localhost:5002/api/blogs");
    const result = await response.data;

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    }
    console.log(result);
  }

  useEffect(() => {
    fetchListOfBlog();
  }, []);

  console.log(blogList);
  return (
    <div className={classes.wrapper}>
      <h1>Blog List</h1>
      {pending ? (
        <h1>Loading Blogs !!! Please wait</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList &&
            blogList.map((item) => (
              <div key={item.id}>
                <p>title: {item.title}</p>
                <p>Desc: {item.description}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;

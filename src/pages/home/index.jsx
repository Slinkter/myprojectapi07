import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { blogList, setBlogList, pending, setPending, isEdit, setIsEdit } =
        useContext(GlobalContext);
    const navigate = useNavigate();

    async function fetchListOfBlog() {
        setPending(true);
        const response = await axios.get("http://localhost:5002/api/blogs");
        const result = await response.data;

        if (result && result.blogList && result.blogList.length) {
            setBlogList(result.blogList);
            setPending(false);
        } else {
            setPending(false);
            setBlogList([]);
        }
        console.log(result);
    }

    async function handleDeleteBlog(getcurrentID) {
        console.log(getcurrentID);
        const response = await axios.delete(
            `http://localhost:5002/api/blogs/delete/${getcurrentID}`
        );
        const result = await response.data;
        console.log(result);
        if (result?.message) {
            fetchListOfBlog();
            /*  navigate(0); */
        }
    }
    async function handleEditeBlog(getcurrentItem) {
        navigate("/add-blog/", { state: { getcurrentItem } });
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
                    {blogList && blogList.length ? (
                        blogList.map((item) => (
                            <div key={item._id}>
                                <p>title: {item.title}</p>
                                <p>Desc: {item.description}</p>
                                <FaEdit
                                    size={30}
                                    onClick={() => handleEditeBlog(item)}
                                />
                                <FaTrash
                                    size={30}
                                    onClick={() => handleDeleteBlog(item._id)}
                                />
                            </div>
                        ))
                    ) : (
                        <h3> No Blog Added</h3>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;

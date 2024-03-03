import React, { useContext } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNewBlog = () => {
  const { formData, setFormData } = useContext(GlobalContext);
  const navigate = useNavigate();

  async function handleSaveBlogToDataBase() {
    const res = await axios.post("http://localhost:5002/api/blogs/add", {
      title: formData.title,
      description: formData.description,
    });
    const rpta = await res.data;
    console.log(rpta);
    if (rpta) {
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  }

  console.log(formData);
  return (
    <div className={classes.wrapper}>
      <h1>Add A New Blog</h1>
      <div className={classes.formWrapper}>
        <input
          type="text"
          name="title"
          placeholder="enter blog title"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          name="description"
          placeholder="enter blog description"
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <button onClick={handleSaveBlogToDataBase}>Add New Blog</button>
      </div>
    </div>
  );
};

export default AddNewBlog;

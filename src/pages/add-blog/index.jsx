import React, { useContext, useEffect } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddNewBlog = () => {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSaveBlogToDataBase() {
    const res = isEdit
      ? await axios.put(
          `http://localhost:5002/api/blogs/update/${location.state.getcurrentItem._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post("http://localhost:5002/api/blogs/add", {
          title: formData.title,
          description: formData.description,
        });
    const rpta = await res.data;
    console.log(rpta);
    if (rpta) {
      setIsEdit(false);
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  }

  useEffect(() => {
    if (location.state) {
      const { getcurrentItem } = location.state;
      setIsEdit(true);
      setFormData({
        title: getcurrentItem.title,
        description: getcurrentItem.description,
      });
    }
  }, []);
  console.log(formData);
  return (
    <div className={classes.wrapper}>
      <h1>{isEdit ? "Edit a blog " : "Add A New Blog"}</h1>
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
        <button onClick={handleSaveBlogToDataBase}>
          {isEdit ? "edit a blog " : "  Add  Blog"}
        </button>
      </div>
    </div>
  );
};

export default AddNewBlog;

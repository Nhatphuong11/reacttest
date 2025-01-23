import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  addPost,
  deletePost,
  editPost,
} from "../../../redux/postSlice";
import { Button, Modal, Input, Pagination, Select } from "antd";
import "./ListPost.css";

function ListPosts() {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    name: "",
    image: "",
    content: "",
    categoryid: "",
  });
  const [editingPost, setEditingPost] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (status === "loading") return <p>Loading posts...</p>;
  if (status === "failed") return <p>Error: {error}</p>;


  const filteredPosts = posts.filter((post) =>
    (post.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePost(id));
      dispatch(fetchPosts());
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleAddPost = async () => {
    const { name, image, content, categoryid } = newPost;
    if (!name || !image || !content || !categoryid) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await dispatch(addPost(newPost)); 
      setNewPost({ name: "", image: "", content: "", categoryid: "" });
      dispatch(fetchPosts());
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  const handleEditPost = async () => {
    const { name, image, content, categoryid } = editingPost;
    if (!name || !image || !content || !categoryid) {
      alert("Please fill in all fields");
      return;
    }
    const updatedPost = { name, image, content, categoryid };
    try {
      await dispatch(editPost({ id: editingPost.id, updatedPost }));
      setIsEditModalOpen(false);
      setEditingPost(null);
      dispatch(fetchPosts());
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const openEditModal = (post) => {
    setEditingPost({ ...post });
    setIsEditModalOpen(true);
  };

  return (
    <div className="list-post-container">
      <h2 className="list-post-title">Post List</h2>
      <div className="search-bar">
        <Input
          placeholder="Search by post name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="add-post-btn">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Post
        </Button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Content</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.name}</td>
                <td>
                  <img
                    src={post.image || "https://via.placeholder.com/50"}
                    alt="Post"
                    width="50"
                  />
                </td>
                <td className="content-column">{post.content}</td>
                <td>
                  {post.categoryName}
                </td>
                <td>
                  <Button
                    onClick={() => openEditModal(post)}
                    style={{ marginRight: 10 }}
                  >
                    Edit
                  </Button>
                  <Button danger onClick={() => handleDelete(post.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        current={currentPage}
        pageSize={postsPerPage}
        total={filteredPosts.length}
        onChange={(page) => setCurrentPage(page)}
        className="pagination"
      />
      <Modal
        title="Add New Post"
        visible={isModalOpen}
        onOk={handleAddPost}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          placeholder="Post Name"
          value={newPost.name}
          onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Post Image URL"
          value={newPost.image}
          onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
          style={{ marginBottom: "10px" }}
        />
         <Select
           placeholder="Select Product Category"
           value={newPost.categoryid}
           onChange={(e) => setNewPost({ ...newPost, categoryid: e })}
           style={{ marginBottom: "10px", width: "100%" }}
         >
           {categories.map((category) => (
             <Select.Option
               key={category.categoryid}
               value={category.categoryid}
             >
               {category.categoryName}
             </Select.Option>
           ))}
         </Select>

        <Input.TextArea
          placeholder="Post Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          style={{ marginBottom: "10px" }}
        />
      </Modal>
      <Modal
        title="Edit Post"
        visible={isEditModalOpen}
        onOk={handleEditPost}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <Input
          placeholder="Post Name"
          value={editingPost?.name}
          onChange={(e) =>
            setEditingPost({ ...editingPost, name: e.target.value })
          }
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Post Image URL"
          value={editingPost?.image}
          onChange={(e) =>
            setEditingPost({ ...editingPost, image: e.target.value })
          }
          style={{ marginBottom: "10px" }}
        />
        <Select
          placeholder="Select Product Category"
          value={editingPost?.categoryid || undefined}
          onChange={(value) =>
            setEditingPost({ ...editingPost, categoryid: value })
          }
          style={{ marginBottom: "10px", width: "100%" }}
        >
          {categories.map((category) => (
            <Select.Option
              key={category.categoryid}
              value={category.categoryid}
            >
              {category.categoryName}
            </Select.Option>
          ))}
        </Select>

        <Input.TextArea
          placeholder="Post Content"
          value={editingPost?.content}
          onChange={(e) =>
            setEditingPost({ ...editingPost, content: e.target.value })
          }
          style={{ marginBottom: "10px" }}
        />
      </Modal>
    </div>
  );
}

export default ListPosts;

import { createNewBlog, deleteBlogById, getAllBlogs, getBlogById, updateBlogById } from "../models/blogs.js";

export const createBlog = async(req, res) => {
  const { author_id, title, body } = req.body;

  try {
    const [results] = await createNewBlog(author_id, title, body)

    res.status(200).json({"Success": `Blog created with the ID: ${results.insertId}`})
  } catch (error) {
    res.status(500).json({"Failure": "Failed to create blog."});
    console.log(error)
  }
};

export const getBlogs = async(req, res) => {
  const [blogs] = await getAllBlogs();
  if(!blogs) return res.status(204).json({"Message": "No blogs found"});
  res.json(blogs)
}

export const getBlog = async(req, res) => {
  if(!req?.params?.id) return res.status(400).json({"Message": "Blog ID required"});
  const { id } = req.params

  const [foundBlog] = await getBlogById(id).then(blogs => blogs[0]);
  
  if(!foundBlog) return res.status(204).json({"Message": `Blog with the ID: ${id} not found.`});
  res.json(foundBlog)
}

export const updateBlog = async(req, res) => {
  if(!req?.params?.id) return res.status(400).json({"Message": "Blog ID required"});
  const { id } = req.params
  
  const { title, body } = req.body;
  
  try {
    const [results] = await updateBlogById(id, title, body);
    if(results.affectedRows > 0) return res.json({"Message": `Blog ID: ${id} has been updated.`})
  } catch (error) {
    console.log(error.message);
  }
}

export const deleteBlog = async(req, res) => {
  if(!req?.body?.id) return res.status(400).json({"Message": "Blog ID required"});
  const { id } = req.body;

  try {
    const [results] = await deleteBlogById(id);
    if(results.affectedRows > 0) return res.json({"Message": `Blog ID: ${id} has been deleted.`})
  } catch (error) {
    console.log(error.message)
  }
}
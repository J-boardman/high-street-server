import validator from "validator";
import { createNewComment, deleteCommentById, getAllComments, updateCommentById } from "../models/comments.js"

export const createComment = async(req, res) => {
  const { blog_id, author_id, body } = req.body;

  try {
    const [results] = await createNewComment(
      blog_id,
      author_id,
      validator.escape(body)
    )

    res.status(200).json({"Success": `Comment created with the ID: ${results.insertId}`})
  } catch (error) {
    res.status(500).json({"Failure": "Failed to create comment."});
    console.log(error)
  }
};

export const getComments = async(req, res) => {
  if(!req?.params?.id) return res.status(400).json({"Message": "Comment ID required"});
  const { id } = req.params

  const [comments] = await getAllComments(id);
  if(!comments) return res.status(204).json({"Message": "No comments found"});
  res.json(comments)
}

export const updateComment = async(req, res) => {
  if(!req?.params?.id) return res.status(400).json({"Message": "Comment ID required"});
  const { id } = req.params
  
  try {
    const [results] = await updateCommentById(id, req.body.body);

    if(results.affectedRows > 0) return res.json({"Message": `Comment ID: ${id} has been updated.`})
  } catch (error) {
    console.log(error.message);
  }
}

export const deleteComment = async(req, res) => {
  if(!req?.body?.id) return res.status(400).json({"Message": "Comment ID required"});
  const { id } = req.body;

  try {
    const [results] = await deleteCommentById(id);
    if(results.affectedRows > 0) return res.json({"Message": `Comment ID: ${id} has been deleted.`})
  } catch (error) {
    console.log(error.message)
  }
}
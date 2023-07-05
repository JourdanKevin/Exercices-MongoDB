const {
  create,
  comments,
  applaud,
  showArticle,
  getArticles,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");
const Article = require("../models/articleModel");

const router = require("express").Router();


router.get("/",getArticles)
router.put("/:id", updateArticle)
router.delete("/:id", deleteArticle)
router.get("/create", (req, res) => {
  res.render("create");
});
router.get('/:id/show', showArticle)
router.post("/create", create);
router.get("/:id/comments", async (req, res) => {
  try {
    const id = req.params.id;
  const article = await Article.findById({_id:id});
  res.render("comments", { article });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
  
});
router.post("/:id/comments", comments);
router.post("/:id/applaud", applaud);

module.exports = router;

const Article = require("../models/articleModel");

const create = async (req, res) => {
  const { title, content } = req.body;
  try {
    const article = await Article({ title, content });
    article.save().then((saveArticle) => {
      res.status(201).json(saveArticle);
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erreur lors de la sauvegarde de l'article` });
  }
};

const getArticles = async (req,res)=>{
  try {
    await Article.find()
      .then((articles)=>{
        res.json(articles)
      })
  } catch (error){
    res.status(500).json({error: `Erreur lors de la récupération des articles`})
  }
}

const deleteArticle = async (req,res)=>{
  try {
    await Article.findById(req.params.id)
      .then((article)=>{
        if (!article){
          return res.status(404).json({error: "Article introuvable"})
        }
        article.deleteOne()
          .then((article)=>{
            res.status(201).json({msg : "Article delete", article: article})
          })
      })
    
  } catch (error){
    res.status(500).json({error: `Erreur lors de la suppression de l'article`})
  }
}

const updateArticle = async (req,res)=>{
  try {
    await Article.findById(req.params.id)
      .then((article)=>{
        if (!article){
          return res.status(404).json({error: "Article introuvable"})
        }
        article.updateOne(req.body)
          .then((article)=>{
            res.status(201).json({msg : "Article update", article: article})
          })
      })
    
  } catch (error){
    res.status(500).json({error: `Erreur lors de la mise à jour de l'article`})
  }
}

const showArticle = async (req, res) => {
  const { id } = req.params.id;
  try {
    const article = await Article.findOne(id);
    res.status(200).render("show", { article: article });
  } catch (error) {
    res.json({ message: "Article non trouvé" });
  }
};
const comments = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, content } = req.body;
    await Article.findById(id)
      .then((article) => {
        if (!article) {
          return res.status(404).json({ error: "Article introuvable" });
        }
        const comment = { author, content };
        article.comments.push(comment);
        return article.save();
      })
      .then((updateArticle) => {
        res.json(updateArticle);
      });
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de l'ajout du commentaire` });
  }
};

const applaud = async (req, res) => {
  try {
    const { id } = req.params;
    await Article.findById(id)
      .then((article) => {
        if (!article) {
          return res.status(404).json({ error: "Article introuvable" });
        }
        article.applauseCount++;
        return article.save();
      })
      .then((updateArticle) => res.json(updateArticle));
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erreur lors de l'ajoout d'applaudissements` });
  }
};
module.exports = { create, comments, applaud, showArticle, getArticles, updateArticle, deleteArticle };

const express = require('express');
const { getPages, getPageBySlug, createPage,
     updatePage, deletePage } = require("../controllers/pageController");

const router = express.Router();

router.get("/pages", getPages);
router.get("/pages/:slug", getPageBySlug);
router.post("/pages", createPage);
router.put("/pages/:id", updatePage);
router.delete("/pages/:id", deletePage);

module.exports = router;


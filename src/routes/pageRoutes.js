const express = require('express');
const { getPages, getPageBySlug, createPage,
     updatePage, deletePage } = require("../controllers/pageController");

const router = express.Router();

  const {
    authenticateBearer,
    requireAdminOrEmployee,
  
  } = require("../middlewares/authMiddleware");

router.get("/pages", getPages);
router.get("/pages/:slug", getPageBySlug);
router.post("/pages",authenticateBearer,requireAdminOrEmployee, createPage);
router.put("/pages/:id", authenticateBearer,requireAdminOrEmployee, updatePage);
router.delete("/pages/:id",authenticateBearer,requireAdminOrEmployee, deletePage);

module.exports = router;


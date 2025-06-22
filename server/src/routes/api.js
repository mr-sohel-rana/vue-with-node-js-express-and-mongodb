 const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/read", controller.read);
router.post("/user", controller.user);
router.get("/userget", controller.userGet);
router.delete("/userDelete/:id",controller.deleteUser)
router.put("/userUpdate/:id",controller.update)

 

module.exports = router;

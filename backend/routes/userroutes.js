const express = require("express"); 
const router = express.Router();
const {createUser,login,logout,getUserDashboard,getAdminDashboard,allusers,updateProfile} = require("../controller/usercontroller");
const usermodel = require("../model/usermodel");



const authMiddleware = require('../middleware/authmiddle')
const authRole = require("../middleware/authrole");

router.post("/register", createUser);
router.post("/login", login);
router.post("/logout", logout);
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await usermodel.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get("/dashboard", authMiddleware, authRole(['member']), getUserDashboard);
router.get("/admin/dashboard", authMiddleware, authRole(['admin']), getAdminDashboard);
router.get("/allusers", authMiddleware, authRole(['admin']), allusers);
router.put("/update", authMiddleware,authRole(['member', 'admin']), updateProfile);

module.exports = router;
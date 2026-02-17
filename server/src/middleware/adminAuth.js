export const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token === process.env.ADMIN_TOKEN) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Unauthorized admin access",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Auth middleware error",
    });
  }
};

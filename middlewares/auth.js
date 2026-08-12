const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Token kerak",
    });
  }

  if (token === "Bearer user1-token") {
    req.user = {
      id: "user1",
    };
  } else if (token === "Bearer user2-token") {
    req.user = {
      id: "user2",
    };
  } else {
    return res.status(401).json({
      message: "Token noto'g'ri",
    });
  }

  next();
};

module.exports = auth;
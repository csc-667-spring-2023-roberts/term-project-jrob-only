const requireAuthentication = (request, response, next) => {
  const { user } = request.session;

  if (user === undefined || user === null) {
    response.redirect("/authentication/login");
  } else {
    next();
  }
};

module.exports = requireAuthentication;

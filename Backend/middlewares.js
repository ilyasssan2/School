const MyError = require("./ErrorModal");
const NoteFound = (req, res, next) => {
 return next(new MyError("Route not found", 404));
};
const CatchErrors = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(err.code || 500);
  res.json({
    message: err.message || "Unknown error",
  });
};

exports.NoteFound = NoteFound;
exports.CatchErrors = CatchErrors;

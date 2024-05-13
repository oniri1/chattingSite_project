export default (req, res) => {
  res.cookie("user", undefined, {
    maxAge: 0,
    httpOnly: true,
    secure: true,
    signed: true,
  });
  res.json({ msg: "logout!" });
  //   res.redirect("/");
};

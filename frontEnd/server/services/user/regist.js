import { User } from "../../models/index.js";

export default async (req, res) => {
  try {
    console.log("req.body@@@@@@@@", req.body);
    if (req.body.pw != req.body["pw-check"]) {
      throw new Error("not match password"); //res.json({ error: err.message });
    }
    const user = await User.create(req.body);
    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ error: err.message });
  }
};

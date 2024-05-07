import { Board, Category, User } from "../../models/index.js";

export default async (req, res) => {
  try {
    const list = await Board.findAll({
      include: [
        {
          model: Category,
          include: [
            {
              model: Category,
              as: "parent",
              attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
            },
            {
              model: Category,
              as: "children",
              attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
            },
          ],
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
        {
          model: User,
          // include: [{ model: Board }],
          attributes: ["id", "email", "nick"],
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });
    res.json(list);
  } catch (err) {
    console.log(err);
    res.send({ err: err.message });
  }
};

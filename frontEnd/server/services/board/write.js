import { Board, Category } from "../../models/index.js";

export default async (req, res) => {
  try {
    if (!req.user) throw new Error("not logged in");

    const category = await Category.findOne({
      where: { id: req.body.categoryId },
    });

    const board = await Board.create(req.body);
    await category.addBoard(board);
    await req.user.addBoard(board); //board 테이블 데이터에 req.user(User.findOne)의 id를 추가한다.

    await res.json(board);
  } catch (err) {
    console.log(err);
    res.send({ error: err.message });
  }
};

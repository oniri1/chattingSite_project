router.post("/reply", async (req, res) => {
  try {
    const data = {};
    data.userName = req.signedCookies;
    if (!data.userName.ghost) data.userName.ghost = null;
    if (!data.userName.user) data.userName.user = null;
    data.content = req.body.content;

    const temp = await mongoGetDataOne({
      _id: new ObjectId(req.body.chatId),
    });

    console.log(temp);

    res.json({ data: temp._id });

    mongoAddRecomment(
      JSON.stringify({
        chatId: temp._id,
        roomId: 1,
        userId: data.userName.user,
        ghostId: data.userName.ghost,
        content: data.content,
        createdAt: Date.now(),
        deletedAt: false,
      })
    );
  } catch (err) {
    console.log(err);
  }
});

const commentList = [
  {
    userName: "hamster",
    createdAt: "1일전",
    content: "대충 1번째 댓글 내용임",
    recomment: [
      {
        userName: "hamster",
        createdAt: "1일전",
        content: "대충 대댓글 내용 1임",
      },
      {
        userName: "hamster",
        createdAt: "1일전",
        content: " 대충 대댓글 내용 2임",
      },
    ],
  },
  {
    userName: "hamster2",
    createdAt: "1일전",
    content: "대충 2번째 댓글 내용임",
  },
  {
    userName: "hamster3",
    createdAt: "1일전",
    content: "대충 3번째 댓글 내용임",
  },
];

let commentsHtml = "";

for (let i = 0; i < commentList.length; i++) {
  let tempHtml = "";
  tempHtml += `<div class="comment">
    <div class="comment-sidebar">
      <form ction="/commentUp" method="post"><button>▲</button></form>
      <div>0</div>
      <form ction="/commentDown" method="post"><button>▼</button></form>
    </div>
    <div class="comment-mainbar">
      <div class="comment-datas">
        <div class="comment-user-img">
          <img src="../../hams/mainHamster.png" alt="">
        </div>
        <div class="comment-user-name">${commentList[i].userName}</div>
        <div class="comment-createdAt">${commentList[i].createdAt}</div>
      </div>
      <div class="comment-content">${commentList[i].content}</div>
      <div class="comment-options">
        <div class="comment-report">신고</div>
        <div class="comment-recomment">
          <img src="../../hams/mainHamster.png" alt="">
          답글 쓰기
        </div>
      </div>
    </div>
  </div>`;

  if (commentList[i].recomment) {
    const tempArr = [...commentList[i].recomment];
    for (let i = 0; i < tempArr.length; i++) {
      tempHtml += `<div class="comment">
        <div class="comment-recommentbar">
          <div class="recomment-img"></div>
        </div>
        <div class="comment-mainbar">
          <div class="comment-datas">
            <div class="comment-user-img">
              <img src="../../hams/mainHamster.png" alt="">
            </div>
            <div class="comment-user-name">${tempArr[i].userName}</div>
            <div class="comment-createdAt">${tempArr[i].createdAt}</div>
          </div>
          <div class="comment-content">${tempArr[i].content}</div>
          <div class="comment-options">
            <div class="comment-report">신고</div>
            <div class="comment-recomment">
              <img src="../../hams/mainHamster.png" alt="">
              답글 쓰기
            </div>
          </div>
        </div>
      </div>`;
    }
  }

  tempHtml = `<div class="comments">${tempHtml}</div>`;

  commentsHtml += tempHtml;
}

const commentListEle = document.getElementsByClassName("comment-list")[0];

commentListEle.innerHTML += commentsHtml;

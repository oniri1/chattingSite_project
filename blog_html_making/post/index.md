색인(검색)


# in mySQL
### 장점
얻을 수 있는 장점
	MySQL에 데이터를 빠르게 찾기 위해, SELECT가 빨라진다.

```sql
SELECT * FROM board WHERE id=1;
```

### 단점
SELECT 이외의 DML이 느려진다.
용량 10% 정도 증가한다.

## index를 설정하면

- 설정에 맞춰서 목록을 생성
|num|name|
|---|---|
|1|김강문|
|2|이정배|
|3|이승배|

### index를 자동으로 해주는 키

UNIQUE
PRIMARY KEY
FOREIGN KEY 풔링키

# mySQL은 B-tree라는 자료구조를 가지고 있다 [[자료구조]]

### CREATE INDEX
```sql
CREATE INDEX
idx_board_title ON
board_test(title ASC); -- ASC 와 대비되는 것이 DESC
--ASC : 오름차순
--DESC : 내림차순
```

### SHOW INDEX
```sql
SHOW INDEX FROM board_test;
```

### DROP INDEX
```sql
DROP INDEX indexname ON tablename
```
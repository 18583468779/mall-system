# mall-system

## service

1. 当一个业务功能需要执行一个 dao 类多个方法才能完成时
2. 当一个业务功能需要执行多个 dao 中的方法才能完成时
3. 当一个业务功能需要对 dao 类取出来的数据进行处理时

## 新建表

```
// 一级分类表
CREATE TABLE `firstctgy` (
  `firstCtgyId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NULL,
  PRIMARY KEY (`firstCtgyId`)
);
```

```
insert into dangdang.firstctgy values(1,'童书'),(2,'电子书'),(3,'女装'),(4,'食品'),(5,'男装'),(6,'数码相机'),(7,'创意文具'),(8,'童装童鞋');


```

**一个表的外键只能关联到一个表的主建**

```
// 二级分类表
 create table `dangdang`.`secondctgy` (`secondctgyid` int not null auto_increment, `secctgyname` varchar(20) not null, `firstctgyId` int not null, primary key (`secondctgyid`), constraint `fk_firstctgyid` foreign key (`firstctgyId`) references `dangdang`.`firstctgy` (`firstCtgyId`) on update cascade);

```

```
 insert into dangdang.secondctgy values(1,'0-2岁',1);
 insert into dangdang.secondctgy values(2,'3-6岁',1);
 insert into dangdang.secondctgy values(3,'7-10岁',1);
 insert into dangdang.secondctgy values(4,'11-14岁',2);
 insert into dangdang.secondctgy values(5,'文艺',2);
 insert into dangdang.secondctgy values(6,'人文社科',2);
 insert into dangdang.secondctgy values(7,'教育',2);

```

```
// 三级分类表
create table `dangdang`.`thirdctgy`(`thirdctgyid` int not null auto_increment, `thirdname` varchar(20) not null, `secctgyid` int null, primary key ( `thirdctgyid`), constraint fk_secctgyid foreign key(`secctgyid`) references secondctgy( `secondctgyid`));
```

```
-- 1-3岁 (secctgyId = 1)
INSERT INTO dangdang.thirdctgy (thirdname, secctgyId) VALUES
('图画故事', 1),
('认知卡片', 1),
('益智游戏书', 1),
('布书', 1),
('儿歌童谣', 1),
('亲子阅读', 1);

-- 4-6岁 (secctgyId = 2)
INSERT INTO dangdang.thirdctgy (thirdname, secctgyId) VALUES
('绘本故事', 2),
('科普百科', 2),
('数学启蒙', 2),
('手工制作', 2),
('拼音学习', 2),
('英语启蒙', 2);

-- 7-9岁 (secctgyId = 3)
INSERT INTO dangdang.thirdctgy (thirdname, secctgyId) VALUES
('儿童文学', 3),
('历史故事', 3),
('科学实验', 3),
('艺术绘画', 3),
('写作指导', 3),
('数学思维', 3);

-- 10-12岁 (secctgyId = 4)
INSERT INTO dangdang.thirdctgy (thirdname, secctgyId) VALUES
('青少年小说', 4),
('世界名著', 4),
('科学探索', 4),
('编程入门', 4),
('心理健康', 4),
('英语进阶', 4);

-- 13-15岁 (secctgyId = 5)
INSERT INTO dangdang.thirdctgy (thirdname, secctgyId) VALUES
('青春文学', 5),
('哲学思考', 5),
('社会学入门', 5),
('高级数学', 5),
('艺术鉴赏', 5),
('编程实践', 5);

-- 16岁以上 (secctgyId = 6)
INSERT INTO dangdang.thirdctgy (thirdname, secctgyId) VALUES
('经典文学', 6),
('专业学术', 6),
('心理学', 6),
('经济学', 6),
('艺术设计', 6),
('编程高级', 6);

INSERT INTO dangdang.thirdctgy (thirdname, secctgyId) VALUES
('经典文学', 7),
('哲学思考', 7),
('历史研究', 7),
('科学探索', 7),
('艺术鉴赏', 7),
('编程实践', 7);
```

```
内连接查询，联表查询
select * from `dangdang`.`secondctgy` sc inner join thirdctgy tc on sc.secondctgyid=tc.secctgyid;

```

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

````
创建图书表
CREATE TABLE `dangdang`.`books` (
    `ISBN` varchar(20) NOT NULL,
    `BOOKNAME` varchar(50) NULL,
    `author` varchar(20) NOT NULL,
    `publishid` int NULL,
    `publishername` varchar(20) NULL,
    `monthsalecount` int NULL,
    `bookpicname` varchar(255) NULL,
    `secondctgyid` INT NULL,
    `thirdctgyid` int NULL,
    `originalprice` double(6,2) NULL,
    `discount` double(6,2) NULL,
    PRIMARY KEY (`ISBN`)
);
```
````

# redis

# c语言开发的内存上的高速缓存数据库

# redis的优点

1. 读写数据远远高于mysql数据库，高性能的key-value数据库
2. redis存储数据安全，支持数据灾难恢复。使用RDB，AOF两种持久化防止断点数据丢失。
   RDB全称：Redis DataBase是redis中默认的持久化方案。当触发持久化条件时，redis默认会生成一个dump.rdb文件，Redis在重启的时候就会通过解析dump.rdb文件进行数据恢复。

   AOF:Append only File采用日志的形式将每个写操作追加到文件中。开启AoF机制后，只要执行更改
   Redis数据的命令时，命令就会被写入到AoF文件中。
3. Redis支持集群或分布式+集群架构。

## 哪些数据需要保存到redis?

1. 第一类数据：访问频繁，对性能要求高的，数据量不是很大的数据。
   比如：保存了用户登录信息【用户名，地址】的sessic。
2. 第二类数据：不轻易改变并且数据量不是很大的数据。
   (1)一级图书分类信息。
   (2)地图的经纬度信息。
   (3)人口普查统计后的辅助信息。
   (4)一段时间不变的秒杀的商品信息。
   (5)QQ共同好友。(6)其他：学生成绩排名，音乐排行榜，月销售量排序，学生编号等。

# redis 数据结构

字符串，hash结构，set结构，zset结构，list结构
一：基础命令。
1.keys:查看当前数据库全部键(keys)信息。
2.set。设置一个key value对数据。如果key已经存在用新值value覆盖原来的值。
3.get key获取指定的key的value
4.setnx首先判断key是否存在，如果存在就不覆盖值。
5.msetnx key1 value1key2 value2.keyn valuen批量创建多个key,多个value。
6.exists key。是否存在某个key的key-value对数据。
7.del key。删除某个key的key-value对数据。
8.save:人工发出的数据库持久化操作。

二：存储Hash数据。【Hash结构的数据】
(1)hset*创建hash结构的对象，但只能保存单个key-value键值对到hash对象中。hset对象名key1 value1
(2)hmset创建hash结构的对象，并可以保存多个key-value键值对到hash对象中。hmset对象名key1 value1key2 value2..keyn valuen。
(3)hgetall取出hash对象名的所有key-value数据。hgetall对象名。

# redis 源码

# 购物车表

```
CREATE TABLE `shopcart` (
  `shopcartid` int NOT NULL AUTO_INCREMENT,
  `bookisbn` varchar(20) NOT NULL,
  `bookname` varchar(50) NOT NULL,
  `bookpicname` varchar(60) NOT NULL,
  `bookprice` int NOT NULL,
  `userid` int NOT NULL,
  `purcharsenum` int NULL DEFAULT 0,
  PRIMARY KEY (`shopcartid`)
);
```

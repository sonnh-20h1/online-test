create table ol_role_account(
    id int primary key not null AUTO_INCREMENT,
    name varchar(100)
);

create table ol_account_google(
    id VARCHAR(100) primary key not null,
    googleId VARCHAR(100),
    accessToken VARCHAR(200),
    email VARCHAR(100),
    name VARCHAR(100),
    imageUrl VARCHAR(200),
    create_on datetime,
    status int
);

CREATE TABLE ol_personal_exams(
	id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(200),
    type INT(6),
    create_time INT(15),
    useDay INT(11),
    outDay INT(11),
    status INT(5) /*1- dùng free, 2- trả phí*/
);

CREATE TABLE ol_code_exams(
	id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    code VARCHAR(200),
    useDay INT(11),
    type INT(5), /*1- dùng free, 2- trả phí*/
    status INT(5) /*2- đã được sử dụnng*/
);

CREATE TABLE ol_code_users(
	id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(200),
    code VARCHAR(200)
);


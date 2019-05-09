
CREATE TABLE users(
    IDUSER int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    LASTNAME VARCHAR(100),
    FIRSTNAME VARCHAR(1000),
    USERNAME VARCHAR(1000),
    EMAIL VARCHAR(100),
    PASS VARCHAR(100)
);

CREATE TABLE user_exam(
    ID_UX INT NOT NULL PRIMARY KEY,
    IDUSER VARCHAR(10),
    IDEXAM VARCHAR(10),
    TIMESTART TIME,
    TIMEEND TIME,
    DATEEXAM DATE,
    CONFIRM CHAR(10),
    SCORE INT
);

CREATE TABLE detail_user_exam(
    ID_DUE INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ID_UX INT,
    ID_QUE INT,
    ID_ANS INT
);
CREATE TABLE subjects(
    SUBID VARCHAR(10) PRIMARY KEY,
    SUBTEXT VARCHAR(1000) 
);

CREATE TABLE exam(
    IDEXAM VARCHAR(10) PRIMARY KEY,
    EXAMTEXT VARCHAR(1000),
    SUBID VARCHAR(10),
    EXTIME INT,
    EXNUM INT,
    RANDOMEXAM INT
);

CREATE TABLE detail_exam(
    ID_DE INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    IDEXAM VARCHAR(10) NOT NULL,
    ID_QUE INT NOT NULL
);
CREATE TABLE random_exam(
    ID_RE INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ID_UX INT NOT NULL,
    IDEXAM VARCHAR(10) NOT NULL,
    ID_QUE INT NOT NULL
);

CREATE TABLE question(
    ID_QUE INT PRIMARY KEY,
    SUBID VARCHAR(10),
    QUE_TEXT VARCHAR(1000)
);

CREATE TABLE answer(
    ID_ANS int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ID_QUE INT,
    ANS_TEXT VARCHAR(1000),
    CORRECT VARCHAR(10)
);

CREATE TABLE feedback_question(
    id VARCHAR(100) PRIMARY KEY,
    user_id int,
    question_id int,
    content text,
    time_feed datetime,
    status int
);

CREATE TABLE ol_admin(
    id varchar(100) PRIMARY KEY,
    username varchar(100),
    password varchar(100),
    hash varchar(100),
    roles varchar(100),
    is_super int,
    update_on datetime,
    status int 
);

ALTER TABLE user_exam AUTO_INCREMENT = 1000;
ALTER TABLE detail_exam AUTO_INCREMENT = 2000;
ALTER TABLE users AUTO_INCREMENT = 500;
ALTER TABLE user_exam AUTO_INCREMENT = 700;
ALTER TABLE answer AUTO_INCREMENT = 1500;
ALTER TABLE detail_user_exam AUTO_INCREMENT = 3000;

ALTER TABLE random_exam ADD CONSTRAINT FK_EQ_REQ FOREIGN KEY(ID_QUE) REFERENCES question(ID_QUE);
ALTER TABLE random_exam ADD CONSTRAINT FK_EQ_RDE FOREIGN KEY(IDEXAM) REFERENCES exam(IDEXAM);
ALTER TABLE random_exam ADD CONSTRAINT FK_EQ_RUX FOREIGN KEY(ID_UX) REFERENCES user_exam(ID_UX);

ALTER TABLE detail_exam ADD CONSTRAINT FK_EQ_O FOREIGN KEY(ID_QUE) REFERENCES question(ID_QUE);
ALTER TABLE detail_exam ADD CONSTRAINT FK_EQ_T FOREIGN KEY(IDEXAM) REFERENCES exam(IDEXAM);

ALTER TABLE exam ADD CONSTRAINT FK_ES FOREIGN KEY(SUBID) REFERENCES subjects(SUBID);
ALTER TABLE detail_user_exam ADD CONSTRAINT FK_DUE_Q FOREIGN KEY(ID_QUE) REFERENCES question(ID_QUE);
ALTER TABLE detail_user_exam ADD CONSTRAINT FK_DUE_UX FOREIGN KEY(ID_UX) REFERENCES user_exam(ID_UX);
ALTER TABLE answer ADD CONSTRAINT FK_QUE FOREIGN KEY(ID_QUE) REFERENCES question(ID_QUE);
ALTER TABLE question ADD CONSTRAINT FK_QUE_SUB FOREIGN KEY(SUBID) REFERENCES subjects(SUBID);


-----------------------------------------------------------------------------------------------------------

CREATE TABLE ans_DeThi(
    id varchar(100) PRIMARY KEY,
    BoDeThi_id varchar(100),
    HocPhan_id varchar(100),
    name TEXT,
    time_end INT,
    num_question INT,
    create_on datetime,
    update_on datetime,
    create_by varchar(100),
    update_by varchar(100),
    status int 
);
CREATE TABLE ans_BoDeThi(
    id varchar(100) PRIMARY KEY,
    name TEXT,
    num_question INT,
    HocPhan_id varchar(100),
    create_on datetime,
    update_on datetime,
    create_by varchar(100),
    update_by varchar(100),
    status int 
);
CREATE TABLE ans_question(
    id varchar(100) PRIMARY KEY,
    BoDeThi_id varchar(100),
    name text,
    status int
);
CREATE TABLE ans_answer(
    id varchar(100) PRIMARY KEY,
    Question_id varchar(100),
    name text,
    correct int
);
ALTER TABLE ans_answer ADD CONSTRAINT fk_answer_question FOREIGN KEY(Question_id) REFERENCES ans_question(id);
ALTER TABLE ans_question ADD CONSTRAINT fk_question_bode FOREIGN KEY(BoDeThi_id) REFERENCES ans_BoDeThi(id);

-------------------------------------------------------------------------------------------------

create database onlinetest
go

use onlinetest
go
CREATE TABLE users(
    IDUSER int NOT NULL PRIMARY KEY ,
    LASTNAME VARCHAR(100),
    FIRSTNAME VARCHAR(1000),
    USERNAME VARCHAR(1000),
    EMAIL VARCHAR(100),
    PASS VARCHAR(100)
);
go
CREATE TABLE user_exam(
    ID_UX INT NOT NULL PRIMARY KEY,
    IDUSER VARCHAR(10),
    IDEXAM VARCHAR(10),
    TIMESTART TIME,
    TIMEEND TIME,
    DATEEXAM DATE,
    CONFIRM CHAR(10),
    SCORE INT
);
go
CREATE TABLE detail_user_exam(
    ID_DUE INT NOT NULL PRIMARY KEY,
    ID_UX INT,
    ID_QUE INT,
    ID_ANS INT
);
go
CREATE TABLE subjects(
    SUBID VARCHAR(10) PRIMARY KEY,
    SUBTEXT VARCHAR(1000) 
);
go
CREATE TABLE exam(
    IDEXAM VARCHAR(10) PRIMARY KEY,
    EXAMTEXT VARCHAR(1000),
    SUBID VARCHAR(10),
    EXTIME INT,
    EXNUM INT,
    RANDOMEXAM INT
);
go
CREATE TABLE detail_exam(
    ID_DE INT NOT NULL PRIMARY KEY,
    IDEXAM VARCHAR(10) NOT NULL,
    ID_QUE INT NOT NULL
);
CREATE TABLE random_exam(
    ID_RE INT NOT NULL PRIMARY KEY,
    ID_UX INT NOT NULL,
    IDEXAM VARCHAR(10) NOT NULL,
    ID_QUE INT NOT NULL
);
go
CREATE TABLE question(
    ID_QUE INT PRIMARY KEY,
    SUBID VARCHAR(10),
    QUE_TEXT VARCHAR(1000)
);
go
CREATE TABLE answer(
    ID_ANS int NOT NULL PRIMARY KEY,
    ID_QUE INT,
    ANS_TEXT VARCHAR(1000),
    CORRECT VARCHAR(10)
);
go
CREATE TABLE feedback_question(
    id VARCHAR(100) PRIMARY KEY,
    user_id int,
    question_id int,
    content text,
    time_feed datetime,
    status int
);

ALTER TABLE random_exam ADD CONSTRAINT FK_EQ_REQ FOREIGN KEY(ID_QUE) REFERENCES question(ID_QUE);
ALTER TABLE random_exam ADD CONSTRAINT FK_EQ_RDE FOREIGN KEY(IDEXAM) REFERENCES exam(IDEXAM);
ALTER TABLE random_exam ADD CONSTRAINT FK_EQ_RUX FOREIGN KEY(ID_UX) REFERENCES user_exam(ID_UX);

ALTER TABLE detail_exam ADD CONSTRAINT FK_EQ_O FOREIGN KEY(ID_QUE) REFERENCES question(ID_QUE);
ALTER TABLE detail_exam ADD CONSTRAINT FK_EQ_T FOREIGN KEY(IDEXAM) REFERENCES exam(IDEXAM);

ALTER TABLE exam ADD CONSTRAINT FK_ES FOREIGN KEY(SUBID) REFERENCES subjects(SUBID);
ALTER TABLE detail_user_exam ADD CONSTRAINT FK_DUE_Q FOREIGN KEY(ID_QUE) REFERENCES question(ID_QUE);
ALTER TABLE detail_user_exam ADD CONSTRAINT FK_DUE_UX FOREIGN KEY(ID_UX) REFERENCES user_exam(ID_UX);
ALTER TABLE answer ADD CONSTRAINT FK_QUE FOREIGN KEY(ID_QUE) REFERENCES question(ID_QUE);
ALTER TABLE question ADD CONSTRAINT FK_QUE_SUB FOREIGN KEY(SUBID) REFERENCES subjects(SUBID);
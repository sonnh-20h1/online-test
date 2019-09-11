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
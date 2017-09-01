INSERT INTO users (username, level, authid, avatar) values ($1, 0, $2 , './asset/img/default-avatar.png'); 
SELECT username, authid, level FROM users WHERE authid = $2;
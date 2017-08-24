INSERT INTO users (username, password, level, authid) values ($1, null, null, $2); 
SELECT username, authid FROM users WHERE authid = $2;
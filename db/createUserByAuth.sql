INSERT INTO users (username, level, authid) values ($1, null, $2); 
SELECT username, authid FROM users WHERE authid = $2;
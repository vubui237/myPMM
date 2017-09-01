INSERT INTO chat_box(message, timeago, user_id) VALUES($1,$2,$3);
SELECT chat_box.id, chat_box.message, chat_box.timeago, users.username, users.avatar FROM chat_box
JOIN users
ON chat_box.user_id = users.authid;
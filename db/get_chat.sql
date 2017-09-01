SELECT chat_box.id, chat_box.message, chat_box.timeago, chat_box.img, users.username, users.avatar FROM chat_box
JOIN users
ON chat_box.user_id = users.authid;
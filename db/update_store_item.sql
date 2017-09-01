UPDATE store SET name = $1, description = $2, image = $3, sizes = $4, prices = $5 WHERE id = $1;
SELECT * FROM store;
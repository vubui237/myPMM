SELECT * from store
JOIN shopping_cart
ON shopping_cart.item_id = store.id
WHERE user_id = $1;
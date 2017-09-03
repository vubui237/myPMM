SELECT * from store
JOIN shopping_cart
ON shopping_cart.item_id = store.id
<<<<<<< HEAD
WHERE user_id = $1;
=======
WHERE user_id = $1;
>>>>>>> a96e53c... Added store front

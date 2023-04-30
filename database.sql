CREATE TABLE items (
	id SERIAL PRIMARY KEY,
	name VARCHAR(80) NOT NULL,
	quantity NUMERIC NOT NULL,
	unit VARCHAR(20) NOT NULL,
	is_bought BOOL NOT NULL DEFAULT FALSE
);

INSERT INTO items
	(name, quantity, unit)
	VALUES
	('Oranges', 3, 'Each'),
	('Milk', 1.75, 'Liters'),
	('Apples', 7, 'Each'),
	('Tofu', 2, 'bricks');

SELECT * FROM items
      ORDER BY id;

DROP TABLE items;

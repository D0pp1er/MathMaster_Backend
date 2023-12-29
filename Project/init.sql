--- Create a table for the database
CREATE TABLE public.products
(
    product_id SERIAL NOT NULL,
    name character varying(50) NOT NULL,
    price real NOT NULL,
    description text NOT NULL,
    PRIMARY KEY (product_id)
);

-- Seed data for products table
INSERT INTO public.products (product_id, name, price, description) VALUES (1,  'Product 1', 9.00, 'Product 1 description.');
INSERT INTO public.products (product_id, name, price, description) VALUES (2,  'Product 2', 7.19, 'Product 2 description.');
INSERT INTO public.products (product_id, name, price, description) VALUES (3, 'Product 3', 9.29, 'Product 3 description.');
INSERT INTO public.products (product_id, name, price, description) VALUES (4,  'Product 4', 6.45, 'Product 4 description.');

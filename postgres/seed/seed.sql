BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) values (
    'Solomon', 'Solomon@gmail.com', 5, '2021-12-21'
);

-- Hashed password = 'a'
INSERT INTO login (hash, email) values (
    '$21$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'Solomon@gmail.com'
)
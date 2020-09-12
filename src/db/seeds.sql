INSERT INTO
    department(dept_name)
VALUES
("accounting"),
    ("sales"),
    ("human resources");


INSERT INTO
    roles(title, salary, dept_id)
VALUES
("accountant", 80000, 1),
    ("sales person", 40000, 2),
    ("hr manager", 60000, 3);


INSERT INTO
    employee(first_name, last_name, role_id, manager_id)
VALUES
("Magumi", "Amatsuka", 1, Null),
    ("Makoto", "Ariga", 3, Null),
    ("Rachel", "Bighead", 2, Null),
    ("Candy", "Caramilla", 1, 1),
    ("Yawara", "Chatora", 3, 2),
    ("Ida", "Davis", 2, 3);
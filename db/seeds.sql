INSERT INTO
    department(dept_name)
VALUES
    ("Educator"),
    ("Student Success")

INSERT INTO
    roles(title, salary, dept_id)
VALUES
    ("Professor", 1000000, 1),
    ("Headmaster", 600000, 2),
    ("Guidance Counselor", 60000, 2),
    ("Teacher", 800000, 1),
    ("Combat Teacher", 60000, 1)

INSERT INTO
    employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Charles", "Xavier", 1, Null),
    ("James", "Howlett", 4, 1),
    ("Scott", "Summers", 3, 1),
    ("Ororo", "Monroe", 2, 1),
    ("Max", "Eisenhardt", 5, null),
    ("Jean", "Grey", 3, 1);
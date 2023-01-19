CREATE TABLE IF NOT EXISTS datatable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    planet_name TEXT, 
    registration_date DATE
);
-- INSERT INTO datatable(planet_name, registration_date) VALUES("TestPlanet1", Date.now());
-- INSERT INTO datatable(planet_name, registration_date) VALUES("TestPlanet2", Date.now());

-- INSERT or IGNORE INTO datatable(id, planet_name, registration_date) VALUES (1, 'TestPlanet1', now());
-- INSERT or IGNORE INTO datatable(id, planet_name, registration_date) VALUES (2, 'TestPlanet2', now());
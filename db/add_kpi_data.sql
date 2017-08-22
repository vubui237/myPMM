INSERT INTO kpi_data(kpi_id, date1, data) VALUES($1,$2,$3);
SELECT * FROM kpi_data WHERE kpi_id = $1;
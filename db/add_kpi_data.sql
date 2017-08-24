INSERT INTO kpi_data(kpi_id, date1, data, corrective_action) VALUES($1,$2,$3, $4);
SELECT * FROM kpi_data WHERE kpi_id = $1;
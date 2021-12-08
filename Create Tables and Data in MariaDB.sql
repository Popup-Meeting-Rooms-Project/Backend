-- Create Tables
CREATE TABLE display_user
(
id bigint auto_increment primary key NOT NULL,
name varchar(50) NOT NULL,
login varchar(50) NOT NULL,
password varchar(50) NOT NULL,
role varchar(15) NOT NULL,
CONSTRAINT CHK_display_user_role CHECK (role IN ('User', 'Admin')),
CONSTRAINT UQ_display_user_login UNIQUE (login)
);


CREATE TABLE room
(
id bigint auto_increment primary key NOT NULL,
room_name varchar(50) NOT NULL,
building varchar(50) NOT NULL,
building_floor int NOT NULL,
max_number_people int NOT NULL
)
auto_increment = 100;

CREATE TABLE sensor
(
id bigint auto_increment primary key NOT NULL,
sensor_id varchar(50) NOT NULL,
room_id bigint NOT NULL,
CONSTRAINT FK_SENSOR_ROOM FOREIGN KEY (room_id) REFERENCES room(id),
CONSTRAINT UQ_sensor_id UNIQUE (sensor_id)
)
auto_increment = 200;

CREATE TABLE sensor_history_tracker
(
id bigint auto_increment primary key NOT NULL,
sensor_json_data JSON,
CHECK (JSON_VALID(sensor_json_data))
);

-- Insert Data
INSERT INTO display_user (name, login, password, role) VALUES
('User1', 'User1@mail', '1234', 'User'),
('User2', 'User2@mail', '1234', 'User'),
('User3', 'User3@mail', '1234', 'User'),
('User4', 'User4@mail', '1234', 'Admin')
;


INSERT INTO room (room_name, building, building_floor, max_number_people) VALUES
('Mercury', 'Helsinki', 1, 4),
('Venus', 'Helsinki', 3, 4),
('Earth', 'Helsinki', 3, 4),
('Mars', 'Helsinki', 2, 2),
('Jupiter', 'Helsinki', 2, 2),
('Saturn', 'Oulu', 3, 2),
('Ganymede', 'Oulu', 3, 2),
('Callisto', 'Oulu', 4, 6),
('Pluto', 'Oulu', 3, 6)
;


INSERT INTO sensor (sensor_id, room_id) VALUES
("F4:G5:11:13", 100),
("S5:H5:22:34", 101),
("H4:J5:33:56", 102),
("U9:K5:44:67", 103),
("B7:L5:55:58", 104),
("X6:Q5:66:92", 105),
("L1:W5:77:76", 106),
("P3:E5:88:45", 107),
("K2:R5:99:57", 108)
;

INSERT INTO sensor_history_tracker (sensor_json_data) VALUES
(JSON_COMPACT('
{
      "id": "F4:G5:11:13",
	  "occupancy": false
}
')),
(JSON_COMPACT('
{
      "id": "F4:G5:11:13",
	  "occupancy": true
}
'));

-- Query to extract Data from Json Doc
SELECT JSON_EXTRACT(sensor_json_data, '$.occupancy') FROM sensor;

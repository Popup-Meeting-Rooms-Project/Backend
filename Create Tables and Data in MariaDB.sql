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
room_number int NOT NULL, 
building varchar(50) NOT NULL, 
building_floor int NOT NULL, 
max_number_people int NOT NULL, 
room_available boolean NOT NULL, 
sensor_id bigint NOT NULL,
CONSTRAINT UQ_room_sensor_id UNIQUE (sensor_id)
);


CREATE TABLE sensor 
(
id bigint auto_increment primary key NOT NULL,
room_id bigint NOT NULL, 
sensor_json_data JSON,
CONSTRAINT FK_SENSOR_ROOM FOREIGN KEY (room_id) REFERENCES room(id),
CHECK (JSON_VALID(sensor_json_data))
);

CREATE TABLE availability_tracker
(
id bigint auto_increment primary key NOT NULL,
room_id bigint NOT NULL,
start_time timestamp NOT NULL,
end_time timestamp NOT NULL,
CONSTRAINT FK_AVAILABILITY_TRACKER_ROOM FOREIGN KEY (room_id) REFERENCES room(id)
);

-- Insert Data
INSERT INTO display_user (name, login, password, role) VALUES
('User1', 'User1@mail', '1234', 'User'),
('User2', 'User2@mail', '1234', 'User'),
('User3', 'User3@mail', '1234', 'User'),
('User4', 'User4@mail', '1234', 'Admin')
;


INSERT INTO room (room_number, building, building_floor, max_number_people, room_available, sensor_id) VALUES
(1, 'Pasila', 1, 4, True, 12345),
(2, 'Pasila', 2, 4, True, 12346),
(1, 'Helsinki', 1, 4, True, 12347)
;

INSERT INTO availability_tracker (room_id, start_time, end_time) VALUES
(1,'2021-07-22 12:12:12', '2021-07-22 12:18:33'),
(2,'2021-07-22 12:12:12', '2021-07-22 12:18:33')
;


INSERT INTO sensor (room_id, sensor_json_data) VALUES
(1, JSON_COMPACT('
{
      "id": "F4:A5:74:89:16:57",
	  "occupancy": false
}
'))
;

-- Query to extract Data from Json Doc
SELECT JSON_EXTRACT(sensor_json_data, '$.occupancy') FROM sensor;

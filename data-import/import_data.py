import os
import pandas
import psycopg2
from dotenv import load_dotenv

load_dotenv()

# Establish database connection
connection_string = os.getenv('DATABASE_URL')
connection = psycopg2.connect(connection_string)
cursor = connection.cursor()

# Create days table
cursor.execute("DROP TABLE IF EXISTS days")
cursor.execute("""
    CREATE TABLE days(
        id SERIAL PRIMARY KEY, 
        day_number SMALLINT)
    """)

# Insert day data
for i in range(1, 16):
    cursor.execute("INSERT INTO days(day_number) VALUES(%s)", (i,))

# Create tasks table
cursor.execute("DROP TABLE IF EXISTS tasks")
cursor.execute("""
    CREATE TABLE tasks(
        id SERIAL PRIMARY KEY,
        day_id INTEGER REFERENCES days(id)
        task TEXT,
        duration SMALLINT
    )
""")

# Read data from CSV and populate tasks table
current_directory = os.path.dirname(os.path.abspath(__file__))
for i in range(1, 2, 1):
    current_file = os.path.join(current_directory, 'data', f'day_{i}.csv')
    data_frame = pandas.read_csv(current_file)
    tasks = data_frame['Tasks']
    durations = data_frame['Duration']
    tasks_durations_zipped = list(zip(tasks, durations))
    for task, duration in tasks_durations_zipped:
        cursor.execute("INSERT INTO tasks(day_id, task, duration) VALUES (%s, %s, %s)",
                       (i, task, duration))

connection.commit()
cursor.close()
connection.close()


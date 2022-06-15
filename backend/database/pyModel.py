from .model import Model
import sqlite3

DB_FILE = 'characters.db'

class model(Model):
    def __init__(self):
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        try:
            cursor.execute("select count(rowid) from characters")
        except sqlite3.OperationalError:
            cursor.execute("create table characters (id text, name text, titleId int, job text, level int, avatar text, portrait text)")
        cursor.close()
    
    def selectProfile(self, name):
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        result = cursor.execute("SELECT * FROM characters WHERE name LIKE ?", ('%' + name + '%',)).fetchall()
        return result 

    def insert(self, id, name, titleId, job, level, portrait):
        params = {'id':id, 'name':name, 'title':titleId, 'job':job, 'level':level, 'portrait':portrait}
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        cursor.execute("insert into characters (id, name, titleId, job, level, portrait) VALUES (:id, :name, :title, :job, :level, :portrait)", params)
        connection.commit()
        cursor.close()
        return True


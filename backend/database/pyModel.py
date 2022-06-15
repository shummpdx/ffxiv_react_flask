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
            cursor.execute("create table characters (id text, name text, titleId int, job text, level int, avatar text, portrait text, searchId int)")
        cursor.close()
    
    def selectResults(self, searchId):
        print("mySearchID: ", searchId)
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        result = cursor.execute("SELECT name, avatar FROM characters WHERE searchId = ?", (searchId,)).fetchall()
        return result

    def selectProfile(self, searchId):
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        result = cursor.execute("SELECT * FROM characters WHERE portrait IS NOT NULL").fetchall()
        print("selectProfile: ", result)
        return result 

    def insert(self, id, name, titleId, job, level, portrait, searchId):
        params = {'id':id, 'name':name, 'title':titleId, 'job':job, 'level':level, 'portrait':portrait, 'searchId':searchId}
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        cursor.execute("insert into characters (id, name, titleId, job, level, portrait, searchId) VALUES (:id, :name, :title, :job, :level, :portrait, :searchId)", params)
        connection.commit()
        cursor.close()
        return True


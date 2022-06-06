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
        #connection = sqlite3.connect(DB_FILE)
        #cursor = connection.cursor()
        #result = cursor.execute("SELECT name, portrait FROM characters WHERE searchID = ?", (searchId,)).fetchall()
        return 'OK'

    def insert(self, id, name, avatar, searchId):
        params = {'id':id, 'name':name, 'avatar':avatar, 'searchId':searchId}
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        cursor.execute("insert into characters (id, name, avatar, searchId) VALUES (:id, :name, :avatar, :searchId)", params)
        connection.commit()
        cursor.close()
        return True

    def insertProfile(self, id, title, job, level, portrait):
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        cursor.execute("UPDATE characters SET titleId = ?, job = ?, level = ?, portrait = ? WHERE id = ?", (title, job, level, portrait, id))
        connection.commit()
        cursor.close()
        return True


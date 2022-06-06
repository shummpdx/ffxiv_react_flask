from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
import json

import sys # is there a better way to do this?
sys.path.append('..')
import database 

app = Flask(__name__)
CORS(app)
model = database.get_model()
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/character", methods=['POST'])
@cross_origin(origin='localhost')
def character():
    data = request.get_json()
    model.insert(data['id'], data['name'], data['avatar'], data['searchId'])
    return 'OK'

@app.route("/getCharacters", methods=['POST'])
@cross_origin(origin='localhost')
def getCharacter():
    data = request.get_json()
    print("searchId: ", data['searchId']);
    entries = [dict(id=row[0], name=row[1], avatar=row[2]) for row in model.selectResults(data['searchId'])]
    #print(entries)
    newEntries = json.dumps(entries)
    #print(newEntries)
    return newEntries
    #return 'OK'
     
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
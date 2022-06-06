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
    try:
        model.insertProfile(data['id'], data['titleId'], data['job'], data['level'], data['portrait'])
    except Exception as e:
        print("error", e)
    try:
        model.insert(data['id'], data['name'], data['avatar'], data['searchId'])
    except Exception as e:
        print(e)
    return 'OK'

@app.route("/getCharacters", methods=['POST'])
@cross_origin(origin='localhost')
def getCharacter():
    data = request.get_json()
    entries = [dict(name=row[0], avatar=row[1]) for row in model.selectResults(data['searchId'])]
    newEntries = json.dumps(entries)
    return newEntries

@app.route("/getProfiles", methods=['POST'])
@cross_origin(origin='localhost')
def getProfile():
    data = request.get_json()
    entries = [dict(name=row[0], avatar=row[1]) for row in model.selectProfile(data['searchId'])]
    #print(entries)
    #newEntries = json.dumps(entries)
    #return newEntries
    return 'OK'
     
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
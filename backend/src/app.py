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

@app.route("/profile", methods=['POST'])
@cross_origin(origin='localhost')
def profile():
    data = request.get_json()
    model.insert(data['id'], data['name'], data['titleId'], data['job'], data['level'], data['portrait'])
    return 'OK'

@app.route("/getProfiles", methods=['POST'])
@cross_origin(origin='localhost')
def getProfile():
    data = request.get_json()
    entries = [dict(name=row[1], portrait=row[6]) for row in model.selectProfile(data['name'])]
    newEntries = json.dumps(entries)
    return newEntries
     
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
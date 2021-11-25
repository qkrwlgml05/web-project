import pandas as pd
from flask import *
from flask_cors import CORS
import psycopg2 as pg2
import pandas as pd
from datetime import timedelta

app = Flask(__name__)
cors = CORS(app, origin='http://127.0.0.1:3000', supports_credentials=True)
conn = pg2.connect(host="localhost", port=5432, dbname="postgres", user="postgres", password="1111")
cur = conn.cursor()

@app.route('/todolist/get', methods=['POST', 'GET'])
def todolist():
    req = request.get_json()
    date = req['date']
    user_id = req['user_id']

    data = pd.read_sql("SELECT * FROM homepage.todolist WHERE user_id = '{0}' and date='{1}'".format(user_id, date), conn)

    unchecked = []
    checked = []
    if len(data) > 0:
        unchecked = list(data[data['check']==False].todo.values)
        checked = list(data[data['check']==True].todo.values)

    return jsonify(date=date, user_id=user_id, unchecked=unchecked, checked=checked)

@app.route('/todolist/add', methods=['POST', 'GET'])
def addlist():
    req = request.get_json()
    date = req['date']
    user_id = req['user_id']
    todo = req['todo']

    cur.execute("INSERT INTO homepage.todolist (user_id, date, todo) VALUES ('{0}','{1}','{2}')".format(user_id, date, todo))
    conn.commit()
    data = pd.read_sql("SELECT * FROM homepage.todolist WHERE user_id = '{0}' and date='{1}'".format(user_id, date), conn)

    unchecked = list(data[data['check']==False].todo.values)
    checked = list(data[data['check']==True].todo.values)

    return jsonify(date=date, user_id=user_id, unchecked=unchecked, checked=checked)

if __name__ == '__main__':
	app.run(port=5000)

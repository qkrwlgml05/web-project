import pandas as pd
from flask import *
from flask_cors import CORS
import psycopg2 as pg2
import pandas as pd
from datetime import date

app = Flask(__name__)
cors = CORS(app, origin='http://127.0.0.1:3000', supports_credentials=True)
conn = pg2.connect(host="localhost", port=5432, dbname="postgres", user="postgres", password="1111")
cur = conn.cursor()

@app.route('/todolist/get', methods=['POST', 'GET'])
def gettodo():
    req = request.get_json()
    date = req['date']
    user_id = req['user_id']

    data = pd.read_sql("SELECT * FROM homepage.todolist WHERE user_id = '{0}' and date='{1}'".format(user_id, date), conn)

    if len(data) > 0:
        unchecked = list(data[data['check']==False].todo.values)
        unchecked_id = [int(i) for i in data[data['check']==False].todo_id.values]
        checked = list(data[data['check']==True].todo.values)
        checked_id = [int(i) for i in data[data['check']==True].todo_id.values]
    else:
        unchecked = []
        unchecked_id = []
        checked = []
        checked_id = []
    return jsonify(date=date, user_id=user_id, unchecked=unchecked, unchecked_id=unchecked_id, checked=checked, checked_id=checked_id)

@app.route('/todolist/add', methods=['POST', 'GET'])
def addtodo():
    req = request.get_json()
    date = req['date']
    user_id = req['user_id']
    todo = req['todo']

    cur.execute("INSERT INTO homepage.todolist (user_id, date, todo) VALUES ('{0}','{1}','{2}')".format(user_id, date, todo))
    conn.commit()
    data = pd.read_sql("SELECT * FROM homepage.todolist WHERE user_id = '{0}' and date='{1}'".format(user_id, date), conn)

    unchecked = list(data[data['check']==False].todo.values)
    unchecked_id = [int(i) for i in data[data['check']==False].todo_id.values]
    checked = list(data[data['check']==True].todo.values)
    checked_id = [int(i) for i in data[data['check']==True].todo_id.values]

    return jsonify(date=date, user_id=user_id, unchecked=unchecked, unchecked_id=unchecked_id, checked=checked, checked_id=checked_id)

@app.route('/todolist/check', methods=['POST', 'GET'])
def checktodo():
    req = request.get_json()
    date = req['date']
    user_id = req['user_id']
    todo_id = req['todo_id']
    checked = req['checked']

    cur.execute("UPDATE homepage.todolist SET \"check\" = not {0} WHERE user_id = '{1}' and date ='{2}' and todo_id = {3}".format(checked, user_id, date, todo_id))
    conn.commit()
    data = pd.read_sql("SELECT * FROM homepage.todolist WHERE user_id = '{0}' and date='{1}'".format(user_id, date), conn)

    unchecked = list(data[data['check']==False].todo.values)
    unchecked_id = [int(i) for i in data[data['check']==False].todo_id.values]
    checked = list(data[data['check']==True].todo.values)
    checked_id = [int(i) for i in data[data['check']==True].todo_id.values]

    return jsonify(date=date, user_id=user_id, unchecked=unchecked, unchecked_id=unchecked_id, checked=checked, checked_id=checked_id)

@app.route('/todolist/delete', methods=['POST', 'GET'])
def deletetodo():
    req = request.get_json()
    user_id = req['user_id']
    todo_id = req['todo_id']
    date = req['date']

    cur.execute("DELETE FROM homepage.todolist WHERE user_id = '{0}' and todo_id = {1}".format(user_id, todo_id))
    conn.commit()
    data = pd.read_sql("SELECT * FROM homepage.todolist WHERE user_id = '{0}' and date='{1}'".format(user_id, date), conn)

    if len(data) > 0:
        unchecked = list(data[data['check']==False].todo.values)
        unchecked_id = [int(i) for i in data[data['check']==False].todo_id.values]
        checked = list(data[data['check']==True].todo.values)
        checked_id = [int(i) for i in data[data['check']==True].todo_id.values]
    else:
        unchecked = []
        unchecked_id = []
        checked = []
        checked_id = []

    return jsonify(date=date, user_id=user_id, unchecked=unchecked, unchecked_id=unchecked_id, checked=checked, checked_id=checked_id)

@app.route('/diary/titles', methods=['POST', 'GET'])
def gettitles():
    req = request.get_json()
    user_id = req['user_id']

    data = pd.read_sql("SELECT * FROM homepage.diary WHERE user_id='{0}'".format(user_id), conn)
    if len(data) > 0:
        date = [str(i) for i in data.date.values]
        title = list(data.title.values)
        post_id = [int(i) for i in data.post_id.values]
    else:
        date = []
        title = []
        post_id = []
    return jsonify(user_id=user_id, date=date, title=title, post_id=post_id)

@app.route('/diary/write', methods=['POST', 'GET'])
def writediary():
    req = request.get_json()
    user_id = req['user_id']
    title = req['title']
    content = req['content']

    cur.execute("INSERT INTO homepage.diary (user_id, date, title) VALUES ('{0}', '{1}', '{2}')".format(user_id, str(date.today()), title))
    data = pd.read_sql("SELECT * FROM homepage.diary WHERE user_id='{0}'".format(user_id), conn)
    post_id = data['post_id'].values.max()
    cur.execute("INSERT INTO homepage.diary_content (user_id, post_id, content) VALUES ('{0}', {1}, '{2}')".format(user_id, post_id, content))
    conn.commit()
    if len(data) > 0:
        dateval = [str(i) for i in data.date.values]
        title = list(data.title.values)
        post_id = [int(i) for i in data.post_id.values]
    else:
        dateval = []
        title = []
        post_id = []
    return jsonify(user_id=user_id, date=dateval, title=title, post_id=post_id)

if __name__ == '__main__':
	app.run(port=5000)

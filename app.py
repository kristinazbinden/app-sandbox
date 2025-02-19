from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM posts').fetchall()
    conn.close()
    return jsonify([dict(post) for post in posts])

@app.route('/api/add', methods=['POST'])
def add_post():
    data = request.json
    conn = get_db_connection()
    conn.execute('INSERT INTO posts (title, content) VALUES (?, ?)',
                 (data['title'], data['content']))
    conn.commit()
    conn.close()
    return jsonify({"message": "Post added successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)

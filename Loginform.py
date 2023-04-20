from flask import Flask, render_template, request, session, redirect, url_for
from flask_pymongo import PyMongo
from flask import flash
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['MONGO_URI'] = 'mongodb://localhost:27017/puzzle_app'
mongo = PyMongo(app)

@app.route('/')
def index():
    return redirect('/login')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = mongo.db.signup.find_one({'email': email})
        if user and check_password_hash(user['password'], password):
            flash('Login successful')
            session['user_email'] = user['email']
            return redirect(url_for('puzzle'))
        else:
            flash('Invalid email/password')
            return render_template('login.html', error='Invalid email or password')

    if request.method == 'GET' and request.args.get('action') == 'signup':
        return redirect(url_for('signup'))

    return render_template('login.html', error=None)


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        gender = request.form['gender']
        
        if password != confirm_password:
            error = 'Passwords do not match'
            return render_template('signup.html', error=error)
        
        user = mongo.db.signup.find_one({'email': email})
        if user:
            error = 'Email already exists'
            return render_template('signup.html', error=error)
        
        hashed_password = generate_password_hash(password)
        mongo.db.signup.insert_one({
            'username': username,
            'email': email,
            'password': hashed_password,
            'gender': gender
        })
        
        flash('Registration successful')
        return redirect('/login')
        
    return render_template('signup.html')
@app.route('/puzzle', methods=['GET', 'POST'])
def puzzle():
    puzzle_data = {
        "clues": [            {"question": "What is the capital of India?", "answer": "New Delhi"},            {"question": "What is the currency of Japan?", "answer": "Yen"},            {"question": "What is the smallest continent by land area?", "answer": "Australia"},            {"question": "What is the highest mountain in Africa?", "answer": "Mount Kilimanjaro"},            {"question": "What is the currency of the United Kingdom?", "answer": "Pound sterling"}        ],
        "current_clue": 0,
        "attempts": 0
    }

    if 'user_email' not in session:
        return redirect(url_for('login'))

    if request.method == 'POST':
        answer = request.form['answer']
        if answer.lower() == puzzle_data['clues'][puzzle_data['current_clue']]['answer'].lower():
            puzzle_data['current_clue'] += 1
            puzzle_data['attempts'] = 0
            if puzzle_data['current_clue'] == len(puzzle_data['clues']):
                return render_template('congratulations.html')
        else:
            puzzle_data['attempts'] += 1
            if puzzle_data['attempts'] >= 3:
                puzzle_data['current_clue'] += 1
                puzzle_data['attempts'] = 0
            if puzzle_data['current_clue'] == len(puzzle_data['clues']):
                return render_template('congratulations.html')
    
    return render_template('puzzle.html', clue=puzzle_data['clues'][puzzle_data['current_clue']]['question'])

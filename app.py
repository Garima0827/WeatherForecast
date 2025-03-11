from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

app.config['SECRET_KEY'] ="mykey"
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            login_user(user)
            flash('Logged in successfully.')
            return jsonify({"status": "success", "message": "Logged in successfully"})
        else:
            flash('Invalid username or password')
            return jsonify({"status": "error", "message": "Invalid username or password"})
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', username=current_user.username)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        # Validate input
        if len(username) < 3 or len(username) > 20:
            return jsonify({"status": "error", "message": "Username must be between 3 and 20 characters"})
        if len(password) < 3:
            return jsonify({"status": "error", "message": "Password must be at least 3 characters long"})
        if password != confirm_password:
            return jsonify({"status": "error", "message": "Passwords do not match"})

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({"status": "error", "message": "Username already exists"})
        
        try:
            new_user = User(username=username)
            new_user.set_password(password)
            db.session.add(new_user)
            db.session.commit()
            
            # Automatically log in the user
            login_user(new_user)
            
            return jsonify({"status": "success", "message": "Registered and logged in successfully"})
        except Exception as e:
            db.session.rollback()
            return jsonify({"status": "error", "message": f"An error occurred: {str(e)}"})

    return render_template('register.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
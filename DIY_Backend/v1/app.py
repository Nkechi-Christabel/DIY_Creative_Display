from flask import Flask
from v1.Models import db
from v1.route.account import user_info

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db' 
app.register_blueprint(user_info)
db.init_app(app)


with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "<h1>This is Home Page</h1>"
from app.extensions import db
from app.utils import generate_password_hash

class Base(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)
import bcrypt

def generate_password_hash(password):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
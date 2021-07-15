from functools import wraps

import bcrypt
from flask import jsonify
import queires
import uuid


def json_response(func):
    """
    Converts the returned dictionary into a JSON response
    :param func:
    :return:
    """
    @wraps(func)
    def decorated_function(*args, **kwargs):
        return jsonify(func(*args, **kwargs))

    return decorated_function


def get_new_user_id():
    user_id = str(uuid.uuid4()).split('-')[4]
    return user_id


def get_user_id(user_name):
    return queires.get_user_id(user_name)['id'] if user_name else user_name


def is_already_registered(json_request):
    return json_request.json.get('username') in [email['user_name'] for email in queires.get_user_names()]


def are_valid_credentials(json_request):
    if is_already_registered(json_request):
        user_password = queires.get_user_pass(json_request.json.get('username'))
        return is_valid_password(json_request.json.get('password'), user_password['password'])


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def is_valid_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)

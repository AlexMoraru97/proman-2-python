from flask import Flask, render_template, url_for, request, session
from util import json_response
import uuid
import bcrypt
import os

import queires

app = Flask(__name__)
app.secret_key = os.urandom(16)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queires.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queires.get_cards_for_board(board_id)


@app.route("/get-statuses")
@json_response
def get_statuses():
    """
    All statuses
    """
    return queires.get_statuses()


@app.route("/add-status", methods=['POST'])
@json_response
def add_status():
    new_status_title = request.json.get("statusTitle")
    idx = queires.add_status(new_status_title)['id']
    return {'id': idx}


@app.route("/edit-board-title/<int:board_id>/<new_title>", methods=["PUT"])
@json_response
def edit_board_title(board_id: int, new_title):
    queires.edit_board_title(board_id, new_title)
    return {"success": True}


@app.route("/edit-card-title/<int:card_id>/<new_title>", methods=["PUT"])
@json_response
def edit_card_title(card_id: int, new_title):
    queires.edit_card_title(card_id, new_title)
    return {"success": True}


@app.route("/edit-card-status/<int:card_id>/<status_id>/<new_status_id>", methods=["PUT"])
@json_response
def edit_card_status(card_id: int, status_id, new_status_id):
    queires.edit_card_status(card_id, status_id, new_status_id)
    return {"success": True}


@app.route("/add-board", methods=['POST'])
@json_response
def add_board():
    new_board_name = request.json.get("boardTitle")
    idx = queires.add_board(new_board_name)['id']
    return {'id': idx, 'title': new_board_name}


@app.route("/add-card", methods=["POST"])
@json_response
def add_card():
    card_order = queires.get_max_card_order_from_board_by_status_id(1, 1).get("max") + 1
    card_title = request.json.get("cardTitle")
    board_id = request.json.get("boardId")
    status_id = request.json.get("statusId")
    return queires.add_card(board_id, status_id, card_title, card_order)


@app.route("/delete-board/<int:board_id>", methods=['DELETE'])
@json_response
def delete_board(board_id):
    queires.delete_board(board_id)
    return queires.delete_board(board_id)


@app.route("/delete-card/<int:card_id>", methods=['DELETE'])
@json_response
def delete_card(card_id):
    queires.delete_card(card_id)
    return {'card_id': card_id}


@app.route("/register", methods=['POST'])
@json_response
def user_registration():
    new_user_id = request.json.get("username")
    new_user_pw = request.json.get("password")
    if is_already_registered(request):
        return {'alreadyRegistered': True}
    queires.add_user(new_user_id, hash_password(new_user_pw))
    return {'success': True}


@app.route("/login", methods=['POST'])
@json_response
def user_login():
    username = request.json.get("username")
    if are_valid_credentials(request):
        session.update({'username': username})
        return {'loginSuccess': True}
    return {'loginSuccess': False}


@app.route("/logout")
@json_response
def user_logout():
    session.pop('username', None)
    return {"success": True}


def get_new_user_id():
    user_id = str(uuid.uuid4()).split('-')[4]
    return user_id


def get_user_id(user_name):
    return queires.get_user_id(user_name)['id'] if user_name else user_name


def is_already_registered(json_request):
    return json_request.json.get('username') in [email['user_name'] for email in queires.get_user_names()]


def are_valid_credentials(json_request):
    if is_already_registered(json_request):
        user_password = queires.get_user_pass(json_request.form['username'])['password']
        return is_valid_password(json_request.form['password'], user_password)


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def is_valid_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()

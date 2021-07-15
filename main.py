from flask import Flask, render_template, url_for, request, session
import util
from util import json_response


import queires

app = Flask(__name__)
app.secret_key = b'\xd1\x963\xbb\xa4\xda>\x82\xf2\xb9\x9a*\x9bz\xed\x1a'


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    username = None
    if session:
        username = session['username']
    return render_template('index.html', username=username)


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


@app.route("/api/get-statuses/<int:board_id>")
@json_response
def get_statuses(board_id):
    """
    All statuses
    """
    return queires.get_statuses_by_board_id(board_id)


@app.route("/api/add-status", methods=['POST'])
@json_response
def add_status():
    new_status_title = request.json.get("statusTitle")
    board_id = request.json.get("boardId")
    idx = queires.add_status(new_status_title)['id']
    queires.add_board_status(board_id, idx)
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
    board_id = queires.add_board(new_board_name)['id']
    for status_id in range(1, 5):
        queires.add_board_status(board_id, status_id)
    return {'id': board_id, 'title': new_board_name}


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


@app.route("/api/register", methods=['POST'])
@json_response
def user_registration():
    username = request.json.get("username")
    user_pass = request.json.get("password")
    if util.is_already_registered(request):
        return {'alreadyRegistered': True}
    queires.add_user(username, util.hash_password(user_pass))
    return {'success': True}


@app.route("/api/login", methods=['POST'])
@json_response
def user_login():
    username = request.json.get("username")
    if util.are_valid_credentials(request):
        session.update({'username': username})
        return {'loginSuccess': True}
    return {'loginSuccess': False}


@app.route("/api/logout")
@json_response
def user_logout():
    session.pop('username', None)
    return {"success": True}


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()

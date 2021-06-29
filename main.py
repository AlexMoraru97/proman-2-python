from flask import Flask, render_template, url_for, request, jsonify
from util import json_response

import queires

app = Flask(__name__)


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


@app.route("/add-board", methods=['POST'])
@json_response
def add_board():
    new_board_name = request.json.get("boardTitle")
    print(new_board_name)
    idx, title = queires.add_board(new_board_name)
    # print(idx)
    # return
    return {'id': idx, 'title': title}


# @app.route("/update-board", methods=["PUT"])
# @json_response
# def update_board():
#     request_content = request.json
#     # data = {"id": }
#     queires.add_board()
#     return request_content


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()

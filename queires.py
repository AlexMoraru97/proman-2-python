import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def add_board(board_title):
    ret = data_manager.execute_select(
        """
        INSERT INTO boards(title)
        VALUES (%(board_title)s)
        RETURNING id
        ;
        """
        , {"board_title": board_title}, fetchall=False)
    return ret


def add_card(board_id, status_id, title, card_order):
    ret = data_manager.execute_select(
        """
        INSERT INTO cards(board_id, status_id, title, card_order)
        VALUES (%(board_id)s, %(status_id)s, %(title)s, %(card_order)s)
        RETURNING *
        ;
        """
        , {"board_id": board_id, "status_id": status_id, "title": title, "card_order": card_order})
    return ret[0]


def get_statuses():
    """
    Gather all statuses
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM statuses
        ;
        """)


def get_statuses_by_board_id(board_id):
    return data_manager.execute_select(
        '''
            SELECT statuses.*
            from statuses
                join board_statuses bs on statuses.id = bs.status_id
                join boards b on b.id = bs.board_id
            where board_id = %(board_id)s
        ''', {'board_id': board_id})


def get_max_card_order_from_board_by_status_id(board_id, status_id):
    max_card_order = data_manager.execute_select(
        """
        SELECT max(card_order) FROM cards
        WHERE board_id = %(board_id)s AND status_id = %(status_id)s
        ;
        """
        , {"board_id": board_id, "status_id": status_id}, False)

    return max_card_order


def edit_board_title(board_id, new_title):
    data_manager.execute(
        """
        UPDATE boards
        SET title = %(new_title)s
        WHERE id = %(board_id)s
        ;
        """
        , {"board_id": board_id, "new_title": new_title})


def edit_card_title(card_id, new_title):
    data_manager.execute(
        """
        UPDATE cards
        SET title = %(new_title)s
        WHERE id = %(card_id)s
        ;
        """
        , {"card_id": card_id, "new_title": new_title})


def add_status(status_title):
    ret = data_manager.execute_select(
        """
        INSERT INTO statuses(title)
        VALUES (%(status_title)s)
        RETURNING id
        ;
        """
        , {"status_title": status_title}, False)
    return ret


def add_board_status(board_id, status_id):
    data_manager.execute(
        '''
            INSERT INTO board_statuses(board_id, status_id)
            VALUES (%(board_id)s, %(status_id)s)
        ''', {'board_id': board_id, 'status_id': status_id})


def delete_board(board_id):
    result = data_manager.execute_select(
        """
            DELETE FROM b
            WHERE board_id=%(board_id)s;
            
            DELETE FROM cards
            WHERE board_id=%(board_id)s;

            DELETE FROM boards
            WHERE id=%(board_id)s
            RETURNING id
        """
        , {"board_id": board_id})
    return result


def delete_card(card_id):
    result = data_manager.execute_select(
        """
            DELETE FROM cards
            WHERE id=%(card_id)s
            RETURNING id
        """
        , {"card_id": card_id})
    return result


def get_user_id(username):
    user_id = data_manager.execute_select(
        """
        SELECT id
        FROM user_account
        WHERE user_name=%(username)s
        """
        , {'username': username})
    return user_id


def get_user_pass(username):
    password = data_manager.execute_select(
        """
        SELECT password
        FROM user_account
        WHERE user_name=%(username)s
        """
        , {'username': username}, fetchall=False)
    return password


def add_user(username, password):
    data_manager.execute(
        """
        INSERT INTO user_account(user_name, password) 
        VALUES (%(username)s, %(password)s)
        """
        , {'username': username, 'password': password})


def get_user_names():
    users = data_manager.execute_select("""
        SELECT user_name
        FROM user_account
        """)
    return users


def edit_card_status(card_id, status_id, new_status_id):
    data_manager.execute(
        """
        UPDATE cards
        SET status_id = %(new_status_id)s
        WHERE id = %(card_id)s
        ;
        """
        , {"card_id": card_id, "status_id": status_id, "new_status_id": new_status_id})

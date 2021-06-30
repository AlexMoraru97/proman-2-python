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
        , {"board_title": board_title})
    return ret[0]


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
        """
    )


def get_max_card_order_from_board_by_status_id(board_id, status_id):
    max_card_order = data_manager.execute_select(
        """
        SELECT max(card_order) FROM cards
        WHERE board_id = %(board_id)s AND status_id = %(status_id)s
        ;
        """
        , {"board_id": board_id, "status_id": status_id}, False)

    return max_card_order

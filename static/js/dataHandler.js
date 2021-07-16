export let dataHandler = {
    getBoards: async function () {
        let response = await apiGet('/get-boards');
        return response
    },
    editBoardTitle: async function (boardId, newTitle) {
        let response = await apiPut(`/edit-board-title/${boardId}/${newTitle}`);
        return response
    },
    getBoard: async function(boardId) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: async function (board_id) {
        let response = await apiGet(`/api/get-statuses/${board_id}`)
        return response
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    addStatus: async function (statusTitle, boardId) {
      let response = await apiPost("/api/add-status", {"statusTitle": statusTitle, "boardId": boardId});
      return response;
    },
    getCardsByBoardId: async function (boardId) {
        let response = await apiGet(`/get-cards/${boardId}`)
        return response
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (boardTitle) {
        let request = await apiPost("/add-board",{"boardTitle": boardTitle});
        if (request) {
            return request;
        }
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        let request = await apiPost("/add-card", {"cardTitle": cardTitle, "boardId": boardId, "statusId": statusId});
        if (request) {
            return request;
        }
        // creates new card, saves it and calls the callback function with its data
    },
    editCardTitle: async function (cardId, newTitle) {
        let response = await apiPut(`/edit-card-title/${cardId}/${newTitle}`);
        return response
    },
    editCardStatus: async function (cardId, statusId, newStatusId) {
        let response = await apiPut(`/edit-card-status/${cardId}/${statusId}/${newStatusId}`);
        return response
    },
    deleteBoard: async function (boardId) {
        let request = await apiDelete(`/delete-board/${boardId}`);
        if (request) {
            return request;
        }
    },
    deleteCard: async function (cardId) {
        let request = await apiDelete(`/delete-card/${cardId}`);
        if (request) {
            return request;
        }
    },

    addUser: async function (username, password) {
        let request = await apiPost("/api/register", {"username": username, "password": password});
        if (request) {
            return request;
        }
    },
    userLogout: async function () {
        let request = await apiGet("/api/logout");
        if (request) {
            return request;
        }
    },
    userLogin: async function (username, password) {
        let request = await apiPost("/api/login", {"username": username, "password": password});
        if (request) {
            return request;
        }
    },
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: 'GET',
    })
    if (response.status === 200) {
        let data = response.json()
        return data
    }
}

async function apiPost(url, payload) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    })
    if (response.ok) {
      let data = await response.json();
      return data;
    }
}

async function apiDelete(url) {
    let response = await fetch(url, {
        method: 'DELETE',
    })
    if (response.status === 200) {
        let data = response.json()
        return data
    }
}

async function apiPut(url) {
    let response = await fetch(url, {
        method: 'PUT',
    })
    if (response.status === 200) {
        let data = response.json()
        return data
    }
}

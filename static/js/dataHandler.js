export let dataHandler = {
    getBoards: async function () {
        let response = await apiGet('/get-boards')
        // console.log(response)
        return response
    },
    getBoard: async function(boardId) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: async function () {
        let response = await apiGet("/get-statuses")
        return response
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
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
        return false;
        // creates new board, saves it and calls the callback function with its data
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
    }
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
  try {

      const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload),
      })
      console.table(response);
      if (response.status === 200) {
          let data = await response.json();
          console.log(data);
          return data;
      }
  } catch (error) {
      console.error(error);
  }
}

async function apiDelete(url) {
}

async function apiPut(url) {
    // let response = await fetch(url, {
    //     method: 'PUT',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(payload),
    // })
    // if (response.status === 200) {
    //     let data = response.json()
    //     return data
    // }
}

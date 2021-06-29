import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";
import { cardsManager } from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        // const statuses = await dataHandler.getStatuses();
        domManager.deleteChildren("#root")
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board)
            // const tableBuilder = htmlFactory(htmlTemplates.table);
            // const table = tableBuilder()
            domManager.addChild("#root", content)
            // domManager.addChild(`#board-body[data-board-id="${board.id}"]`, table)
            // statuses.forEach(status => {domManager.addChild("#table-head-row", `<th>${status.title}</th>`)})
            domManager.addEventListener(`#toggle-board-button[data-board-id="${board.id}"]`, "click", showHideButtonHandler)
        }
    },
    addBoard: async function () {
        domManager.addEventListener('#form-board-title','submit', async function (event) {
            event.preventDefault();
            let input = event.target.boardTitle.value;
            const newBoard = await dataHandler.createNewBoard(input);
            boardsManager.loadBoards();
            event.target.boardTitle.value = '';
        })
    },
}

async function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    // console.log(clickEvent.currentTarget.className);
    console.log(clickEvent.target.dataset.boardId);
    const statuses = await dataHandler.getStatuses();
    domManager.deleteChildren(`.accordion-body[data-board-id="${boardId}"]`);
    const tableBuilder = htmlFactory(htmlTemplates.table);
    const table = tableBuilder()
    domManager.addChild(`#board-body[data-board-id="${boardId}"]`, table)
    statuses.forEach(status => {domManager.addChild("#table-head-row", `<th>${status.title}</th>`)})
    // cardsManager.loadCards(boardId)
}


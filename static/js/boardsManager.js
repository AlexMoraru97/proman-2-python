import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";
import { cardsManager } from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        const statuses = await dataHandler.getStatuses();
        for (let board of boards) {
            const boardContent = htmlFactory(htmlTemplates.board)(board);
            domManager.addChild("#board-container", boardContent);
            domManager.addChild(`#board-body[data-board-id="${board.id}"]`, '<div style="text-align: center;"><button style="margin-top: 40%" type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#cardModal" data-bs-whatever="@mdo">Add card</button></div>')
            statuses.forEach(status => {
                loadBoardColumns(board, status);
            })
            domManager.addEventListener(`#toggle-board-button[data-board-id="${board.id}"]`, "click", showHideButtonHandler);
        }
    },
    addBoard: async function () {
        const statuses = await dataHandler.getStatuses();
        const modalContent = htmlFactory(htmlTemplates.modalBuilder)("form-board-title", "boardTitle", "Board title: ", "boardModal");
        domManager.addChild("#body", modalContent);
        domManager.addEventListener(`#form-board-title`,'submit', async function (event) {
            event.preventDefault();
            let input = event.target.boardTitle.value;
            const newBoard = await dataHandler.createNewBoard(input);
            const boardContent = htmlFactory(htmlTemplates.board)(newBoard);
            domManager.addChild("#board-container", boardContent);
            statuses.forEach(status => {
                loadBoardColumns(newBoard, status);
            })
            domManager.addEventListener(`#toggle-board-button[data-board-id="${newBoard.id}"]`, "click", showHideButtonHandler);
            event.target.boardTitle.value = '';
        })
    },
}

function loadBoardColumns(board, status) {
    const boardColumnContent = htmlFactory(htmlTemplates.boardColumn)(board, status);
    const boardColumnTitleContent = htmlFactory(htmlTemplates.boardColumnTitle)(status);
    domManager.addChild(`#board-body[data-board-id="${board.id}"]`, boardColumnContent)
    domManager.addChild(`.board-column[data-board-id="${board.id}"][data-status-id="${status.id}"]`, boardColumnTitleContent)
}

function showHideButtonHandler(clickEvent) {
    if (!clickEvent.detail || clickEvent.detail === 1) {
        const target = clickEvent.currentTarget;
        target.clicks = (target.clicks || 0) + 1;
        const boardId = clickEvent.target.dataset.boardId
        cardsManager.loadCards(boardId, target.clicks);
        cardsManager.addCard(boardId, target.clicks);
    }
}
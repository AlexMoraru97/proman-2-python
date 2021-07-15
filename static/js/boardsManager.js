import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";
import { cardsManager } from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const statuses = await dataHandler.getStatuses(board.id);
            const boardContent = htmlFactory(htmlTemplates.board)(board);
            const deleteButton = htmlFactory(htmlTemplates.delete);
            domManager.addChild("#board-container", boardContent);
            domManager.addChild(`#toggle-board-button[data-board-id="${board.id}"]`, deleteButton(board.id));
            statuses.forEach(status => {
                loadBoardColumns(board.id, status.id, status.title);
            })
            domManager.addEventListener(`#toggle-board-button[data-board-id="${board.id}"]`, "click", showHideButtonHandler);
            domManager.addEventListener(`#delete-board[data-board-id="${board.id}"]`, "click", deleteBoardButtonHandler);
            editBoardTitle(board);

        }
    },
    addBoard: async function () {
        const modalContent = htmlFactory(htmlTemplates.modalBuilder)("form-board-title", "boardTitle", "Create new board", "Board title: ", "boardModal", "");
        domManager.addChild("#body", modalContent);
        domManager.addEventListener(`#form-board-title`,'submit', async function (event) {
            event.preventDefault();
            let input = event.target.boardTitle.value;
            const newBoard = await dataHandler.createNewBoard(input);
            const boardContent = htmlFactory(htmlTemplates.board)(newBoard);
            const deleteBtn = htmlFactory(htmlTemplates.delete);
            domManager.addChild("#board-container", boardContent);
            domManager.addChild(`#toggle-board-button[data-board-id="${newBoard.id}"]`, deleteBtn(newBoard.id));
            const statuses = await dataHandler.getStatuses();
            statuses.forEach(status => {
                loadBoardColumns(newBoard.id, status.id, status.title);
            })
            domManager.addEventListener(`#toggle-board-button[data-board-id="${newBoard.id}"]`, "click", showHideButtonHandler);
            domManager.addEventListener(`#delete-board[data-board-id="${newBoard.id}"]`, "click", deleteBoardButtonHandler);
            event.target.boardTitle.value = '';
            editBoardTitle(newBoard);
        })
    },
}

async function deleteBoardButtonHandler(clickEvent) {
    let boardId = clickEvent.currentTarget.dataset.boardId;
    await dataHandler.deleteBoard(boardId);
    document.getElementById('section'+boardId).remove()
}

function editBoardTitle(board) {
    const modalContent = htmlFactory(htmlTemplates.modalBuilder)(`form-board-title${board.id}`, "boardTitle", "Edit board title", "Board title: ", `boardModal${board.id}`, `${board.title}`, "");
    domManager.addChild("#body", modalContent);
    domManager.addEventListener(`#form-board-title${board.id}`,'submit', async function (event) {
        event.preventDefault();
        let input = event.target.boardTitle.value;
        const response = await dataHandler.editBoardTitle(board.id, input)
        document.getElementById(`board-title${board.id}`).textContent = input;
    })
}

const allTargets = [];

function loadBoardColumns(boardID, statusID, statusTitle) {
    const boardColumnContent = htmlFactory(htmlTemplates.boardColumn)(boardID, statusID);
    const boardColumnTitleContent = htmlFactory(htmlTemplates.boardColumnTitle)(statusID, statusTitle);
    domManager.addChild(`#board-body[data-board-id="${boardID}"]`, boardColumnContent);
    domManager.addChild(`.board-column[data-board-id="${boardID}"][data-status-id="${statusID}"]`, boardColumnTitleContent);
    const boardColumn = document.querySelector(`.board-column[data-board-id="${boardID}"][data-status-id="${statusID}"]`);
    allTargets.push(boardColumn);
    dragula(allTargets);
}

function showHideButtonHandler(clickEvent) {
    if (!clickEvent.detail || clickEvent.detail === 1) {
        const target = clickEvent.currentTarget;
        target.clicks = (target.clicks || 0) + 1;
        const boardId = clickEvent.target.dataset.boardId
        cardsManager.loadCards(boardId, target.clicks);
        cardsManager.addCard(boardId, target.clicks);
        cardsManager.addStatus(boardId, target.clicks, loadBoardColumns);
    }
}

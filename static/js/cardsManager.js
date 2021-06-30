import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";

export let cardsManager = {
    loadCards: async function (boardId, targetClicks) {
        if (targetClicks === 1) {
            const cards = await dataHandler.getCardsByBoardId(boardId);
            // domManager.addChild(`.board-column[data-board-id="${boardId}"]`, '<button type="button" class="btn btn-dark">Dark</button>')
            for (let card of cards) {
                const cardBuilder = htmlFactory(htmlTemplates.card);
                const content = cardBuilder(card);
                domManager.addChild(`.board-column[data-board-id="${boardId}"][data-status-id="${card.status_id}"]`, content);
                // cardsManager.addCard(boardId, card.status_id);
                // domManager.addEventListener(`.card[data-card-id="${card.id}"]`, "click", deleteButtonHandler)
            }
        }
    },
    addCard: async function (boardId, targetClicks) {
        // const statuses = await dataHandler.getStatuses();
        if (targetClicks === 1) {
            const modalContent = htmlFactory(htmlTemplates.modalBuilder)("form-card-title", "cardTitle", "Card title: ", "cardModal");
            domManager.addChild("#body", modalContent);
            domManager.addEventListener(`#form-card-title`, 'submit', async function (event) {
                event.preventDefault();
                let cardTitle = event.target.cardTitle.value;
                const newCard = await dataHandler.createNewCard(cardTitle, boardId, 1);
                const cardContent = htmlFactory(htmlTemplates.card)(newCard);
                console.log(boardId);
                domManager.addChild(`.board-column[data-board-id="${boardId}"][data-status-id="1"]`, cardContent);
                // domManager.addEventListener(`#toggle-board-button[data-board-id="${newBoard.id}"]`, "click", showHideButtonHandler);
                event.target.cardTitle.value = '';
            })
        }
    },
}

function deleteButtonHandler(clickEvent) {
}


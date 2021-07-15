import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";

export let cardsManager = {
    loadCards: async function (boardId, targetClicks) {
        if (targetClicks === 1) {
            domManager.addChild(`#toggle-board-button[data-board-id="${boardId}"]`, htmlFactory(htmlTemplates.buttonBuilder)(`#cardModal${boardId}`, 'Add new card'));
            domManager.addChild(`#toggle-board-button[data-board-id="${boardId}"]`, htmlFactory(htmlTemplates.buttonBuilder)(`#statusModal${boardId}`, 'Add new status'));
            const cards = await dataHandler.getCardsByBoardId(boardId);
            for (let card of cards) {
                const cardBuilder = htmlFactory(htmlTemplates.card);
                const content = cardBuilder(card);
                domManager.addChild(`.board-column[data-board-id="${boardId}"][data-status-id="${card.status_id}"]`, content);
                domManager.addEventListener(`.card-remove[data-card-id="${card.id}"]`, "click", deleteCardButtonHandler);
                editCardTitle(card);
            }

        }
    },
    addCard: async function (boardId, targetClicks) {
        if (targetClicks === 1) {
            const modalContent = htmlFactory(htmlTemplates.modalBuilder)(`form-card-title${boardId}`, `cardTitle`, "Create new card", "Card title: ", `cardModal${boardId}`, "");

            domManager.addChild("#body", modalContent);`label>ddind>`
            domManager.addEventListener(`#form-card-title${boardId}`, 'submit', async function (event) {
                event.preventDefault();
                let cardTitle = event.target.cardTitle.value;
                const newCard = await dataHandler.createNewCard(cardTitle, boardId, 1);
                const cardContent = htmlFactory(htmlTemplates.card)(newCard);
                domManager.addChild(`.board-column[data-board-id="${boardId}"][data-status-id="1"]`, cardContent);
                domManager.addEventListener(`.card-remove[data-card-id="${newCard.id}"]`, "click", deleteCardButtonHandler)
                event.target.cardTitle.value = '';
                editCardTitle(newCard);
            })
        }
    },
    addStatus: async function (boardId, targetClicks, loadBoardColumns) {
        if (targetClicks === 1) {
            const modalContent = htmlFactory(htmlTemplates.modalBuilder)(`form-status-title${boardId}`, `statusTitle`, "Add status", "Status title: ", `statusModal${boardId}`, "");
            domManager.addChild("#body", modalContent);
            domManager.addEventListener(`#form-status-title${boardId}`, 'submit', async function (event) {
                event.preventDefault();
                let statusTitle = event.target.statusTitle.value;
                const newStatus = await dataHandler.addStatus(statusTitle, boardId);
                await loadBoardColumns(boardId, newStatus.id, statusTitle);
                event.target.statusTitle.value = '';
            })
        }
    },
}

function editCardTitle(card) {
    const modalContent = htmlFactory(htmlTemplates.modalBuilder)(`form-card-title${card.id}`, "cardTitle", "Edit card title", "Card title: ", `cardModal${card.id}`, `${card.title}`, "");
    domManager.addChild("#body", modalContent);
    domManager.addEventListener(`#form-card-title${card.id}`,'submit', async function (event) {
        event.preventDefault();
        let input = event.target.cardTitle.value;
        const response = await dataHandler.editCardTitle(card.id, input)
        document.getElementById(`card-title${card.id}`).textContent = input;
    })
}

function cardTitleTrigger() {
    const cardsTitle = document.querySelectorAll('.proba');
    // console.log(cardsTitle)
    for (let title of cardsTitle) {
        title.addEventListener('click', (event) => {
            console.log(event.currentTarget);
        })
    }
}

async function deleteCardButtonHandler(clickEvent) {
    let cardId = clickEvent.currentTarget.dataset.cardId;
    await dataHandler.deleteCard(cardId);
    document.querySelector(`.card[data-card-id="${cardId}"]`).remove()
}

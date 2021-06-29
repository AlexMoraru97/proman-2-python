import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        // const statuses = await dataHandler.getStatuses();
        // domManager.deleteChildren(`.accordion-body[data-board-id="${boardId}"]`);
        // for (let status of statuses) {
        //     const tableBuilder = htmlFactory(htmlTemplates.table);
        //     const table = tableBuilder()
        //     domManager.addChild(`#board-body[data-board-id="${boardId}"]`, table);
        //     domManager.addChild("#table-head-row", `<th id="${status.title.split(" ")[0]}">`);
        //     domManager.addChild(`#${status.title.split(" ")[0]}`, status.title.toUpperCase());
        // }
        // const statuses = await dataHandler.getStatuses();
        // const tableBuilder = htmlFactory(htmlTemplates.table);
        // const table = tableBuilder();
        // domManager.addChild(`#board-body[data-board-id="${boardId}"]`, table);
        // const cards = await dataHandler.getCardsByBoardId(boardId);
        domManager.deleteChildren(`.accordion-body[data-board-id="${boardId}"]`)
        // for (let status of statuses) {
        //     // const tableBuilder = htmlFactory(htmlTemplates.table);
        //     // const table = tableBuilder();
        // }
        // for (let card of cards) {
        //     const cardBuilder = htmlFactory(htmlTemplates.card);
        //     const content = cardBuilder(card)
        //     // domManager.addChild(`#board-body[data-board-id="${boardId}"]`, table);
        //     domManager.addChild(`#board-body[data-board-id="${boardId}"]`, content)
        //     domManager.addEventListener(`.card[data-card-id="${card.id}"]`, "click", deleteButtonHandler)
        // }
    },
}

function deleteButtonHandler(clickEvent) {
}


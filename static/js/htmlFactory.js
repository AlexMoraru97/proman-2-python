export const htmlTemplates = {
    board: 1,
    card: 2,
    table: 3
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        case htmlTemplates.table:
            return tableBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}

function boardBuilder(board) {
    return `<div style="margin: ${board.id !== 1 ? 'auto' : '3%'} 25% auto 25%" class="board-container">
              <div class="accordion-item">
                <button id="toggle-board-button" class="accordion-button bg-info" type="button" data-bs-toggle="collapse" data-board-id="${board.id}"
                     data-bs-target="#collapse${board.id}" aria-expanded="true" aria-controls="collapse${board.id}">
                  ${board.title}
                </button>
              <div id="collapse${board.id}" class="accordion-collapse collapse">
                <div id="board-body" class="accordion-body" data-board-id="${board.id}">
                </div>
              </div>
              </div>
            </div><br>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}

function tableBuilder() {
    return `<table class="table">
              <thead>
                <tr id="table-head-row" class="table-info"></tr>
              </thead>
              <tbody>
                <tr id="table-body-row"></tr>
              </tbody>
            </table>`;
}
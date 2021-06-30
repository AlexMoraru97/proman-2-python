export const htmlTemplates = {
    board: 1,
    card: 2,
    boardColumn: 3,
    boardColumnTitle: 4,
    modalBuilder: 5
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        case htmlTemplates.boardColumn:
            return boardColumnBuilder
        case htmlTemplates.boardColumnTitle:
            return boardColumnTitleBuilder
        case htmlTemplates.modalBuilder:
            return modalBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}

function boardBuilder(board) {
    return `<section class="board">
              <div class="accordion-item">
                <button id="toggle-board-button" class="accordion-button bg-info" type="button" data-bs-toggle="collapse" data-board-id="${board.id}"
                     data-bs-target="#collapse${board.id}" aria-expanded="true" aria-controls="collapse${board.id}">
                  ${board.title}
                </button>
              <div id="collapse${board.id}" class="accordion-collapse collapse">
                <div id="board-body" class="accordion-body board-columns" data-board-id="${board.id}">
                </div>
              </div>
              </div>
            </section><br>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}

function boardColumnBuilder(board, status) {
    return `<div class="board-column" data-board-id="${board.id}" data-status-id="${status.id}"></div>`;
}

function boardColumnTitleBuilder(status) {
    return `<div class="board-column-title" data-status-id="${status.id}">${status.title}</div>`;
}


function modalBuilder(formId, elementTitle, elementLabel, modalTarget) {
    return `<div class="modal fade" id="${modalTarget}" tabIndex="-1" aria-labelledby="${modalTarget}Label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="${modalTarget}Label">${elementLabel}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="${formId}">
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="${elementTitle}" class="col-form-label">${elementLabel}</label>
                                    <input type="text" class="form-control" id="${elementTitle}" name="${elementTitle}">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>`
}
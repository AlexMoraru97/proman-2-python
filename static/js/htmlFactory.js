export const htmlTemplates = {
    board: 1,
    card: 2,
    boardColumn: 3,
    boardColumnTitle: 4,
    modalBuilder: 5,
    buttonBuilder: 6,
    userModal: 7,
    delete: 8
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
        case htmlTemplates.buttonBuilder:
            return buttonBuilder
        case htmlTemplates.userModal:
            return userInput
        case htmlTemplates.delete:
            return deleteButtonBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}

function boardBuilder(board) {
    return `<section id="section${board.id}" class="board">
              <div class="accordion-item">
                  <button id="toggle-board-button" class="accordion-button" type="button" data-bs-toggle="collapse" data-board-id="${board.id}" data-bs-target="#collapse${board.id}" aria-expanded="true" aria-controls="collapse${board.id}">
                    <h5 id="board-title${board.id}" class="text-warning" data-bs-toggle="modal" data-bs-target="#boardModal${board.id}">${board.title}</h5>
                  </button>
              <div id="collapse${board.id}" class="accordion-collapse collapse">
                <div id="board-body" class="accordion-body board-columns" data-board-id="${board.id}">
            
                </div>
              </div>
              </div>
            </section><br>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}" data-card-status-id="${card.status_id}" data-card-order-id="${card.card_order}">
              <div class="card-remove" data-card-id="${card.id}"><i class="fas fa-trash-alt"></i></div> 
              <h6  id="card-title${card.id}" data-bs-toggle="modal" data-bs-target="#cardModal${card.id}">${card.title}</h6>
            </div>`;
}

function boardColumnBuilder(boardID, statusID) {
    return `<div class="board-column" data-board-id="${boardID}" data-status-id="${statusID}"></div>`;
}

function boardColumnTitleBuilder(statusID, statusTitle) {
    return `<h4 class="board-column-title" data-status="${statusID}">${statusTitle}</h4>`;
}

function modalBuilder(formId, elementTitle, elementLabel, modalTarget, elementTextContent) {
    return `<div class="modal fade" id="${modalTarget}" tabIndex="-1" aria-labelledby="${modalTarget}Label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="${modalTarget}Label">${elementLabel}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="${formId}">
                            <div id="userInputBody" data-user="${formId}" class="modal-body">
                                <div class="mb-3">
                                    <label for="${elementTitle}" class="col-form-label">${elementLabel}</label>
                                    <input type="text" class="form-control" id="${elementTitle}" name="${elementTitle}" value="${elementTextContent}">
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

function buttonBuilder(target, textContent) {
    return `<div>
              <button style="margin-left: 50px" type="button" class="bg-info" data-bs-toggle="modal" data-bs-target="${target}" data-bs-whatever="@mdo">
                ${textContent}
              </button>
            </div>`
}


function userInput(modalTarget, elementLabel) {
    return  `<div class="modal fade" id="${modalTarget}" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                 aria-labelledby="${modalTarget}" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="${modalTarget}Label">${elementLabel}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="${modalTarget}" class="row g-3">
                                <div class="col-auto">
                                    <label for="username" class="col-form-label">${elementLabel}</label>
                                    <input type="text" class="form-control-plaintext" id="username" name="username">
                                </div>
                                <div class="col-auto">
                                    <label for="password" class="visually-hidden">Password</label>
                                    <input type="password" class="form-control" id="password" placeholder="Password" name="password">
                                </div>
                                <div class="col-auto">
                                    <button type="submit" class="btn btn-primary mb-3" data-bs-dismiss="modal">Confirm
                                        identity
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`
}


function deleteButtonBuilder(boardId) {
    return `<button style="margin-left: 50px" type="button" id="delete-board" class="btn btn-warning" data-board-id="${boardId}">
              <i class="fas fa-trash-alt"></i>
            </button>`
}
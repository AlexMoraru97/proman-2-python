export const htmlTemplates = {
    board: 1,
    card: 2,
    boardColumn: 3,
    boardColumnTitle: 4,
    modalBuilder: 5,
    buttonBuilder: 6,
    delete: 7
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
                  <button id="toggle-board-button" class="accordion-button bg-dark" type="button" data-bs-toggle="collapse" data-board-id="${board.id}" data-bs-target="#collapse${board.id}" aria-expanded="true" aria-controls="collapse${board.id}">
                    <h5 id="board-title${board.id}" class="text-light" data-bs-toggle="modal" data-bs-target="#boardModal${board.id}">${board.title}</h5>
                  </button>
              <div id="collapse${board.id}" class="accordion-collapse collapse">
                <div id="board-body" class="accordion-body board-columns bg-dark bg-gradient text-light" data-board-id="${board.id}">
            
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

function modalBuilder(formId, elementTitle, titleLabel, elementLabel, modalTarget, elementTextContent, log=null) {
    return `<div class="modal fade" id="${modalTarget}" tabIndex="-1" aria-labelledby="${modalTarget}Label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-dark">
                            <h5 class="modal-title text-light" id="${modalTarget}Label">${titleLabel}</h5>
                            <button type="button" class="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="bg-dark bg-gradient" style="padding: 20px">
                            <form id="${formId}" class="was-validated">
                                ${!log ? 
                                    `<div id="userInputBody" data-user="${formId}" class="modal-body bg-dark bg-gradient">
                                        <div class="mb-3">
                                            <label for="${elementTitle}" class="col-form-label text-light">${elementLabel}</label>
                                            <input type="text" class="form-control bg-dark text-light" id="${elementTitle}" name="${elementTitle}" value="${elementTextContent}">
                                        </div>
                                    </div>
                                    <div class="modal-footer bg-dark">
                                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-outline-primary" data-bs-dismiss="modal">Save</button>
                                    </div>`:
            
                                    `<div class="input-group ">
                                      <span class="style-mode input-group-text bg-dark text-light">Email address</span>
                                      <input type="email" name="email" class="style-mode form-control is-invalid bg-dark text-light" id="email" placeholder="Email address" required aria-label="Email address">
                                      </div><br>
                                      <div class="input-group">
                                        <span class="style-mode input-group-text bg-dark text-light">Password</span>
                                        <input type="password" name="password" class="style-mode form-control is-invalid bg-dark text-light" id="pass" placeholder="Six or more characters" pattern=".{6,}" title="Six or more characters" required aria-label="Password">
                                      </div><br>
                                      <div class="modal-footer">
                                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                          <button type="submit" class="style-mode btn btn-success" data-bs-dismiss="modal">${elementTitle === 'login' ? 'Login' : 'Register'}</button>
                                      </div>`}                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>`
}

function buttonBuilder(target, textContent) {
    return `<div>
              <button style="margin-left: 50px" type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="${target}" data-bs-whatever="@mdo">
                ${textContent}
              </button>
            </div>`
}


function deleteButtonBuilder(boardId) {
    return `<button style="margin-left: 50px" type="button" id="delete-board" class="btn btn-outline-danger" data-board-id="${boardId}">
              <i class="fas fa-trash-alt"></i>
            </button>`
}
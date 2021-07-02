import { boardsManager } from "./boardsManager.js";
import { usersManager } from "./usersManager.js";

function init() {
  boardsManager.loadBoards();
  boardsManager.addBoard();
  usersManager.signUp();
  usersManager.signIn();
  usersManager.signOut();
  // boardsManager.register();
}

init();

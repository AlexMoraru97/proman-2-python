import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";


export let usersManager = {
    signUp: async function () {
        const modalContent = htmlFactory(htmlTemplates.userModal)("form-registration", "register");
        domManager.addChild("#body", modalContent);
        domManager.addEventListener(`#form-registration`,'submit', async function (event) {
            event.preventDefault();
            let inputUsername = event.currentTarget.username.value;
            let inputPassword = event.currentTarget.password.value;
            await dataHandler.addUser(inputUsername, inputPassword)
            event.target.username.value = '';
            event.target.inputPassword2.value = '';
        })
    },

    signIn: async function () {
        const modalContent = htmlFactory(htmlTemplates.userModal)("form-login", "login");
        domManager.addChild("#body", modalContent);
        domManager.addEventListener(`#form-login`,'submit', async function (event) {
            event.preventDefault();
            let inputUsername = event.currentTarget.username.value;
            console.log(inputUsername);
            let inputPassword = event.currentTarget.password.value;
            await dataHandler.userLogin(inputUsername, inputPassword)
            domManager.addChild(".container-fluid", `<h4>${inputUsername}</h4>`);
            event.target.username.value = '';
            event.target.password.value = '';
        })
    },

    signOut: async function () {
        await dataHandler.userLogout();
    },


}
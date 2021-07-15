import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";

export let usersManager = {
    signUp: async function () {
        const modalContent = htmlFactory(htmlTemplates.modalBuilder)("form-registration", "register", 'Registration', "Please register:", 'registerModal', '', true);
        domManager.addChild("#body", modalContent);
        domManager.addEventListener(`#form-registration`,'submit', async function (event) {
            event.preventDefault();
            const inputUsername = event.target.email.value;
            const inputPassword = event.target.pass.value;
            const response = await dataHandler.addUser(inputUsername, inputPassword)
            if (response.alreadyRegistered) {
                alert('Email already registered, please choose another!')
                return
            }
            event.target.email.value = '';
            event.target.pass.value = '';
            document.getElementById('registration').hidden = true
        })
    },

    signIn: async function () {
        const modalContent = htmlFactory(htmlTemplates.modalBuilder)("form-login", "login", 'Login', "Please login:", 'loginModal', '', true);
        domManager.addChild("#body", modalContent);
        domManager.addEventListener(`#form-login`,'submit', async function (event) {
            event.preventDefault();
            const inputUsername = event.target.email.value;
            const inputPassword = event.target.pass.value;
            const response = await dataHandler.userLogin(inputUsername, inputPassword);
            event.target.email.value = '';
            event.target.pass.value = '';
            if (!response.loginSuccess) {
                alert('Email or password not valid! Please try again')
                return;
            }
            document.getElementById('registration').hidden = true;
            document.getElementById('login').hidden = true;
            document.getElementById('logout').hidden = false;
            const user = document.getElementById('username');
            user.hidden = false;
            user.innerHTML = `logged in as ${inputUsername}`;
        })
    },

    signOut: async function () {
        domManager.addEventListener('#logout', 'click', async (event) => {
            await dataHandler.userLogout();
            document.getElementById('registration').hidden = false;
            document.getElementById('login').hidden = false;
            document.getElementById('username').hidden = true;
            document.getElementById('logout').hidden = true;
        })
    },


}
import * as signalR from "@microsoft/signalr";
import "./css/main.css";

const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
const btnAddToGroup: HTMLButtonElement = document.querySelector("#btnAddToGroup");
const btnRemoveFromGroup: HTMLButtonElement = document.querySelector("#btnRemoveFromGroup");
const username = new Date().getTime();

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

connection.on("messageReceived", (username: string, message: string) => {
    const m = document.createElement("div");

    console.log(username);
    console.log(message);

    m.innerHTML = `<div class="message-author">${username}</div><div>${message}</div>`;

    divMessages.appendChild(m);
    divMessages.scrollTop = divMessages.scrollHeight;
});

connection.on("send", (message: string) => {

    console.log(message);

    const m = document.createElement("div");

    m.innerHTML = `<div class="message-author">empty</div><div>${message}</div>`;

    divMessages.appendChild(m);
    divMessages.scrollTop = divMessages.scrollHeight;
});

connection.start().catch((err) => document.write(err));

tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        send();
    }
});

btnSend.addEventListener("click", send);
btnAddToGroup.addEventListener("click", addToGroup);
btnRemoveFromGroup.addEventListener("click", removeFromGroup);

function send() {
    console.log("send");
    connection.send("newMessage", username, tbMessage.value)
        .then(() => (tbMessage.value = ""));
}

function addToGroup() {
    console.log("addToGroup");

    connection.send("addToGroup", "group1")
        .then(() => (tbMessage.value = ""));
}

function removeFromGroup() {
    console.log("removeToGroup");

    connection.send("removeFromGroup", "group1")
        .then(() => (tbMessage.value = ""));
}
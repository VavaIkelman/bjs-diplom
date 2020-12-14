'use strict'
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => response.success && (location.reload()));
};

ApiConnector.current(response => response.success && (ProfileWidget.showProfile(response.data)));

const rate = new RatesBoard();
function getExchange () { 
ApiConnector.getStocks(response => {
    if (response.success){
        rate.clearTable(),
        rate.fillTable(response.data)
    };
});
}
getExchange();
setInterval(() => (getExchange, 600000));

let money = new MoneyManager();
money.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
           ProfileWidget.showProfile(response.data); 
           money.setMessage(response.success, `Счет пополнен`);
        } else {
            money.setMessage(response.success, response.error);
        };
    });
};
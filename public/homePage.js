'use strict'
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => response.success && (location.reload()));
}

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
}

money.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, `Ковертация выполнена успешно`);
        } else {
            money.setMessage(response.success, response.error);
        }
    });
}
    
money.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, "Перевод выполнен успешно");
        } else {
            money.setMessage(response.success, response.error);
        };
    });
}

const favorite = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success) {
        favorite.clearTable();
        favorite.fillTable(response.data);
        money.updateUsersList(response.data);
    } else {
        favorite.setMessage(response.error);
    }
});

favorite.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favorite.clearTable();
            favorite.fillTable(response.data);
            money.updateUsersList(response.data);
            favorite.setMessage(response.success,`Пользователь успешно добавлен`);
        } else {
            favorite.setMessage(response.success, response.error);
        }
    });
}

favorite.removeUserCallback = id => {
    ApiConnector.removeUserFromFavorites(id, response => {
        if (response.success){
            favorite.clearTable();
            favorite.fillTable(response.data);
            money.updateUsersList(response.data);
            favorite.setMessage(response.success,`Пользователь успешно удален`);
        } else {
            favorite.setMessage(response.success, response.error);
        }
    });
}
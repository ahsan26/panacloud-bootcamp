import { AsyncStorage, Platform } from "react-native";
import { Constants, Notifications, Permissions } from "expo"
import { appTheme } from "./helper";

export function loadInitialData() {
    return getdecks();
}

export const createNewDeck = title => {
    console.log('newDeckk', title)
    return getDeck(title).then(deck => {
        let newDeck = deck ? JSON.parse(deck) : { title, questions: [] };
        console.log('createbew deck api', newDeck)
        return AsyncStorage.setItem(title, JSON.stringify(newDeck))
            .then(_ => {
                return newDeck;
            })
    });
};

export const getDeck = title => {
    return AsyncStorage.getItem(title, (err, result) => {
        return result
    });
};

export const removeDeck = title => {
    return AsyncStorage.removeItem(title).then(err => { err && console.log('err while removing deck') }).then(_ => getdecks());
};

export const checkQuizAttemptedToday = () => {
    let currentDate = new Date();
    currentDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYearI()}`;
    return AsyncStorage.getItem('dateLatestAttempted', (err, date) => {
        return (JSON.parse(date) === currentDate) ? true : false;
    });
}

export const markDateAsQuizAttempted = () => {
    let currentDate = new Date();
    currentDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    AsyncStorage.setItem('dateLatestAttempted', JSON.stringify(currentDate));
}

export const getdecks = () => {
    let completeDecks = {};
    return AsyncStorage.getAllKeys().then(keys => {
        return AsyncStorage.multiGet(keys.filter(key=>key!=='dateLatestAttempted'))
            .then(allDecks => {
                allDecks.map((deck, i, decks) => {
                    let key = decks[i][0];
                    let value = decks[i][1] ? JSON.parse(decks[i][1]) : {};
                    completeDecks = {
                        ...completeDecks,
                        [key]: value
                    };
                });
                return completeDecks;
            })
    });
};

export const addCardToDeck = (title, card) => {
    return getDeck(title).then(deck => {
        const deckOBJ = JSON.parse(deck);
        deckOBJ.questions.push(card);
        return AsyncStorage.mergeItem(title, JSON.stringify(deckOBJ)).then(err => {
            return deckOBJ;
        });
    });
};

export const initiateLocalNotification = () => {
    Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(status => {
            if (Constants.isDevice && status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
                    .then(_ => {
                        const handleNotification = ({ notificationId }) => {
                            this.checkQuizAttemptedToday().then(result => {
                                result && Notifications.dismissNotificationAsync(notificationId)
                            })
                        }

                        Notifications.addListener(handleNotification);

                        if (Platform.OS === 'android') {
                            Notifications.createChannelAndroidAsync('quiz-reminder', {
                                name: 'Quiz Reminder',
                                sound: true,
                                vibrate: true,
                                priority: 'max'
                            })
                        }

                        const currentDate = new Date();
                        const { themeBgColor } = appTheme;

                        const localNotification = {
                            title: "Reminder For Quiz",
                            body: `Hey!, Is everything fine today? You haven't attemeted any quiz today!! Today is ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
                            ios: {
                                sound: true
                            },
                            android: {
                                channelId: 'quiz-reminder',
                                color: themeBgColor
                            }
                        };

                        let notificationTime = new Date()
                        let currTime = notificationTime.getTime()
                        notificationTime.setHours(18, 0, 0)
                        scheduleTime = notificationTime.getTime()
                        if (currTime > scheduleTime) {
                            //if current time is > 6pm then it will schedule next notification for next day 6pm
                            scheduleTime = scheduleTime + 86400000
                        }

                        const schedulingOptions = {
                            time: scheduleTime,
                            repeat: 'day'
                        }


                        Notifications.scheduleLocalNotificationAsync(
                            localNotification, schedulingOptions
                        );

                    })
            }
        })
}




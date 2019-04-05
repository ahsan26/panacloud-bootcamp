import { AsyncStorage } from "react-native";

export function loadInitialData() {
    return getdecks();
}

export const createNewDeck = title => {
    return getDeck(title).then(deck => {
        let newDeck = deck ? JSON.parse(deck) : { title, questions: [] };
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

export const getdecks = () => {
    let completeDecks = {};
    return AsyncStorage.getAllKeys().then(keys => {
        return AsyncStorage.multiGet(keys)
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
            console.log('new card added', err);
            return deckOBJ;
        });
    });
};
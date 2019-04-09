export const isNoDeck = decks => decks.length === 0 ? true : false;

export const appTheme = {
    themeBgColor: 'black',
    lineColor: '#f39c12',
    tabIconColor: '#f39c12',
    decksColors: [
        ['#f64f59', '#c471ed', '#12c2e9'],
        ['#2C5364', '#203A43', '#0F2027'],
        ['#4286f4', '#373B44'],
        ['#3b8d99', '#6b6b83', '#aa4b6b'],
        ['#dd1818', '#333333'],
        ['#fdeff9', '#ec38bc', '#7303c0', '#03001e'],
    ]
};

export const randomColorGroup = ()=>{
    return appTheme.decksColors[(Math.floor(Math.random()*appTheme.decksColors.length))]
}
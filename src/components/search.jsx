import React from "react";
import '../App.css';
import { withRouter } from "react-router-dom"
import { search, getAll, update } from "../BooksAPI";
import { connect } from "react-redux";
import { changeCurrentlyReading, changeRead, changeWantTORead } from "../Store/Actions/bookShelf";

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            searchResults: [],
            booksInShelf: {}
        };
        this.searchBook = this.searchBook.bind(this);

    }
    async componentDidMount() {
        if (!this.props.booksShelf.read.length || !this.props.booksShelf.currentlyReading.length || !this.props.booksShelf.wantToRead.length) {
            this.getBooksInTheShelf().then(booksInShelf=>{
                this.setState({
                    booksInShelf
                })
            });
        };
    }
    getBooksInTheShelf() {
        return getAll().then(data => {
            const wantToRead = [],
                read = [],
                currentlyReading = [];
            data.forEach(book => {
                switch (book.shelf) {
                    case "wantToRead":
                        wantToRead.push(book);
                        break;
                    case "read":
                        read.push(book);
                        break;
                    case "currentlyReading":
                        currentlyReading.push(book);
                        break;
                }
            });
            return { getWantToRead: _ => wantToRead, getRead: _ => read, getCurrentlyReading: _ => currentlyReading };
        });
    }
    checkSearchBookExistsInTheShelf(searchBook) {
        const currentlyReadingBookFound = (this.props.booksShelf.currentlyReading.length ? this.props.booksShelf.currentlyReading : this.state.booksInShelf.getCurrentlyReading() ? this.state.booksInShelf.getCurrentlyReading() : []).find(book => book.id === searchBook.id);
        if (currentlyReadingBookFound) return (currentlyReadingBookFound.shelf);
        const wantToReadBookFound = (this.props.booksShelf.wantToRead.length ? this.props.booksShelf.wantToRead : this.state.booksInShelf.getWantToRead() ? this.state.booksInShelf.getWantToRead() : []).find(book => book.id === searchBook.id);
        if (wantToReadBookFound) return (wantToReadBookFound.shelf);
        const readBookFound = (this.props.booksShelf.read.length ? this.props.booksShelf.read : this.state.booksInShelf.getRead() ? this.state.booksInShelf.getRead() : []).find(book => book.id === searchBook.id);
        if (readBookFound) return (readBookFound.shelf);
        return 'move';
    }
    changeShelf(book, e) {
        update(book, e.target.value);
    }
    updateSearchResults() {
        const sr = this.state.searchResults;
        if (!sr.error) {
            sr.forEach((eachResult, i) => {
                const res = this.checkSearchBookExistsInTheShelf(eachResult);
                sr[i].shelf = res;
            });
            this.setState({
                searchResults: sr
            })
        }
    }
    searchBook(e) {
        search(e.target.value).then(data => {
            this.setState({
                searchResults: data ? data : []
            }, this.updateSearchResults);
        });
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.props.history.push('/')}>Close</button>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={this.searchBook} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.searchResults.error ? 'No Books Found!' : this.state.searchResults.map(book => {
                                return <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                            <div className="book-shelf-changer">
                                                {
                                                    book.shelf === 'move' ?
                                                        <select defaultValue={'move'} onChange={this.changeShelf.bind(this, book)}>
                                                            <option value="move" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                        :
                                                        book.shelf === 'read' ? <select defaultChecked={'read'} defaultValue={book.shelf} onChange={this.changeShelf.bind(this, book)}>
                                                            <option value="move" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select> : book.shelf === 'wantToRead' ? <select defaultChecked={'wantToRead'} defaultValue={book.shelf} onChange={this.changeShelf.bind(this, book)}>
                                                            <option value="move" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select> :
                                                                book.shelf === 'currentlyReading' ? <select defaultChecked={book.shelf} defaultValue={book.shelf} onChange={this.changeShelf.bind(this, book)}>
                                                                    <option value="move" disabled>Move to...</option>
                                                                    <option value="currentlyReading">Currently Reading</option>
                                                                    <option value="wantToRead">Want to Read</option>
                                                                    <option value="read">Read</option>
                                                                    <option value="none">None</option>
                                                                </select> : <div />
                                                }
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.author}</div>
                                    </div>
                                </li>
                            }
                            )
                        }</ol>
                </div>
            </div>
        );
    }
}

export default connect(state => ({ booksShelf: state.bookShelf }), { changeCurrentlyReading, changeRead, changeWantTORead })(withRouter(Search));
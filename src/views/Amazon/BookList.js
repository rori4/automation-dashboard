import React, { Component } from 'react'
import ProductSearch from '../../components/Searches/ProductSearch';
import BookService from './../../services/book-service';

export default class BookList extends Component {
  static bookService = new BookService();
  render() {
    return (
      <ProductSearch service={BookList.bookService} headerText="My Kindle Books"></ProductSearch>
    )
  }
}

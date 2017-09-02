
import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
//
import Header from './Header';
import ArtistMain from './artists/ArtistMain';
import ArtistDetail from './artists/ArtistDetail';
import ArtistCreate from './artists/ArtistCreate';
import ArtistEdit from './artists/ArtistEdit';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <Route path="artists/new" component={ArtistCreate} />
          <Route path="artists/:id" component={ArtistDetail} />
          <Route path="artists/:id/edit" component={ArtistEdit} />
        </div> 
      </BrowserRouter>
    );
  }
};
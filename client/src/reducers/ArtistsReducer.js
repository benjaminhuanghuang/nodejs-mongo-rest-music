import _ from 'lodash';
import {
  SEARCH_ARTISTS,
  FIND_ARTIST,
  RESET_ARTIST
} from '../actions/types';

const INITIAL_STATE = {
  all: [],
  offset: 0,
  limit: 20,
  count: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_ARTISTS:
      // overwrite state.count and state.all with action.payload
      return _.extend({}, state, {
        count: action.payload.length,
        all: action.payload.all
      })
    case FIND_ARTIST:
      const data = _.extend({}, state, { artist: action.payload });
      //console.log("FIND_ARTIST payload", data);
      return data;
    case RESET_ARTIST:
      return _.extend({}, state, { artist: null });
    default:
      return state;
  }
};

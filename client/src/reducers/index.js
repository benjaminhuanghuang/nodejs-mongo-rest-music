import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
//
import filterCriteriaReducer from './FilterCriteriaReducer';
import ArtistsReducer from './ArtistsReducer';
import ErrorReducer from './ErrorReducer';
import SelectionReducer from './SelectionReducer';

const rootReducer =  combineReducers({
  form: formReducer,
  filterCriteria: filterCriteriaReducer,
  artists: ArtistsReducer,
  errors: ErrorReducer,
  selection: SelectionReducer
});

export default rootReducer;
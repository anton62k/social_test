import { combineReducers } from 'redux';
import entities from './entities';
import login from './login';

export default combineReducers({ login, entities });

import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic, AppState } from 'state';

const epicMiddleware = createEpicMiddleware(rootEpic);

const devToolsKey = '__REDUX_DEV_TOOLS_EXTENSIONS_COMPOSE__';
const _compose = window[devToolsKey] || compose;

const enhancer = _compose(
  applyMiddleware(epicMiddleware)
);

export const store = createStore<AppState>(rootReducer, enhancer);

import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'

import {AppActionType, appReducer} from '../reducers/app-reducer'
import {authReducer, LoginActionsType} from '../reducers/auth-reducer'
import {registerReducer, SetRegisterInType} from '../reducers/registration-reducer'
import {ProfileActionsType, profileReducer} from '../reducers/profile-reducer'
import {PassRecoveryActionsType, passRecoveryReducer} from '../reducers/passRecovery-reducer'
import {NewPassReducerActionType, setNewPassReducer} from '../reducers/newPass-reducer'
import {CardsActionsType, cardsReducer} from '../reducers/cards-reducer'
import {PackListActionsType, packsReducer} from '../reducers/packs-reducer'
import {LearnActionsType, learnReducer} from "../reducers/learn-reducer";
import {UsersListActionType, usersReducer} from "../reducers/users-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    login: authReducer,
    auth: registerReducer,
    profile: profileReducer,
    passRecovery: passRecoveryReducer,
    newPassword: setNewPassReducer,
    packs: packsReducer,
    cards: cardsReducer,
    learn: learnReducer,
    users: usersReducer
})

// ===== Принимаем типизацию всех редьюсеров ===== //
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

type ReduxActionType =
    AppActionType
    | SetRegisterInType
    | LoginActionsType
    | ProfileActionsType
    | PassRecoveryActionsType
    | NewPassReducerActionType
    | PackListActionsType
    | CardsActionsType
    | LearnActionsType
    | UsersListActionType

export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>

// ===== Типизация Dispatch для Actions и Thunks ===== //
export type AppDispatchType = ThunkDispatch<RootState, unknown, ReduxActionType>

// ===== Типизация того что возвращает нам Thunk ===== //
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ReduxActionType>
// @ts-ignore
window.store = store
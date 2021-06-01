import {createContext} from 'react';
import {AppContextType} from "../types";

const AppContext = createContext<AppContextType>({} as AppContextType);

export default AppContext;

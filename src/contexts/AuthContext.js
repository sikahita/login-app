import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};
import React from 'react';
import { Router } from 'react-routing';
import http from './core/HttpClient';
import App from './components/App';
import ContentPage from './components/ContentPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/Home';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';



const checkCookies = cookies => {
  return new Promise(resolve => {
    if(cookies && cookies.sesltoks){
      http.post('/api/credentials/login', {
        cookie: cookies.sesltok
      }).then(res=>{
          return resolve((res.status=== 'ok'));
      });
    }else{
      resolve(false);
    }
  });
}


const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/', async (state, next) => {
    const validToken = await checkCookies(state.cookies);
    return <HomePage loggedIn={validToken} />;
  });

  on('/login', async () => <LoginPage />);

  on('/register', async () => <RegisterPage />);

  on('*', async (state) => {
    const content = await http.get(`/api/content?path=${state.path}`);
    return content && <ContentPage {...content} />;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;

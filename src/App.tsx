import router from './routes.tsx';
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import GlobalStyle from './styles/globalStyle.tsx';
import NavbarContextProvider from './contexts/NavbarContext.tsx';
import { antDThemeConfig } from './config/antDThemeConfig.ts';

function App() {
    return <>
        <GlobalStyle />
        <NavbarContextProvider>
            <ConfigProvider theme={antDThemeConfig}>
                <RouterProvider router={router} />
            </ConfigProvider >
        </NavbarContextProvider>
    </>;
}

export default App

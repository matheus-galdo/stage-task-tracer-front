import router from './routes.tsx';
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd';
import GlobalStyle from './styles/globalStyle.tsx';
import NavbarContextProvider from './contexts/NavbarContext.tsx';

//TODO: separete file
const antDThemeConfig = {
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: '#28A781',        
        borderRadius: 2,
    },
    components: {
        Menu: {
            groupTitleColor: 'red',
            darkItemBg: 'unset',
            darkMenuItemBg: 'unset',
            darkSubMenuItemBg: 'unset',
            darkPopupBg: '#202020',
            itemHeight: 30,
            darkItemHoverBg: 'rgba(255, 255, 255, 0.06)'
        }
    }
}

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

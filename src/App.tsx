import router from './routes.tsx';
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd';
import GlobalStyle from './styles/globalStyle.tsx';

//TODO: separete file
const antDThemeConfig = {
    algorithm: theme.darkAlgorithm,
    token: {
        // Seed Token
        colorPrimary: '#28A781',
        borderRadius: 2,

        // Alias Token
        // colorBgBase: '#499200',
    },
    components: {
        Menu: {
            darkItemBg: "#202020",
            itemHeight: 30
        }
    }
}

function App() {
    return <>
        <GlobalStyle />
        <ConfigProvider theme={antDThemeConfig}>
            <RouterProvider router={router} />
        </ConfigProvider >
    </>;
}

export default App

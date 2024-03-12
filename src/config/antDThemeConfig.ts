import { ThemeConfig, theme } from "antd";

export const antDThemeConfig: ThemeConfig = {
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: '#28A781',
        borderRadius: 2,
    },
    components: {
        Menu: {
            groupTitleColor: 'red',
            darkItemBg: 'unset',
            darkSubMenuItemBg: 'unset',
            darkPopupBg: '#202020',
            itemHeight: 30,
            darkItemHoverBg: 'rgba(255, 255, 255, 0.06)'
        },
        Drawer: {
            colorBgElevated: '#2C2C2C'
        }
    }
}
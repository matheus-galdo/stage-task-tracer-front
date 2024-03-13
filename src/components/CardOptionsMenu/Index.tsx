import { ItemType } from "antd/es/menu/hooks/useItems";
import { Action } from "../NavBar";
import { DeleteFilled, EditFilled, EllipsisOutlined } from "@ant-design/icons";
import { Menu } from "antd";

export type CardOptionsMenuAction<T> = (action: Action, value?: T) => void;

export type CardOptionsMenuProps<T> = {
    cardItem: T;
    onEditSelected: CardOptionsMenuAction<T>;
    onDeleteSelected: CardOptionsMenuAction<T>;
}

function CardOptionsMenu<T>({ cardItem, onEditSelected, onDeleteSelected }: CardOptionsMenuProps<T>) {
    const cardMenuOptions: ItemType[] = [{
        key: "options",
        children: [
            { key: "edit", icon: <EditFilled />, label: "Editar", onClick: (action) => onEditSelected(action, cardItem) },
            { key: "delete", icon: <DeleteFilled />, label: "Excluir", onClick: (action) => onDeleteSelected(action, cardItem), danger: true },
        ],
        onTitleClick: (ev) => {
            ev.domEvent.stopPropagation();
        }
    }];

    return <Menu theme='dark' items={cardMenuOptions} expandIcon={<EllipsisOutlined />} />
}

export default CardOptionsMenu;
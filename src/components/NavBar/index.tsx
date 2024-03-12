import { PlusOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { SyntheticEvent, useContext } from "react";
import { MenuContainer } from "./style";
import { useNavigate } from "react-router-dom";
import { NavbarContext } from "../../contexts/NavbarContext";

type NavBarProps = {
  defaultActiveOption?: string;
};

type MenuAction = "newArea" | string;

export type Action = {
  key: MenuAction;
  keyPath?: string[];
  domEvent: SyntheticEvent
};

export default function NavBar({ defaultActiveOption }: NavBarProps) {
  const navigate = useNavigate();
  const { areas } = useContext(NavbarContext);
  
  const defaultSelectedKeys = defaultActiveOption ? [defaultActiveOption] : [];
  const isCollapsed = false;

  const areasItems: ItemType[] = areas ? areas.map(area => ({ key: area.id, label: area.title })) : [];
  const addNewArea: ItemType = { key: "newArea", label: "Nova Area", icon: <PlusOutlined /> };
  const menuItens: ItemType[] = [
    { key: "areas", label: "Áreas", children: [...areasItems, addNewArea] },
  ];

  function handleNavBarClick(action: Action) {
    if (action.key === "newArea") {
      navigate("/areas/criar");
    } else {
      navigate(`/areas/${action.key}`);
    }
  }

  return <MenuContainer>
    <Menu
      defaultSelectedKeys={defaultSelectedKeys}
      items={menuItens}
      mode="inline"
      inlineCollapsed={isCollapsed}
      theme="dark"
      defaultOpenKeys={["areas"]}
      onClick={handleNavBarClick}
    />
  </MenuContainer>
}

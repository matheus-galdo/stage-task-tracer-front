import { PlusOutlined } from "@ant-design/icons";
import { Menu, Modal } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { SyntheticEvent, useState } from "react";
import { MenuContainer } from "./style";
import { useNavigate } from "react-router-dom";
import { Area } from "../../pages/Areas/ViewArea";

type NavBarProps = {
  areas: Area[];
};

type MenuAction = "newArea" | string;

type Action = {
  key: MenuAction;
  keyPath: string[];
  domEvent: SyntheticEvent
};


export default function NavBar({ areas }: NavBarProps) {
  const navigate = useNavigate();

  const isCollapsed = false;

  const apiItems: ItemType[] = areas ? areas.map(area => ({ key: area.title, label: area.title })) : [];

  const addNewArea: ItemType = { key: "newArea", label: "Nova Area", icon: <PlusOutlined /> };
  const menuItens: ItemType[] = [
    { key: "1", label: "Áreas", children: [...apiItems, addNewArea] },
  ];

  function handleNavBarClick(action: Action) {
    console.log();
    
    if (action.key === "newArea") {
      navigate("/areas/criar")
    }else{
      navigate(`/areas/${action.key}`);
    }
  }

  return <MenuContainer>
    <Menu
      items={menuItens}
      mode="inline"
      inlineCollapsed={isCollapsed}
      theme="dark"
      defaultOpenKeys={["1"]}
      onClick={handleNavBarClick}
    />
  </MenuContainer>
}

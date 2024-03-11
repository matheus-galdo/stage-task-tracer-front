import { PlusOutlined } from "@ant-design/icons";
import { Menu, Modal } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { SyntheticEvent, useState } from "react";
import { MenuContainer } from "./style";
import { useNavigate } from "react-router-dom";

type MenuAction = "newArea" | string;

type Action = {
  key: MenuAction;
  keyPath: string[];
  domEvent: SyntheticEvent
};


export default function NavBar({ areas }) {
  const navigate = useNavigate();

  const menuAction = {
    "newArea": () => navigate("/areas/criar"),
  };

  const isCollapsed = false;

  const apiItems: ItemType[] = areas ? areas.map(area => ({ key: area.title, label: area.title })) : [];


  const addNewArea: ItemType = { key: "newArea", label: "Nova Area", icon: <PlusOutlined /> };
  const menuItens: ItemType[] = [
    { key: "1", label: "Áreas", children: [...apiItems, addNewArea] },
  ];

  function handleNavBarClick(action: Action) {
    if (action.key === "newArea") {
      const fn = menuAction[action.key];
      fn(); 
    }
    navigate(`/areas/${action.key}`);
  }

  return <MenuContainer>
    <Menu
      items={menuItens}
      mode="inline"
      inlineCollapsed={isCollapsed}
      theme="dark"
      defaultOpenKeys={["1"]}
      // onClick={(item) => showModal()}
      onClick={handleNavBarClick}
    />
  </MenuContainer>
}

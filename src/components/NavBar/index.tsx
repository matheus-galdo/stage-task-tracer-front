import { PlusOutlined } from "@ant-design/icons";
import { Menu, Modal } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { SyntheticEvent, useContext, useState } from "react";
import { MenuContainer } from "./style";
import { useNavigate } from "react-router-dom";
import { Area } from "../../pages/Areas/ViewArea";
import { NavbarContext } from "../../contexts/NavbarContext";

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

  const {setSelectedItem} = useContext(NavbarContext);
  const isCollapsed = false;

  const apiItems: ItemType[] = areas ? areas.map(area => ({ key: area.id, label: area.title })) : [];

  const addNewArea: ItemType = { key: "newArea", label: "Nova Area", icon: <PlusOutlined /> };
  const menuItens: ItemType[] = [
    { key: "areas", label: "Áreas", children: [...apiItems, addNewArea] },
  ];

  function handleNavBarClick(action: Action) {
    if (action.key === "newArea") {
      navigate("/areas/criar");
    }else{
      setSelectedItem(Number(action.key));
      navigate(`/areas/${action.key}`);
    }
  }

  return <MenuContainer>
    <Menu
      items={menuItens}
      mode="inline"
      inlineCollapsed={isCollapsed}
      theme="dark"
      defaultOpenKeys={["areas"]}
      onClick={handleNavBarClick}
    />
  </MenuContainer>
}

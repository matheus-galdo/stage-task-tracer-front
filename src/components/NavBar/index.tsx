import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Menu, Modal, Row, Space } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { SyntheticEvent, useContext, useState } from "react";
import { MenuContainer } from "./style";
import { useNavigate } from "react-router-dom";
import { NavbarContext } from "../../contexts/NavbarContext";
import CardOptionsMenu from "../CardOptionsMenu/Index";
import { Area } from "../../pages/Areas/ViewArea";
import { AxiosError } from "axios";
import areasService from "../../services/areasService";

type NavBarProps = {
  defaultActiveOption?: string;
};

type MenuAction = "newArea" | string;

export type Action = {
  key: MenuAction;
  keyPath?: string[];
  domEvent: SyntheticEvent
};

type NavbarItemProps = {
  area: Area;
  onDelete: (action: Action, value?: Area) => void;
  onEdit: (action: Action, value?: Area) => void;
}

function NavbarItem({ area, onDelete, onEdit }: NavbarItemProps) {
  return <>
    {area && <Row justify='space-between' align='middle'>
      {area.title}
      <CardOptionsMenu cardItem={area} onDeleteSelected={onDelete} onEditSelected={onEdit} />
    </Row>}
  </>
}

export default function NavBar({ defaultActiveOption }: NavBarProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<Area>();

  const navigate = useNavigate();
  const { areas } = useContext(NavbarContext);

  const defaultSelectedKeys = defaultActiveOption ? [defaultActiveOption] : [];
  const isCollapsed = false;


  function deleteArea() {
    if (selectedArea) {
      areasService.deleteArea(selectedArea.id).then(() => {
      });
    }
  }

  const hideModal = (type: 'edit' | 'delete') => {
    if (type === 'edit') {
      return setIsEditModalOpen(false);
    }
    setIsDeleteModalOpen(false);
  };

  function showDeleteModal(action: Action, value?: Area) {
    action.domEvent.stopPropagation();
    setSelectedArea(value);
    setIsDeleteModalOpen(true);
  }

  function showEditModal(action: Action, value?: Area) {
    action.domEvent.stopPropagation();
    setSelectedArea(value);
    setIsEditModalOpen(true);
  }


  // const areasItems: ItemType[] = areas ? areas.map(area => ({ key: area.id, label: area.title })) : [];
  const areasItems: ItemType[] = areas ? areas.map(area => ({
    key: area.id, label: <NavbarItem area={area} onEdit={showEditModal} onDelete={showDeleteModal} />
  })) : [];
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

    <Modal
      okButtonProps={{ danger: true, }}
      title="Confirmar ação"
      open={isDeleteModalOpen}
      onOk={deleteArea}
      onCancel={() => hideModal('delete')}
    >
      Tem certeza que desejar excluir a área "{selectedArea?.title}"?
    </Modal>

    <EditAreaModalForm
      area={selectedArea} isEditModalOpen={isEditModalOpen} hideModal={hideModal} />
  </MenuContainer>
}


type FieldsTypes = {
  title: string;
}

type EditAreaModalFormProps = {
  area?: Area;
  isEditModalOpen: boolean;
  hideModal: (type: 'edit' | 'delete') => void;
}

function EditAreaModalForm({ area, isEditModalOpen, hideModal }: EditAreaModalFormProps) {
  const initialValues: FieldsTypes = {
    title: area?.title || '',
  }

  function handleSubmit(formData: FieldsTypes) {
    const formRequestBody: Omit<Area, 'id'> = { title: formData.title };
    if (area) {
      areasService.updateArea(area.id, formRequestBody).then(() => {
        hideModal('edit');
        // onCreateOrUpdate(process?.id);
      }).catch((error: AxiosError) => {
        alert(error.response?.data);
      });
    }
  }

  return <Modal title="Editar área" open={isEditModalOpen} footer={false} onCancel={() => hideModal('edit')} destroyOnClose={true}>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <Form.Item<FieldsTypes>
        name="title"
        label="Título"
        rules={[{ required: true, message: "Este campo é obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Row justify="end" align="top">
        <Space size="small">
          <Button type="default" onClick={() => hideModal('edit')}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Space>
      </Row>
    </Form>
  </Modal>
}

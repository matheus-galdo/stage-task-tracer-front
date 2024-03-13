import { AxiosError, AxiosResponse } from "axios";
import { Area, Process } from ".";
import processesService, { PartialProcess } from "../../../services/processesService";
import { Button, Form, Input, Modal, Row, Space } from "antd";

type CreateProcessFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  getProcesses: (areaId: number) => void;
  area: Area;
  process?: Process | undefined;
}

type FieldsTypes = {
  processName: string;
}

export function ProcessForm({ isModalOpen, getProcesses, setIsModalOpen, area, process }: CreateProcessFormProps) {
  const isEditingProcess = !!process;

  function handleSubmit(formData: FieldsTypes) {
    const formRequestBody: PartialProcess = {
      name: formData.processName,
      areaId: area?.id
    };

    let promise: Promise<AxiosResponse>;
    if (isEditingProcess) {
      promise = processesService.updateProcess(process.id.toString(), formRequestBody);
    } else {
      promise = processesService.createProcess(formRequestBody);
    }

    promise.then(() => {
      hideModal();
      getProcesses(area.id);
    }).catch((error: AxiosError) => {
      alert(error.response?.data);
    });
  }

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const initialValues: FieldsTypes = {
    processName: process ? process.name : '',
  }

  const modalTitle = `${isEditingProcess ? "Editar" : "Criar"} Processo`;
  return <Modal title={modalTitle} open={isModalOpen} footer={false} onCancel={hideModal} destroyOnClose={true}>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <Form.Item<FieldsTypes>
        name="processName"
        label="Nome"
        rules={[{ required: true, message: "Este campo é obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Row justify="end" align="top">
        <Space size="small">
          <Button type="default" onClick={hideModal}>
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
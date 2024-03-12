import { AxiosError, AxiosResponse } from "axios";
import { Button, Form, Input, Modal, Row, Space } from "antd";
import subProcessesService from "../../services/subProcessesService";
import { Process } from "../Areas/ViewArea";
import { useContext } from "react";
import { SubProcessModalContext } from "../../contexts/SubProcessModalContext";

type CreateSubProcessFormProps = {
  process: Process;
  subProcess?: Process | undefined;
}

type FieldsTypes = {
  subProcessName: string;
}

export function SubProcessForm({ subProcess, process }: CreateSubProcessFormProps) {
  const { isModalOpen, closeEditModal } = useContext(SubProcessModalContext);
  const isEditingSubProcess = !!subProcess;

  function handleSubmit(formData: FieldsTypes) {
    const formRequestBody = { name: formData.subProcessName, processId: process?.id };

    let promise: Promise<AxiosResponse>;
    if (isEditingSubProcess) {
      promise = subProcessesService.updateProcess(process.id.toString(), formRequestBody);
    } else {
      promise = subProcessesService.createProcess(formRequestBody);
    }

    promise.then(() => {
      closeEditModal();
      //TODO: reload nos processos
    }).catch((error: AxiosError) => {
      //TODO: alerta de erro
      alert(error.response?.data);
    });
  }

  const initialValues: FieldsTypes = {
    subProcessName: subProcess ? subProcess.name : '',
  }

  const modalTitle = `${isEditingSubProcess ? "Editar" : "Criar"} Processo`;
  return <Modal title={modalTitle} open={isModalOpen} footer={false} onCancel={closeEditModal} destroyOnClose={true}>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <Form.Item<FieldsTypes>
        name="subProcessName"
        label="Nome"
        rules={[{ required: true, message: "Este campo é obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Row justify="end" align="top">
        <Space size="small">
          <Button type="default" onClick={closeEditModal}>
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
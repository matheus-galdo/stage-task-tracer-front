import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Row } from 'antd';
import { useContext, useState } from 'react';
import { SubProcess } from '../../pages/ViewProcess/Index.tsx';
import { SubProcessEditModalContext } from '../../contexts/SubProcessEditModalContext.tsx';
import TimelineCard from './TimelineCard.tsx';
import { CustomPlusCircle } from './style.tsx';

export type SubProcessTimeLineProps = {
  subProcesses: SubProcess[];
};

function ProcessTimeLine({ subProcesses }: SubProcessTimeLineProps) {
  const [open, setOpen] = useState(true);

  const { openEditModal } = useContext(SubProcessEditModalContext);

  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  return <>
    <Drawer
      title={<Row justify='space-between'>
        Sub Processos
        <Button type='text' size='small' onClick={openEditModal}>
          <CustomPlusCircle />
        </Button>
      </Row>}
      onClose={onClose}
      open={open}
      forceRender={true}
      mask={false}
      closeIcon={<MenuOutlined />}
    >
      {subProcesses.map(subProcess => <TimelineCard
        key={subProcess.id}
        subProcess={subProcess}
      />)}
    </Drawer>


    <div>
      <Button onClick={showDrawer}>
        <MenuOutlined />
      </Button>
    </div>
  </>;
}





export default ProcessTimeLine;
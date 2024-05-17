import React, { createContext, useContext, useEffect, useState } from 'react';
import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { CryptoContextProvider, useCrypto } from '../../Context/CryptoContext';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
  textAlign: 'center',
  height: 60,
  width: '100%',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const { crypto } = useCrypto();

  // useEffect(() => {
  //   const keypress = event => {
  //     if (event.key === '/'){
  //       setSelect((prev) => !prev)
  //     }
  //   document.addEventListener('keypress', keypress)
  //   return () => { document.removeEventListener('keypress', keypress) }
  //   }
  // }, [])

  function handleSelect(value) {
    setModal(true);
    setCoin(crypto.find(c => c.id === value))
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: '250px' }}
        open={select}
        value="click to open"
        onClick={() => (setSelect((prev) => !prev))}
        onSelect={handleSelect}
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: '20px' }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
          </Space>
        )}
        
      />
      <Button type="primary" onClick={() => setDrawer(true)}>Primary Button</Button>

      <Modal
        title="Basic Modal"
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin}/>
      </Modal>

      <Drawer width={'600px'} title="Basic Drawer" onClose={() => setDrawer(false)} open={drawer} destroyOnClose={true}>
        <AddAssetForm onClose={() => setDrawer(false)}/>
      </Drawer>
    </Layout.Header>
  );
}
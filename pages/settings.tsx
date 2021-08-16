import React, { useState } from 'react';
import Layout from '../components/Layout';
import ProtectRoute from '../auth/ProtectRoute';

function Settings() {
  const [activeTab, setActiveTab] = useState<string>('1');

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Layout title="Settings">Settingss</Layout>
    </div>
  );
}

export default ProtectRoute(Settings);

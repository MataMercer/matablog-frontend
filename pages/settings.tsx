import React, { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';
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

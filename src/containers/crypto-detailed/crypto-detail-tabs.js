import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Stats from './stats';
import Founders from './founders';
import WhitePaper from './whitepaper';

const DetailTabs = ({ team, whitepaper }) => (
  <Tabs defaultActiveKey="market">
    <Tab eventKey="market" title="Market">
      <Stats />
    </Tab>
    <Tab eventKey="team" title="Team">
      <Founders style={{ maxWidth: 1050 }} team={team} />
    </Tab>
    <Tab eventKey="whitepaper" title="White Paper">
      <WhitePaper
        previewImageSrc={whitepaper.thumbnail}
        sourceUrl={whitepaper.link}
      />
    </Tab>
  </Tabs>
);

export default DetailTabs;

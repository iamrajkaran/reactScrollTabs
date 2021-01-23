import './index.css'
import React, {Component} from 'react';

import {simpleSwitch} from 'react-tabtab/lib/helpers/move';
import {Tabs, DragTabList, DragTab, PanelList, Panel, ExtraButton}  from 'react-tabtab';
import * as customStyle from 'react-tabtab/lib/themes/bootstrap';
import { MdAddCircleOutline } from 'react-icons/md';

import {createPanelData, creatNewPanelData, showAlert} from './utils';
export default class TabsView extends Component {
  constructor(props) {
    super(props);
    const tabs = createPanelData(3);

    this.state = {
      tabs,
      activeIndex: 0,
      numberOfTabs: tabs.length,
      showAddButton: true,
      showArrow: true,
      showModal: false,
    };
  }

  actionToAddNewTab = () => {
    const {tabs} = this.state;
    const currentTabLength = this.state.tabs.length;
    const newTabNumber = currentTabLength + 1;

    if (currentTabLength === 10) {
      showAlert('You have reached max open tab limit', 'addLimit');
      return;
    }
    const newTabs = [...tabs, creatNewPanelData(newTabNumber)];
    this.setState({tabs: newTabs, activeIndex: newTabs.length - 1, numberOfTabs: newTabs.length});
  }

  actionToChangeCurrentTab = index => {
    this.setState({activeIndex: index});
  }

  actionToChangeTabSequence = ({oldIndex, newIndex}) => {
    console.log('xdxdsxs');
    const {tabs} = this.state;
    const updateTabs = simpleSwitch(tabs, oldIndex, newIndex);
    this.setState({tabs: updateTabs, activeIndex: newIndex});
  }

  actionToCloseTab = ({type, index}) => {
    this.setState((state) => {
      const {tabs, activeIndex} = state;

      if (type === 'delete') {
        this.setState({tabs: [...tabs.slice(0, index), ...tabs.slice(index + 1)]});
        showAlert('Tab has been deleted', 'close');
      }
      if (index - 1 >= 0) {
        this.setState({activeIndex: index - 1});
      } else {
        this.setState({activeIndex: 0});
      }
      return {tabs, activeIndex};
    });
  }

  render() {
    const {tabs, activeIndex, showArrow, showModal, showAddButton} = this.state;
    const tabTemplate = [];
    const panelTemplate = [];
    tabs.forEach((tab, i) => {
      const closable = tabs.length > 1;
      tabTemplate.push(<DragTab key={i} closable={closable}>{tab.title}</DragTab>);
      panelTemplate.push(<Panel key={i}>{tab.content}</Panel>);
    })

    return (
      <div>
        <Tabs
              customStyle={customStyle}
              onTabEdit={this.actionToCloseTab}
              onTabChange={this.actionToChangeCurrentTab}
              activeIndex={activeIndex}
              onTabSequenceChange={this.actionToChangeTabSequence}
              showArrowButton={showArrow}
              showModalButton={showModal}
              ExtraButton={showAddButton &&
                <ExtraButton onClick={this.actionToAddNewTab}>
                  <MdAddCircleOutline
                    className= "addIcon"
                  />
                </ExtraButton>
              }>
          <DragTabList>
            {tabTemplate}
          </DragTabList>
          <PanelList>
            {panelTemplate}
          </PanelList>
        </Tabs>
      </div>
    )
  }
}
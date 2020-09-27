import React, {memo} from 'react';
import i18n from 'i18n-js';
import {StyleSheet, View} from 'react-native';
import {Touchable} from '../../../../../components/template';
import {TextL, TextM} from '../../../../../components/template/CommonText';
import {Colors} from '../../../../../assets/theme';
const ToolBar = memo(props => {
  const {index, setIndex} = props;
  const toolList = [
    i18n.t('swap.swaps'),
    i18n.t('swap.adds'),
    i18n.t('swap.removes'),
  ];
  return (
    <>
      <View style={styles.toolBarBox}>
        {toolList.map((item, j) => {
          const current = j === index;
          return (
            <Touchable
              highlight
              disabled={current}
              underlayColor={Colors.bottonPressColor}
              onPress={() => setIndex(j)}
              key={j}
              style={[
                styles.toolBarItem,
                current && {backgroundColor: Colors.primaryColor},
              ]}>
              <TextL style={[current && styles.whiteColor]}>{item}</TextL>
            </Touchable>
          );
        })}
      </View>
      <View style={styles.toolListTitile}>
        <TextM style={{color: Colors.fontGray}}>{toolList[index]}</TextM>
        <TextM style={{color: Colors.fontGray}}>
          {i18n.t('swap.totalValue')}
        </TextM>
      </View>
    </>
  );
});

export default ToolBar;

const styles = StyleSheet.create({
  toolBarBox: {
    flexDirection: 'row',
  },
  toolBarItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: pTd(20),
    backgroundColor: Colors.bgColor2,
    borderWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: Colors.primaryColor,
  },
  whiteColor: {
    color: Colors.fontWhite,
  },
  toolListTitile: {
    paddingTop: pTd(15),
    paddingBottom: pTd(10),
    paddingHorizontal: pTd(30),
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

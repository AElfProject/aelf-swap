import React, {memo, useMemo} from 'react';
import i18n from 'i18n-js';
import {Touchable} from '../../../../../components/template';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../../../../assets/theme';
import {TextL} from '../../../../../components/template/CommonText';
import TitleTool from '../../components/TitleTool';
import {useStateToProps} from '../../../../../utils/pages/hooks';
const HomeToolBar = memo(props => {
  const {index, setIndex} = props;
  const {language} = useStateToProps(base => {
    const {settings} = base;
    return {
      language: settings.language,
    };
  });
  const toolList = [
    i18n.t('swap.tokens'),
    i18n.t('swap.pairs'),
    i18n.t('swap.accounts'),
  ];
  const toolBarBox = useMemo(() => {
    return (
      <View style={styles.toolBarBox}>
        {toolList.map((item, j) => {
          const current = j === index;
          return (
            <Touchable
              key={j}
              highlight
              disabled={current}
              onPress={() => setIndex?.(j)}
              underlayColor={Colors.bottonPressColor}
              style={[
                styles.toolBarItem,
                current && {backgroundColor: Colors.primaryColor},
              ]}>
              <TextL style={[current && styles.whiteColor]}>{item}</TextL>
            </Touchable>
          );
        })}
      </View>
    );
  }, [index, setIndex, toolList]);
  const titleTool = useMemo(() => {
    let titleList = [i18n.t('swap.pair'), i18n.t('swap.liquidity')];
    if (index === 2) {
      titleList = [i18n.t('account'), i18n.t('swap.value')];
    } else if (index === 0) {
      titleList = [
        i18n.t('swap.tokenT'),
        i18n.t('swap.liquidity'),
        i18n.t('swap.price'),
        i18n.t('swap.priceChange'),
      ];
    }
    return <TitleTool titleList={titleList} />;
    //Need to know to change language
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, language]);
  return (
    <>
      {toolBarBox}
      {titleTool}
    </>
  );
});

export default HomeToolBar;
const styles = StyleSheet.create({
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
  toolBarBox: {
    flexDirection: 'row',
  },
});

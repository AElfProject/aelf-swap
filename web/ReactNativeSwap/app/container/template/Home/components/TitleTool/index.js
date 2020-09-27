import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextM} from '../../../../../components/template/CommonText';
const TitleTool = props => {
  const {titleList} = props;
  if (titleList.length === 2) {
    return (
      <View style={styles.listItemBox}>
        {titleList.map((item, index) => {
          let style = [
            styles.topSubtitle,
            styles.flexBox,
            styles.accountSubtitle,
          ];
          if (index === 0) {
            style = [
              styles.topSubtitle,
              styles.flexBox,
              styles.accountTitleStyle,
            ];
          }
          return (
            <TextM numberOfLines={1} style={style} key={index}>
              {item}
            </TextM>
          );
        })}
      </View>
    );
  }
  if (titleList.length === 4) {
    return (
      <View style={styles.listItemBox}>
        {titleList.map((item, index) => {
          let style = [styles.tokenTopSubtitle, styles.flexBox];
          if (index === 0) {
            style = [styles.titleStyle, styles.tokenTopSubtitle];
          }
          return (
            <TextM style={style} key={index}>
              {item}
            </TextM>
          );
        })}
      </View>
    );
  }
  return (
    <View style={styles.listItemBox}>
      {titleList.map((item, index) => {
        let style = [styles.topSubtitle, styles.flexBox];
        if (index === 0) {
          style = [styles.titleStyle, styles.topTitle];
        }
        return (
          <TextM style={style} key={index}>
            {item}
          </TextM>
        );
      })}
    </View>
  );
};

export default memo(TitleTool);

const styles = StyleSheet.create({
  topTitle: {
    color: Colors.fontGray,
    fontSize: pTd(28),
  },
  topSubtitle: {
    fontSize: pTd(28),
    color: Colors.fontGray,
  },
  tokenTopSubtitle: {
    fontSize: pTd(26),
    color: Colors.fontGray,
  },
  titleStyle: {
    flex: 1,
    color: Colors.primaryColor,
  },
  listItemBox: {
    paddingHorizontal: pTd(30),
    paddingVertical: pTd(20),
    flexDirection: 'row',
    backgroundColor: Colors.bgColor2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  flexBox: {
    flex: 1,
    marginLeft: pTd(10),
  },
  accountSubtitle: {
    textAlign: 'right',
  },
  accountTitleStyle: {
    flex: 2,
  },
});

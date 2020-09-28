import React, {memo, useCallback} from 'react';
import {StyleSheet, View, Keyboard} from 'react-native';
import {pTd} from '../../../../utils/common';
import {Colors} from '../../../../assets/theme';
import {
  OverlayModal,
  Touchable,
  Communication,
} from '../../../../components/template';
import {TextL, CopyText} from '../../../../components/template/CommonText';
import i18n from 'i18n-js';
import {statusBarHeight} from '../../../../utils/common/device';
import aelfUtils from '../../../../utils/pages/aelfUtils';
import navigationService from '../../../../utils/common/navigationService';
const Components = memo(props => {
  const {txId, goBack} = props;
  const onHide = useCallback(() => {
    OverlayModal.hide();
    goBack && navigationService.goBack();
  }, [goBack]);
  return (
    <View style={styles.chooseTokenModal}>
      <TextL>{i18n.t('swap.transactionPop.transactionSubmitted')}</TextL>
      <CopyText
        style={styles.txIdStyle}
        copied={txId}
        iconColor={Colors.primaryColor}>
        {i18n.t('swap.transactionPop.txId')}:{txId}
      </CopyText>
      <TextL
        onPress={() => {
          Communication.web(aelfUtils.webURLTx(txId));
          onHide();
        }}
        style={styles.explorer}>
        {i18n.t('swap.transactionPop.explorer')}
      </TextL>
      <Touchable onPress={onHide} style={styles.okStyle}>
        <TextL style={styles.okText}>{i18n.t('swap.transactionPop.OK')}</TextL>
      </Touchable>
    </View>
  );
});
const show = props => {
  Keyboard.dismiss();
  OverlayModal.show(<Components {...props} />, {
    modal: true,
    type: 'zoomOut',
    style: styles.bgStyle,
    containerStyle: styles.containerStyle,
  });
};

export default {show};
const styles = StyleSheet.create({
  bgStyle: {
    backgroundColor: Colors.modalBlackBG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyle: {
    width: '85%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors.bgColor,
    marginBottom: statusBarHeight,
    padding: 15,
  },
  chooseTokenModal: {
    width: '100%',
  },
  txIdStyle: {
    color: Colors.fontBlack,
    fontSize: pTd(28),
    marginTop: pTd(20),
  },
  explorer: {
    marginTop: pTd(20),
    color: Colors.primaryColor,
  },
  okStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    borderRadius: 5,
  },
  okText: {
    color: Colors.fontWhite,
  },
});

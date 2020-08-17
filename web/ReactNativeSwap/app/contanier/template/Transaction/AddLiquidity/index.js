import React, {memo, useCallback, useMemo} from 'react';
import {GStyle, Colors} from '../../../../assets/theme';
import {
  CommonHeader,
  Input,
  CommonButton,
  ListItem,
} from '../../../../components/template';
import {View, StyleSheet} from 'react-native';
import {ChooseToken, MAXComponent} from '../MAXComponent';
import {useSetState} from '../../../../utils/pages/hooks';
import {TextL, TextM} from '../../../../components/template/CommonText';
import ChooseTokenModal from '../ChooseTokenModal';
import {pTd} from '../../../../utils/common';
import Entypo from 'react-native-vector-icons/Entypo';
import {bottomBarHeigth} from '../../../../utils/common/device';
import navigationService from '../../../../utils/common/navigationService';
const tokenList = [
  {token: 'ELF', balance: '234.123'},
  {token: 'BLF', balance: '204.123'},
  {token: 'CLF', balance: '2394.123'},
  {token: 'ALF', balance: '2341.123'},
];
const AddLiquidity = () => {
  const [state, setState] = useSetState({
    firstToken: {
      input: '',
      token: 'ELF',
      balance: '1000.3456',
    },
    secondToken: {
      input: '',
      token: '',
      balance: '-',
    },
  });
  const {firstToken, secondToken} = state;
  const showTokenModal = useCallback(
    (list, type) => {
      ChooseTokenModal.show({
        tokenList: list,
        onPress: item => {
          setState({[type]: item});
        },
      });
    },
    [setState],
  );
  const rightElement = useCallback(
    (item, type, hideMax) => {
      const {token} = item;
      if (token) {
        return (
          <View style={styles.rightBox}>
            {hideMax ? null : (
              <MAXComponent
                onPress={() => {
                  setState({[type]: {...item, input: item.balance}});
                }}
              />
            )}
            <TextL
              onPress={() => {
                showTokenModal(tokenList, type);
              }}>
              {token} <Entypo size={pTd(30)} name="chevron-thin-down" />
            </TextL>
          </View>
        );
      }
      return (
        <ChooseToken
          onPress={() => {
            showTokenModal(tokenList, type);
          }}
        />
      );
    },
    [setState, showTokenModal],
  );
  const firstItem = useMemo(() => {
    return (
      <View>
        <View style={styles.inputTitleBox}>
          <TextM>Input</TextM>
          <TextM>Balance: {firstToken?.balance}</TextM>
        </View>
        <Input
          keyboardType="numeric"
          value={firstToken?.input}
          onChangeText={v => setState({firstToken: {...firstToken, input: v}})}
          style={styles.inputStyle}
          rightElement={rightElement(firstToken, 'firstToken')}
          placeholder="0.0"
        />
      </View>
    );
  }, [firstToken, rightElement, setState]);
  const secondItem = useMemo(() => {
    return (
      <View>
        <View style={styles.inputTitleBox}>
          <TextM>Input</TextM>
          <TextM>Balance: {secondToken?.balance}</TextM>
        </View>
        <Input
          keyboardType="numeric"
          value={secondToken?.input}
          onChangeText={v =>
            setState({secondToken: {...secondToken, input: v}})
          }
          style={styles.inputStyle}
          rightElement={rightElement(secondToken, 'secondToken')}
          placeholder="0.0"
        />
      </View>
    );
  }, [secondToken, rightElement, setState]);
  const Add = useMemo(() => {
    return (
      <>
        <CommonButton title="Add Liquidity" style={styles.buttonStyles} />
        <TextM style={styles.tipText}>
          Don't see a pool you want to join?{' '}
          <TextM
            onPress={() => navigationService.navigate('CreatePool')}
            style={styles.themeColor}>
            Create it.
          </TextM>
        </TextM>
      </>
    );
  }, []);
  const firstTip = useMemo(() => {
    return (
      <TextM style={styles.redColor}>
        {`you are the first person to add liquidity! 
The initial exchange rate will be set based on your deposits. Please make sure that the deposit transaction pair has a proper ratio`}
      </TextM>
    );
  }, []);
  const secondTip = useMemo(() => {
    return (
      <TextM style={styles.grayColor}>
        Output is estimated. If the price changes by more than 0.5% your
        transaction will revert.
      </TextM>
    );
  }, []);
  const prices = useMemo(() => {
    return (
      <>
        <TextL style={[styles.themeColor, styles.mrginText]}>Prices</TextL>
        <View style={[styles.splitLine]} />
        <ListItem
          disabled
          title={'ELF'}
          style={styles.itemBox}
          subtitle="1,275,362 ELF/AEETH ($ 125.24)"
          rightElement={null}
          subtitleStyle={styles.subtitleStyle}
        />
        <ListItem
          disabled
          title={'ELF'}
          style={styles.itemBox}
          subtitle="1,275,362 ELF/AEETH ($ 125.24)"
          rightElement={null}
          subtitleStyle={styles.subtitleStyle}
        />
      </>
    );
  }, []);
  const willReceive = useMemo(() => {
    return (
      <>
        <TextL style={[styles.themeColor, styles.mrginText]}>
          I Will Receive
        </TextL>
        <View style={[styles.splitLine]} />
        <ListItem
          disabled
          title={'ELF-CPU Pool Tokens'}
          style={styles.itemBox}
          subtitle="1,275.3624"
          rightElement={null}
          subtitleStyle={styles.subtitleStyle}
        />
        <ListItem
          disabled
          title={'ELF-CPU Pool Tokens'}
          style={styles.itemBox}
          subtitle="1,275.3624"
          rightElement={null}
          subtitleStyle={styles.subtitleStyle}
        />
      </>
    );
  }, []);
  const myLiquidity = useMemo(() => {
    const List = [
      {title: 'Pooled ELF:', subtitle: '0.948835'},
      {title: 'Pooled AEETH:', subtitle: '0.948835'},
      {title: 'My Pool Tokens:', subtitle: '0.948835'},
      {title: 'My Pool Share:', subtitle: '0.2%'},
    ];
    return (
      <View style={styles.myLiquidity}>
        <TextL style={styles.themeColor}>My Liquidity</TextL>
        {List.map((item, index) => {
          return (
            <View key={index} style={styles.myLiquidityItemBox}>
              <TextM>{item.title}</TextM>
              <TextM style={styles.rightText}>{item.subtitle}</TextM>
            </View>
          );
        })}
      </View>
    );
  }, []);
  return (
    <View style={GStyle.container}>
      <CommonHeader title="Add Liquidity" canBack>
        {/* <View style={styles.container}>
        {firstItem}
        {secondItem}
        {firstTip}
        {Add}
      </View> */}
        <View style={styles.container}>
          {firstItem}
          {secondItem}
          {prices}
          {willReceive}
          {secondTip}
          {Add}
          {myLiquidity}
        </View>
      </CommonHeader>
    </View>
  );
};

export default memo(AddLiquidity);

const styles = StyleSheet.create({
  inputStyle: {
    paddingHorizontal: 0,
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: pTd(50),
  },
  inputTitleBox: {
    marginTop: pTd(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyles: {
    marginTop: pTd(30),
  },
  tipText: {
    marginTop: pTd(10),
    alignSelf: 'center',
  },
  themeColor: {
    color: Colors.primaryColor,
  },
  redColor: {
    marginTop: pTd(30),
    color: 'red',
  },
  mrginText: {
    marginVertical: pTd(15),
  },
  splitLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  subtitleStyle: {
    fontSize: pTd(28),
    fontWeight: 'bold',
    color: Colors.fontBlack,
  },
  itemBox: {
    paddingHorizontal: 0,
  },
  grayColor: {
    color: Colors.fontGray,
    paddingTop: pTd(30),
  },
  myLiquidity: {
    marginTop: pTd(20),
    backgroundColor: '#e5e5e5',
    padding: pTd(20),
    borderRadius: pTd(15),
    marginBottom: pTd(30) + bottomBarHeigth,
  },
  myLiquidityItemBox: {
    marginTop: pTd(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightText: {
    flex: 1,
    textAlign: 'right',
  },
});

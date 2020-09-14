import React, {memo} from 'react';
import {View} from 'react-native';
import {TextL} from '../../../../components/template/CommonText';
import {Colors} from '../../../../assets/theme';
import styles from '../styles';
import i18n from 'i18n-js';
import RateItem from '../RateItem';
import OverviewCharts from '../OverviewCharts';
import {useStateToProps} from '../../../../utils/pages/hooks';
import {ListItem} from '../../../../components/template';
const Overview = () => {
  const {overviewInfo} = useStateToProps(base => {
    const {settings, swap} = base;
    return {
      language: settings.language,
      overviewInfo: swap.overviewInfo,
    };
  });
  const {
    totalLiquidity,
    totalLiquidityRate,
    volume,
    volumeRate,
    txsCount,
    ELFPrice,
    pairsCount,
  } = overviewInfo || {};
  return (
    <>
      <View style={styles.overviewBox}>
        <TextL style={{color: Colors.primaryColor}}>
          {i18n.t('swap.overview')}
        </TextL>
      </View>
      <RateItem
        title={i18n.t('swap.totalValue')}
        subtitle={totalLiquidity}
        rate={totalLiquidityRate}
      />
      <RateItem
        title={`${i18n.t('swap.volume')}(24h)`}
        subtitle={volume}
        rate={volumeRate}
      />
      <ListItem
        disabled
        title={`ELF ${i18n.t('swap.price')}`}
        subtitle={`$ ${ELFPrice}`}
        rightElement={null}
        subtitleStyle={styles.subtitleStyle}
      />
      <ListItem
        disabled
        title={`${i18n.t('swap.transactions')}(24h)`}
        subtitle={txsCount}
        rightElement={null}
        subtitleStyle={styles.subtitleStyle}
      />
      <ListItem
        disabled
        title={i18n.t('swap.pairs')}
        subtitle={pairsCount}
        rightElement={null}
        subtitleStyle={styles.subtitleStyle}
      />
      <OverviewCharts />
      <View style={styles.overviewBox}>
        <TextL style={{color: Colors.primaryColor}}>
          {i18n.t('swap.allMarkets')}
        </TextL>
      </View>
    </>
  );
};

export default memo(Overview);
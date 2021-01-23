import { Divider, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shallowEqual, useSelector } from 'react-redux';
import { GREY_300 } from '../../configs/colors';
import { Row } from '../../modules/common/components/elements';
import { AppState } from '../../redux/reducers';
import { ASIDE_WIDTH } from '../constants';

interface Props {}

const DefaultFooter: React.FC<Props> = () => {
  const intl = useIntl();
  const userData = useSelector((state: AppState) => state.account.userData, shallowEqual);

  return (
    <Row
      style={{
        background: 'white',
        padding: '2px 4px',
        marginLeft: ASIDE_WIDTH,
        marginTop: -20
      }}
    >
      <Typography variant="body2" color="textSecondary">
        <FormattedMessage id="footer.license" />
      </Typography>
      <Divider
        orientation="vertical"
        style={{ minHeight: '16px', margin: '0 12px', backgroundColor: GREY_300 }}
      />
      <Typography variant="body2" color="textSecondary">
        <FormattedMessage id="footer.hotline" />
        :&nbsp;
        <FormattedMessage
          id={
            userData?.type === 'general_manager' &&
            (userData?.caInfo?.name === 'VuaNem' || userData?.caInfo?.name === 'HoangHa')
              ? 'footer.hotlineNumberCA'
              : 'footer.hotlineNumber'
          }
        />
      </Typography>
      <Divider
        orientation="vertical"
        style={{ minHeight: '16px', margin: '0 12px', backgroundColor: GREY_300 }}
      />
      <Typography variant="body2" color="textSecondary">
        <FormattedMessage id="footer.emailSupport" />
        :&nbsp;
        <a
          href={`mailto:${intl.formatMessage({
            id:
              userData?.type === 'general_manager' &&
              (userData?.caInfo?.name === 'VuaNem' || userData?.caInfo?.name === 'HoangHa')
                ? 'footer.emailCA'
                : 'footer.email',
          })}`}
          style={{ textDecoration: 'none', color: 'unset' }}
        >
          <FormattedMessage
            id={
              userData?.type === 'general_manager' &&
              (userData?.caInfo?.name === 'VuaNem' || userData?.caInfo?.name === 'HoangHa')
                ? 'footer.emailCA'
                : 'footer.email'
            }
          />
        </a>
      </Typography>

      <Divider
        orientation="vertical"
        style={{ minHeight: '16px', margin: '0 12px', backgroundColor: GREY_300 }}
      />
      <img src="../../../../../../svg/facebook.svg" style={{ margin: '0px 8px' }}></img>
      <img src="../../../../../../svg/google_plus.svg" style={{ margin: '0px 8px' }}></img>
    </Row>
  );
};

export default DefaultFooter;

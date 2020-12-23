import { Card, Typography } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { go } from 'connected-react-router';
import queryString from 'query-string';
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GREY_500, PRIMARY } from '../../configs/colors';
import { ROUTES_TAB } from '../../configs/routes';
import { some } from '../../constants';
import { Row } from '../../modules/common/components/elements';
import Link from '../../modules/common/components/Link';
import { isHasPermission } from '../../modules/common/redux/reducer';
import { AppState } from '../../redux/reducers';
import { getListRoutesContain } from '../utils';

interface Props {}

const DefaultBreadcrumbs: React.FC<Props> = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const history = useHistory();
  const { location } = history;
  const { pathname, search } = location;

  const state = location.state as { [key: string]: any };
  const queryParams = (queryString.parse(search) as unknown) as any;

  const isActive = React.useMemo(() => {
    return dispatch(isHasPermission(pathname));
  }, [dispatch, pathname]);

  const getList = React.useMemo(() => {
    return getListRoutesContain(ROUTES_TAB, pathname);
  }, [pathname]);

  const isBackAble = React.useCallback(
    (value: some): any => {
      return state && state[`${value.path}`];
    },
    [state],
  );

  const getTitle = React.useMemo(() => {
    const currentPath = getList[0];
    if (currentPath && (currentPath.title || currentPath.name)) {
      return currentPath.title || currentPath.name;
    }
    return null;
  }, [getList]);

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{getTitle && intl.formatMessage({ id: getTitle })}</title>
      </Helmet>
      <Card
        style={{
          boxShadow: '5px 5px 9px rgba(0, 0, 0, 0.05), -5px -5px 9px rgba(0, 0, 0, 0.05)',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 0,
        }}
      >
        <Typography variant="h5" style={{ marginRight: '24px' }}>
          {queryParams?.breadcrumbName ?? <FormattedMessage id={getTitle || ' '} />}
        </Typography>
        <img src="../../svg/ic_home.svg"></img>
        <FiberManualRecordIcon style={{ color: GREY_500, fontSize: 6, margin: '0 4px' }} />
        {getList.map((v: some, index: number) => (
          <Row key={index}>
            {index === getList.length - 1 ? (
              <Typography variant="caption" color="textSecondary">
                {queryParams?.breadcrumbName ?? (
                  <>{(v.title || v.name) && <FormattedMessage id={v.title || v.name} />}</>
                )}
              </Typography>
            ) : (
              <>
                {v.path || !v.isModule ? (
                  <>
                    {isBackAble(v) ? (
                      <>
                        <Typography
                          variant="caption"
                          style={{ color: PRIMARY, cursor: 'pointer' }}
                          onClick={() => dispatch(go(-v.backStep))}
                        >
                          {(v.title || v.name) && <FormattedMessage id={v.title || v.name} />}
                        </Typography>
                        <FiberManualRecordIcon
                          style={{ color: GREY_500, fontSize: 6, margin: '0 4px' }}
                        />
                      </>
                    ) : (
                      <>
                        <Link to={{ pathname: v.path, state: { ...state, [`${v.path}`]: true } }}>
                          <Typography variant="caption" style={{ color: PRIMARY }}>
                            {(v.title || v.name) && <FormattedMessage id={v.title || v.name} />}
                          </Typography>
                          <FiberManualRecordIcon
                            style={{ color: GREY_500, fontSize: 6, margin: '0 4px' }}
                          />
                        </Link>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Typography variant="caption" style={{ color: PRIMARY }}>
                      {(v.title || v.name) && <FormattedMessage id={v.title || v.name} />}
                    </Typography>
                    <FiberManualRecordIcon
                      style={{ color: GREY_500, fontSize: 6, margin: '0 4px' }}
                    />
                  </>
                )}
              </>
            )}
          </Row>
        ))}
      </Card>
    </>
  );
};

export default DefaultBreadcrumbs;

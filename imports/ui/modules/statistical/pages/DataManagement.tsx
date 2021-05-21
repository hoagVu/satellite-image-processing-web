import { useSnackbar } from 'notistack';
import querystring from 'query-string';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { dataFake } from '../components/dataTest';
import ManagementDataTable from '../components/ManagementDataTable';
import { DATA, isEmpty, some } from '/imports/ui/constants';
import { AppState } from '/imports/ui/redux/reducers';

interface IDataManagementProps {
  position: some;
  address: string;
  progress: number;
}

const DataManagement: React.FunctionComponent<IDataManagementProps> = (_props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [loading, setLoading] = React.useState(false);
  const [dataList, setDataList] = React.useState<some[]>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [filter, setFilter] = React.useState<some>({
    pageOffset: 0,
    pageSize: 20,
  });

  const fetchData = React.useCallback(
    async (resultFilter: some) => {
      try {
        const searchStr = querystring.stringify({
          pageOffset: resultFilter.pageOffset,
          pageSize: resultFilter.pageSize,
        });
        setLoading(true);
        // const res = await dispatch(
        //   actionsBookingManagement(
        //     searchStr,
        //     'post',
        //     JSON.stringify({
        //       hotelId: match?.params?.hotelId,
        //       bookingStatuses: !isEmpty(resultFilter?.status) ? resultFilter?.status : ['success'],
        //       bookingCode:
        //         !isEmpty(resultFilter?.textSearch) && resultFilter?.textSearch !== ' '
        //           ? resultFilter?.textSearch?.trim()
        //           : null,
        //       bookingFrom: resultFilter?.fromOrderDate,
        //       bookingTo: resultFilter?.toOrderDate,
        //       stayingFrom: resultFilter?.fromStayingDate,
        //       stayingTo: resultFilter?.toStayingDate,
        //     }),
        //   ),
        // );
        // if (res?.code === SUCCESS_CODE) {
        //   setDataList(res?.data);
        // } else {
        //   res?.message &&
        //     enqueueSnackbar(
        //       res?.message,
        //       snackbarSetting((key) => closeSnackbar(key), {
        //         color: 'error',
        //       }),
        //     );
        // }
        if (!isEmpty(JSON.parse(localStorage.getItem(DATA) || '{}'))) {
          setDataList(JSON.parse(localStorage.getItem(DATA) || '{}'));
        } else {
          setDataList(dataFake);
          localStorage.setItem(DATA, JSON.stringify(dataFake));
        }
        setLoading(false);
      } catch (error) {}
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  const handleDeleteData = React.useCallback(
    async (dataId: number) => {
      try {
        const temp: some = JSON.parse(localStorage.getItem(DATA) || '{}');
        localStorage.setItem(
          DATA,
          JSON.stringify(temp.filter((el: some, _idx: number) => el.id !== dataId)),
        );
        setDataList(temp.filter((el: some, _idx: number) => el.id !== dataId));
        return temp.filter((el: some, _idx: number) => el.id !== dataId);
      } catch (error) {}
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  React.useEffect(() => {
    fetchData(filter);
    // eslint-disable-next-line
  }, [filter]);
  console.log('dataList', dataList);
  return (
    <div style={{ overflow: 'auto' }}>
      <ManagementDataTable
        loading={loading}
        dataList={dataList}
        setFilter={setFilter}
        filter={filter}
        handleDeleteData={(value) => handleDeleteData(value)}
      />
    </div>
  );
};

export default DataManagement;

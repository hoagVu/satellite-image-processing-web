import { Paper } from '@material-ui/core';
import * as React from 'react';
import { PageContainer } from '../../../common/components/elements';
import Banner from '../../common/Banner';
import Footer from '../../common/Footer';
import { IRegisterData } from '../../redux/authThunks';
import RegisterForm from './RegisterForm';

export interface Props {
  loading: boolean;
  onRegister(data: IRegisterData): void;
}

const RegisterDesktop = (props: Props) => {
  const { loading, onRegister } = props;

  return (
    <PageContainer>
      <Paper
        elevation={6}
        style={{
          display: 'flex',
          borderRadius: '12px',
          flexDirection: 'row',
          height: 460,
        }}
      >
        <Banner isRegister />
        <RegisterForm loading={loading} onRegister={onRegister} />
      </Paper>
      <Footer />
    </PageContainer>
  );
};

export default RegisterDesktop;

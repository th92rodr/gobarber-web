import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AvatarInput } from './styles';

import { useAuth } from '../../hooks/auth';

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user } = useAuth();

  return (
    <Container>
      <header>
        <div>
          <Link to='/dashboard'>
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <button type='button'>
              <FiCamera />
            </button>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name='name' placeholder='Nome' icon={FiUser} />
          <Input name='email' placeholder='Email' icon={FiMail} />

          <Input
            name='old_password'
            type='password'
            placeholder='Senha atual'
            icon={FiLock}
          />
          <Input
            name='password'
            type='password'
            placeholder='Nova senha'
            icon={FiLock}
          />
          <Input
            name='password_confirmation'
            type='password'
            placeholder='Confirmar senha'
            icon={FiLock}
          />

          <Button type='submit'>Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;

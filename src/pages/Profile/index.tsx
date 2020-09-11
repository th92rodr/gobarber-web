import React, { useRef, useCallback, ChangeEvent } from 'react';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AvatarInput } from './styles';

import api from '../../services/apiClient';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const data = new FormData();

        data.append('avatar', event.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          });
        });
      }
    },
    [addToast, updateUser],
  );

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

            <label htmlFor='avatar'>
              <FiCamera />

              <input type='file' id='avatar' onChange={handleAvatarChange} />
            </label>
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

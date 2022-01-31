import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid, Box, Typography, TextField, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../services/Service';
import UserLogin from '../../models/UserLogin';
import './Login.css';
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/tokens/actions';
import { toast } from 'react-toastify';



function Login() {
    let history = useHistory();
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            usuario: '',
            senha: '',
            token: ''
        }
        )

        function updatedModel(e: ChangeEvent<HTMLInputElement>) {

            setUserLogin({
                ...userLogin,
                [e.target.name]: e.target.value
            })
        }

        useEffect(()=>{
            if (token !=''){
                dispatch(addToken(token));
                history.push('/home')
            }
        },[token])

        async function onSubmit(e: ChangeEvent<HTMLFormElement>){
            e.preventDefault();
            try{
               await login ('/usuarios/logar', userLogin, setToken)
                
                toast.success('Usuário logado com sucesso!', {
                    position: "top-right",
                    autoClose:2000,
                    hideProgressBar:false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme:"colored",
                    progress: undefined,
                })
            
            }catch(error){
                
                toast.error('Dados do usuário errado. Tente Novamente!', {
                    position: "top-right",
                    autoClose:2000,
                    hideProgressBar:false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme:"colored",
                    progress: undefined,
                })
            }

        }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" className='caixa2'>
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant= 'h3' gutterBottom color='textPrimary' component='h3' align='center'className='textos1'>Entrar</Typography>
                        <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='Usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField value={userLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='Senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <Box margin={2} textAlign='center'>
                            
                                <Button type='submit' variant='contained' color='default'>
                                    Entrar
                                </Button>
                            
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                         <Link to='/cadastrousuario'> 
                            <Typography  variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>
                         </Link>
                       
                    </Box>

                </Box>
            </Grid>
            <Grid item xs={6} >
                    <img src="https://miro.medium.com/max/7060/1*qVox5OIt8BuvTpo4NoynmQ.jpeg" alt="" width="900px" height="1000px" />
                </Grid>
        </Grid>
    </Grid>
    );
}

export default Login;

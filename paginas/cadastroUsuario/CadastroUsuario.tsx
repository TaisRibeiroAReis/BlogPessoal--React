/* eslint-disable eqeqeq */
import React ,{useState, useEffect, ChangeEvent}from 'react';
import {useHistory} from 'react-router-dom';
import User from '../../models/User';
import {cadastroUsuario} from '../../services/Service';
import { Grid, Box, Typography, Button, TextField } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import './CadastroUsuario.css';

function CadastroUsuario() {

    let history = useHistory();
    const [confirmarSenha,setConfirmarSenha] = useState<String>("")
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: ''
        })

    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: ''
        })

    useEffect(() => {
        if (userResult.id != 0) {
            history.push("/login")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userResult])


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(e.target.value)
    }


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if(confirmarSenha == user.senha){
        cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
        toast.success('Usuario cadastrado com sucesso', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
            });
        }else{
            toast.error('Dados inconsistentes. Favor verificar as informações de cadastro.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
                });
        }
    }  

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'className='caixa3'>
            <Grid item xs={12} className='imagem2'></Grid>
            <Grid item xs={12} alignItems='center'></Grid>
            <Box paddingX={10}>
                <form onSubmit={onSubmit} >
                    <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2' >Cadastrar</Typography>
                    <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedModel(e)} id='nome' label='Nome' variant='outlined' name='nome' margin='normal' fullWidth />
                    <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedModel(e)} id='usuario' label='Usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                    <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedModel(e)} id='senha' label='Senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                    <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>)=> confirmarSenhaHandle(e)} id='confirmarSenha' label='Confirmar Senha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                    <Box margin={2} textAlign='center'>
                          
                        <Link to='/login'className='text-decorator-none'>
                        <Button variant='contained' color='secondary' className='btnCancelar'>
                                Cancelar
                            </Button>
                        </Link>
                        <Link to='/home' className='text-decorator-none' >
                            <Button type='submit' variant='contained' color='default'>
                                Confirmar
                            </Button>
                        </Link> 
                    </Box>
                </form>
            </Box>
            
        </Grid>
        
    );
}
export default CadastroUsuario;
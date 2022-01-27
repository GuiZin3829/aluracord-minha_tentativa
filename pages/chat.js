import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4NTAwNSwiZXhwIjoxOTU4ODYxMDA1fQ.61C0vCF2V75XvN_W90CiA3nXXBavMTtcNfyCUMXMgI0'
const SUPABASE_URL = 'https://hkaptqusamkbxcooqnsh.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default function ChatPage() {

    if( typeof document != 'undefined' )  {
        const urlparametros = new URLSearchParams(document.location.search)
        var oUsuario = urlparametros.get('username');
    } else {
        var oUsuario = "GuiZin3829"
    }

    const [mensagem, setMensagem] = React.useState('')
    const [listaDeMensagem, setListaDeMensagem] = React.useState([])
    const [opacidade, setOpacity] = React.useState("0")
    // Usuário
    /*
    - usuario digita no campo textArea
    - aperta enter para enviar
    - tem que adicionar o texto na listagem
    */

    // Dev
    /* 
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter para limpar a variavel)
    - [X] lista de mensagem
    */

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log('Dados da Consulta: ', data)
                setListaDeMensagem(data)
            });
    }, []);
    


    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            //id: listaDeMensagem.length + 1,
            de: oUsuario,
            texto: novaMensagem
        }

        supabaseClient
            .from('mensagens')
            .insert([
                // tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando mensagem: ', data)
                setListaDeMensagem([
                    data[0],
                    ...listaDeMensagem,
                ])
            })

        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://free4kwallpapers.com/uploads/originals/2017/01/09/dark-souls-castle-wallpaper.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Button 
                type="button" 
                label="🤠"
                styleSheet={{
                    width: '50px'
                }}
                colorVariant="dark"
                onClick={() => handleNovaMensagem("🤠") }
                />
                <Button 
                type="button" 
                label="👌"
                styleSheet={{
                    width: '50px',
                    marginLeft: '60px',
                    marginTop: '-36px'
                }}
                colorVariant="dark"
                onClick={() => handleNovaMensagem("👌") }
                />
                <Button 
                type="button" 
                label="⚔️"
                styleSheet={{
                    width: '50px',
                    marginLeft: '120px',
                    marginTop: '-37px'
                }}
                colorVariant="dark"
                onClick={() => handleNovaMensagem("⚔️") }
                />
                <Button 
                type="button" 
                label="🎮"
                styleSheet={{
                    width: '50px',
                    marginLeft: '180px',
                    marginTop: '-37px'
                }}
                colorVariant="dark"
                onClick={() => handleNovaMensagem("🎮") }
                />
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <Text 
                    variant="body3"
                    styleSheet={{
                        backgroundColor: 'rgba(0,0,0,.9)',
                        width: '250px',
                        padding: '10px',
                        opacity: opacidade,
                        transition: 'opacity 1s'
                    }}

                    >
                        Carregando as Mensagens
                    </Text>

                    <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
                    styleSheet={{
                        width: '35px',
                        marginLeft: '200px',
                        marginTop: '-35px',
                        opacity: opacidade
                    }}
                    />

                    <MessageList mensagens={listaDeMensagem} setListaDeMensagem={setListaDeMensagem}/>
                    {/*{listaDeMensagem.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })}*/}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);

                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                    setOpacity("0.8")
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button 
                        type="button" 
                        label="Enviar" 
                        onClick={() => handleNovaMensagem(mensagem) }
                        colorVariant="dark"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    ) 
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    async function handleDeleteMessage(mensagemId){
        let novaLista = props.mensagens.filter((message)=>{
            if(message.id != mensagemId){
                return message
            }
        })

        props.setListaDeMensagem([
            ...novaLista
        ])

        const { data, error } = await supabaseClient
            .from('mensagens')
            .delete()
            .match({ id: mensagemId })
    }

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >   
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>

                            <Button
                            type="button"
                            label="Apagar"
                            styleSheet={{width: '50px', height: '20px', marginLeft: '10px'}}
                            onClick={() => handleDeleteMessage(mensagem.id)}
                            
                            />
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto}
                    </Text>
                )
            })}

        </Box>
    )
}
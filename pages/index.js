import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import React from 'react';
import { useRouter } from 'next/router'
import appConfig from '../config.json';

function Titulo(argumento) {
    console.log(argumento.children);
    const Tag = argumento.tag || 'h1';
    return (
        <>
            <Tag>{argumento.children}</Tag>
            <style jsx>{`
        ${Tag} {
            color: ${appConfig.theme.colors.neutrals['000']};
            font-size: 24px;
            font-weight: 600;
        }
        `}</style>
        </>
    );
}

// componente react
//function HomePage() {
//    // JSX
//    return (
//        <div>
//            <GlobalStyle/>
//            <Titulo tag="h2">Boas vindas de volta!</Titulo>
//            <h2>Discord - Alura Matrix</h2>
//        </div>
//    )
//}
//export default HomePage

export default function PaginaInicial() {
    //const username = 'GuiZin3829';
    const [username, setUsername]= React.useState('GuiZin3829');
    const roteamento = useRouter();
    const image = "https://avatars.githubusercontent.com/u/97804430?v=4"

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: 'url(https://free4kwallpapers.com/uploads/originals/2017/01/09/dark-souls-castle-wallpaper.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infosDoEvento){
                            infosDoEvento.preventDefault();
                            console.log('Alguém submeteu o form');
                            //window.location.href = '/chat';
                            roteamento.push('/chat');
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Seja muito bem vindo de volta novamente! 👌🏼</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        {/*<input 
                            type="text"
                            value={username}
                            onChange={function handler(event){
                                console.log('usuario digitou', event.target.value)
                                // onde ta o valor?
                                const valor = event.target.value;
                                // trocar o valor da variavel
                                // através do React e avise quem precise
                                setUsername(valor);
                            }}
                        />*/}
                        <TextField
                            required
                            placeholder="Informe seu usuário do GitHub"
                            value={username}
                            onChange={function handler(event){
                                // onde ta o valor?
                                const valor = event.target.value;
                                // trocar o valor da variavel
                                // através do React e avise quem precise
                                setUsername(valor);
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entra aí'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={
                                username.length > 2
                                ? `https://github.com/${username}.png`
                                : image
                            }
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username.length > 2 ? username : ""}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}
# 90Min - Aplicativo de Chat ao Vivo para Partidas de Futebol

## 📱 Sobre o Projeto

O **90Min** é um aplicativo mobile desenvolvido para acompanhar partidas de futebol em tempo real através de um chat interativo. O aplicativo permite que os usuários:

- Visualizem jogos da Série A do Brasil
- Escaneiem QR Codes para acessar chats de partidas específicas
- Participem de chats ao vivo durante os eventos
- Acompanhem eventos com cronômetro de início
- Gerenciem seu perfil e histórico de eventos

O projeto é desenvolvido com **React Native** usando **Expo** para o frontend mobile e **Next.js** para o backend que fornece dados dos jogos.

## 🛠️ Tecnologias Utilizadas

### Frontend Mobile
- **React Native** (0.81.4)
- **Expo** (~54.0.12)
- **Expo Router** (~6.0.10) - Roteamento baseado em arquivos
- **Firebase** (^12.5.0) - Autenticação e banco de dados
- **Expo Barcode Scanner** (^13.0.1) - Leitura de QR Codes
- **React Navigation** - Navegação entre telas
- **TypeScript** - Tipagem estática

### Backend
- **Next.js** (16.0.3)
- **React** (19.2.0)
- **TypeScript**
- **Tailwind CSS** (^4)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (instalado globalmente ou via npx)
- **Git**

Para desenvolvimento mobile, você também precisará de:
- **Expo Go** (app no celular) ou
- **Android Studio** (para emulador Android) ou
- **Xcode** (para simulador iOS - apenas macOS)

## 🚀 Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/vitorrosa0/90Min-Desenvolvimento-Movel.git
cd 90Min-Desenvolvimento-Movel
```

### 2. Instale as dependências do frontend

Navegue até a pasta `90min` e instale as dependências:

```bash
cd 90min
npm install
```

### 3. Configure o Firebase (se necessário)

Certifique-se de que o arquivo de configuração do Firebase está configurado corretamente em `90min/scripts/databases/firebase.js`.

### 4. Inicie o backend

Em um terminal, navegue até a pasta `backend` dentro de `90min` e inicie o servidor:

```bash
cd backend
npm install
npm run dev
```

O backend estará rodando em `http://localhost:3000`.

### 5. Inicie o aplicativo mobile

Em outro terminal, certifique-se de estar na pasta `90min` e execute:

```bash
npm start
```

Ou use os comandos específicos:

```bash
# Para Android
npm run android

# Para iOS
npm run ios

# Para Web
npm run web
```

### 6. Acesse o aplicativo

- **Expo Go**: Escaneie o QR Code exibido no terminal com o app Expo Go no seu celular
- **Emulador/Simulador**: O app abrirá automaticamente no emulador configurado
- **Web**: Acesse a URL exibida no terminal

## 📁 Estrutura do Projeto

```
90Min-Desenvolvimento-Movel/
├── 90min/                    # Aplicativo mobile principal
│   ├── app/                  # Telas e rotas (Expo Router)
│   │   ├── (tabs)/          # Telas com navegação por abas
│   │   │   ├── home.tsx     # Tela inicial com lista de jogos
│   │   │   ├── aovivo.tsx   # Chat ao vivo durante partidas
│   │   │   ├── cronometro/  # Cronômetro de início de eventos
│   │   │   └── perfil.tsx   # Perfil do usuário
│   │   ├── login.tsx        # Tela de login
│   │   ├── cadastro.tsx     # Tela de cadastro
│   │   └── scan.tsx         # Scanner de QR Code
│   ├── backend/             # Backend Next.js
│   │   ├── app/
│   │   │   └── api/
│   │   │       └── jogos/   # API de jogos
│   │   └── package.json
│   ├── components/          # Componentes reutilizáveis
│   ├── scripts/             # Scripts e utilitários
│   │   ├── databases/       # Configuração Firebase
│   │   └── utils/           # Funções utilitárias
│   └── package.json
└── README.md
```

## 🔧 Scripts Disponíveis

### Frontend (dentro da pasta `90min`)

- `npm start` - Inicia o servidor de desenvolvimento Expo
- `npm run android` - Inicia no emulador Android
- `npm run ios` - Inicia no simulador iOS
- `npm run web` - Inicia na versão web
- `npm run lint` - Executa o linter

### Backend (dentro da pasta `90min/backend`)

- `npm run dev` - Inicia o servidor de desenvolvimento Next.js
- `npm run build` - Cria build de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 📝 Funcionalidades Principais

- ✅ Listagem de jogos da Série A do Brasil
- ✅ Scanner de QR Code para acesso rápido a partidas
- ✅ Chat ao vivo durante eventos
- ✅ Cronômetro de início de eventos
- ✅ Autenticação de usuários com Firebase
- ✅ Perfil de usuário personalizável
- ✅ Histórico de eventos recentes

**Nota**: Certifique-se de que o backend está rodando antes de iniciar o aplicativo mobile, pois o app depende da API para buscar os dados dos jogos.

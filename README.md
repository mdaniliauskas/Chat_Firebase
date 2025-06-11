# Acessibilidade Dev - Chat Firebase ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)

> **TCC - Trabalho de Conclusão de Graduação | FATEC**  
> Sistema de chat em tempo real para discussões sobre acessibilidade digital. Implementação com Firebase Realtime Database, permitindo comunicação instantânea e inclusiva para a comunidade PcD.

[![Organização](https://img.shields.io/badge/Organização-GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/acessibilidadedev)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://acessibilidade-dev-front-end.vercel.app/)
[![Backend](https://img.shields.io/badge/Backend-Heroku-430098?style=flat-square&logo=heroku&logoColor=white)](https://acessibilidade-dev-back-end.herokuapp.com)

## 🚀 Sobre o Projeto

### 🎯 **Comunicação Inclusiva**
Este módulo representa a **terceira camada** do ecossistema Acessibilidade Dev, focado em **comunicação em tempo real** para discussões sobre acessibilidade digital. Desenvolvido como parte do **TCC na FATEC**, demonstra implementação de **real-time communication** com **Firebase** em ambiente de produção.

### 💡 **Inovação em Tempo Real**
- **⚡ Comunicação Instantânea**: Chat em tempo real para discussões urgentes
- **🏠 Salas Temáticas**: Ambientes organizados por tópicos específicos
- **♿ Inclusão Digital**: Interface acessível para pessoas com deficiência
- **🤝 Moderação Inteligente**: Sistema de controle de salas
- **📱 Cross-Platform**: Funciona em todos os dispositivos

### 🌟 **Funcionalidades Principais**
- **💬 Chat Tempo Real**: Mensagens instantâneas com Firebase
- **🏠 Gestão de Salas**: Criar, entrar e moderar discussões
- **👥 Controle de Membros**: Sistema de entrada/saída de usuários
- **🔒 Salas Privadas**: Discussões controladas e fechadas
- **📝 Markdown Support**: Formatação rica nas mensagens
- **🔔 Notificações**: Sistema de alertas em tempo real

## 🛠️ Stack Tecnológica

### ⚛️ **Frontend Core**
![React](https://img.shields.io/badge/React%2018-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite%204-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript%20ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

### 🔥 **Real-time & Database**
![Firebase](https://img.shields.io/badge/Firebase%20Realtime-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Firestore](https://img.shields.io/badge/Cloud%20Firestore-FFCA28?style=flat-square&logo=firebase&logoColor=black)

### 🎨 **UI/UX**
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat-square&logo=chakra-ui&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![React Icons](https://img.shields.io/badge/React%20Icons-E10051?style=flat-square&logo=react&logoColor=white)

### 🔐 **Integração & Auth**
![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=flat-square&logo=auth0&logoColor=white)
![CORS](https://img.shields.io/badge/CORS-Enabled-4CAF50?style=flat-square)

## 🏗️ Arquitetura do Chat

### 🔄 **Fluxo de Dados Real-time**
```javascript
// Estrutura do Firebase Realtime Database
{
  chats: {
    chatId: {
      title: "Nome da Sala",
      description: "Descrição da discussão",
      createdBy: "usuario@example.com",
      createdAt: timestamp,
      isOpen: true,
      members: 5
    }
  },
  messages: {
    chatId: {
      messageId: {
        author: "username",
        message: "Conteúdo da mensagem",
        createdAt: timestamp
      }
    }
  }
}
```

### 🚀 **Serviços Core**
```javascript
// chat.service.jsx - Principais operações
export const writeData = (payload) => {
  return push(ref(database, payload.path), payload.data);
};

export const updateData = (updates) => {
  return update(ref(database), updates);
};

export const getListChats = (callback, options = {}) => {
  const chatsRef = ref(database, 'chats');
  return onValue(chatsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data ? Object.keys(data).map(key => ({ key, ...data[key] })) : []);
  });
};
```

## 🚀 Funcionalidades Avançadas

### 💬 **Chat em Tempo Real**
```javascript
// Implementação de mensagens instantâneas
const handleSendMessage = async () => {
  const payload = {
    path: `messages/${chatId}`,
    data: {
      author: user.nickname,
      message: message.split("\n").join("<br>"),
      createdAt: serverTimestamp(),
    },
  };
  
  try {
    await writeData(payload);
    setMessage("");
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
  }
};
```

### 🏠 **Gestão de Salas**
```javascript
// Sistema de criação e gerenciamento de salas
const createChat = async (chatData) => {
  const chatId = push(child(ref(db), 'chats')).key;
  const chatRef = ref(db, `chats/${chatId}`);
  
  await set(chatRef, {
    title: chatData.title,
    description: chatData.description,
    createdBy: user.email,
    createdAt: serverTimestamp(),
    isOpen: true,
    members: 1
  });
};
```

### 👥 **Controle de Membros**
```javascript
// Sistema de entrada e saída de usuários
export const registerMember = async (chatId, userId) => {
  const memberPath = `chats/${chatId}/members/${userId}`;
  await set(ref(db, memberPath), {
    joinedAt: serverTimestamp(),
    isActive: true
  });
};

export const unregisterMember = async (chatId, userId) => {
  const memberPath = `chats/${chatId}/members/${userId}`;
  await remove(ref(db, memberPath));
};
```

## ⚙️ Como executar

### Pré-requisitos
- Node.js 18+ e npm/yarn
- Projeto Firebase configurado
- Conta Firebase com Realtime Database habilitado

### Instalação e execução
```bash
# Clonar o repositório
git clone https://github.com/mdaniliauskas/Chat_Firebase.git
cd Chat_Firebase

# Instalar dependências
npm install

# Configurar Firebase
# Editar src/service/chat.service.jsx com suas credenciais

# Iniciar servidor de desenvolvimento
npm run dev

# Aplicação rodando em http://localhost:5173
```

### 🔧 **Configuração Firebase**
```javascript
// src/service/chat.service.jsx
const CONFIG = {
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
};

const app = initializeApp(CONFIG);
const db = getDatabase(app);
```

## 🌟 Recursos Técnicos

### ⚡ **Performance Real-time**
- **WebSocket nativo**: Conexão persistent com Firebase
- **Throttling inteligente**: Controle de frequência de mensagens
- **Offline support**: Sincronização quando volta online
- **Lazy loading**: Carregamento otimizado de mensagens antigas

### 🛡️ **Segurança & Validação**
- **Sanitização HTML**: Prevenção de XSS em mensagens
- **Rate limiting**: Controle de spam e flood
- **Moderação automática**: Filtros de conteúdo
- **Autenticação segura**: Integração com Auth0

### 📱 **Responsividade**
- **Mobile-first**: Design otimizado para dispositivos móveis
- **Touch gestures**: Interações naturais em mobile
- **Viewport adaptativo**: Interface que se adapta ao tamanho da tela
- **PWA ready**: Preparado para Progressive Web App

## 🧪 Funcionalidades de Desenvolvimento

### 🔍 **Real-time Debugging**
```javascript
// Monitoramento de conexão
db.ref('.info/connected').on('value', (snapshot) => {
  if (snapshot.val() === true) {
    console.log('Conectado ao Firebase');
  } else {
    console.log('Desconectado do Firebase');
  }
});
```

### 📊 **Analytics de Uso**
- **Tempo de sessão**: Tracking de permanência em salas
- **Engajamento**: Métricas de participação
- **Performance**: Monitoramento de latência
- **Erros**: Logging de problemas em tempo real

## 👥 Equipe de Desenvolvimento

### 🎓 **TCC FATEC - Análise e Desenvolvimento de Sistemas**

| Desenvolvedor | GitHub |
|--------------|--------|
| **Marcelo Daniliauskas** | [@mdaniliauskas](https://github.com/mdaniliauskas) |
| **Arthur Nascimento** | [@Arthur-cmd256](https://github.com/Arthur-cmd256) |
| **Luan Teixeira** | [@luanLTS](https://github.com/luanLTS) |
| **Ranayna Alves de Oliveira** | [@Ranayna](https://github.com/Ranayna) |
| **Weslley Rodrigues** | [@weslleyrods](https://github.com/weslleyrods) |

> **🏆 Implementação exemplar de comunicação real-time**  
> **⚡ Performance otimizada para escala**  
> **♿ Interface 100% acessível para chat**

## 🔗 Ecossistema do Projeto

### 🌐 **Repositórios Relacionados**
- **Frontend Principal**: [acessibilidade-dev-front-end](https://github.com/mdaniliauskas/acessibilidade-dev-front-end)
- **Backend API**: [acessibilidade-dev-back-end](https://github.com/mdaniliauskas/acessibilidade-dev-back-end)
- **Organização**: [acessibilidadedev](https://github.com/acessibilidadedev)

### 🚀 **Integração no Ecossistema**
- **🔗 API REST**: Sincronização com backend principal
- **👤 Auth0**: Sistema unificado de autenticação
- **📱 Frontend**: Integração seamless com interface principal
- **📊 Analytics**: Métricas compartilhadas do projeto

## 📚 Contexto Acadêmico

### 🎯 **Objetivos de Aprendizado**
- **Real-time systems**: Implementação de comunicação bidirecional
- **Firebase mastery**: Domínio de NoSQL e real-time database
- **React hooks**: Uso avançado de useState, useEffect, useRef
- **Performance optimization**: Técnicas de otimização para chat
- **Accessibility**: Implementação de chat inclusivo

### 📋 **Metodologia Aplicada**
- **WebSocket communication**: Protocolo de comunicação real-time
- **NoSQL design**: Modelagem otimizada para Firebase
- **Component composition**: Arquitetura modular de componentes
- **State management**: Gerenciamento eficiente de estado do chat
- **Error boundaries**: Tratamento robusto de erros

## 📄 Status & Evolução

> ✅ **Chat Funcional em Produção**  
> ⚡ **Performance Real-time Otimizada**  
> 🔒 **Sistema Seguro e Moderado**  
> ♿ **Interface Totalmente Acessível**

### 🚀 **Próximas Funcionalidades**
- **🎥 Video calls**: Integração com WebRTC
- **📎 File sharing**: Upload de arquivos no chat
- **🤖 Bot integration**: Moderação automatizada
- **📊 Analytics dashboard**: Métricas detalhadas de uso

---

<p align="center">
  <strong>🎓 FATEC - Tecnólogo em Análise e Desenvolvimento de Sistemas</strong><br>
  <em>Comunicação em tempo real a serviço da inclusão</em>
</p>

<p align="center">
  <a href="https://github.com/mdaniliauskas">
    <img src="https://img.shields.io/badge/Portfólio%20GitHub-100000?style=flat-square&logo=github&logoColor=white" alt="Portfólio GitHub">
  </a>
  <a href="mailto:marcelo.daniliauskas@gmail.com">
    <img src="https://img.shields.io/badge/E--mail-D14836?style=flat-square&logo=gmail&logoColor=white" alt="E-mail">
  </a>
  <a href="https://www.linkedin.com/in/mdaniliauskas">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
</p>

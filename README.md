# To-Do - Gerenciador de Tarefas com Pomodoro

Aplicação web para gerenciamento de tarefas com suporte à técnica Pomodoro, desenvolvida com Next.js, React, TypeScript, Tailwind CSS e shadcn/ui.

## 🚀 Tecnologias

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática completa
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes acessíveis e customizáveis
- **Lucide React** - Ícones de alta qualidade
- **Sonner** - Notificações toast
- **Axios** - Cliente HTTP
- **localStorage** - Armazenamento local de dados

## 📋 Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm

## 🛠️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/devhenrico/to-do.git
cd todo-app
```

2. Instale as dependências:

```bash
pnpm install
# ou
npm install
```

3. Execute o servidor de desenvolvimento:

```bash
pnpm dev
# ou
npm run dev
```

4. Acesse `http://localhost:3000` no navegador

## 🔄 Modo Offline vs Online

A aplicação suporta dois modos de funcionamento:

### Modo Offline (Padrão)
- ✅ Usa `localStorage` para armazenar dados
- ✅ Não requer backend
- ✅ Perfeito para desenvolvimento e testes
- ✅ Dados persistem na sessão do navegador

**Para ativar:** Deixe `USE_OFFLINE_MODE = true` em `lib/config.ts`

### Modo Online (Com Backend)
- 🔄 Conecta a uma API REST
- 💾 Sincroniza com servidor
- 🔐 Autenticação JWT via Sanctum

**Para ativar:** Mude `USE_OFFLINE_MODE = false` em `lib/config.ts`

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── login/              # Página de login
│   ├── register/           # Página de registro
│   ├── tasks/              # Página principal de tarefas
│   ├── layout.tsx          # Layout raiz
│   └── globals.css         # Estilos globais
├── components/
│   ├── ui/                 # Componentes shadcn/ui
│   ├── Auth/
│   │   ├── AuthCard.tsx
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── EmailInput.tsx
│   │   ├── PasswordInput.tsx
│   │   ├── NameInput.tsx
│   │   └── AuthFormFooter.tsx
│   ├── Task/
│   │   ├── TaskCard.tsx    # Card individual de tarefa
│   │   ├── TaskHeader.tsx  # Header com dados do usuário
│   │   ├── TaskMain.tsx    # Conteúdo principal
│   │   └── TaskDialog.tsx  # Modal criar/editar tarefa
│   ├── SubmitButton.tsx    # Botão de submissão reutilizável
│   └── PasswordVisibilityToggle.tsx
├── contexts/
│   └── AuthContext.tsx     # Contexto de autenticação global
├── lib/
│   ├── api.ts              # Configuração do Axios
│   ├── auth.ts             # Serviços de autenticação
│   ├── tasks.ts            # Tipos e interfaces
│   ├── config.ts           # Configurações da app
│   └── utils.ts            # Funções utilitárias
└── public/                 # Arquivos estáticos
```

## 🔐 Autenticação

- Login com email e senha
- Registro de novos usuários
- Token armazenado em `localStorage`
- Contexto global `AuthContext` para gerenciar estado
- Redirecionamento automático para login se não autenticado

## 📝 Funcionalidades

### ✅ Tarefas
- Criar novas tarefas
- Editar tarefas existentes
- Deletar tarefas
- Alterar status (Pendente → Em Progresso → Concluída → Cancelada)
- Visualizar pomodoros completados vs total
- Definir duração do pomodoro (em minutos)
- Data da tarefa
- Data de vencimento
- Descrição detalhada

### 🎨 Interface
- Design minimalista e clean
- Ícones Lucide React
- Notificações com Sonner (sucesso, erro, info)
- Header flutuante sticky
- Responsivo (mobile, tablet, desktop)
- Rounded corners (xl e full)
- Cores de status: Verde (concluída), Azul (em progresso), Amarelo (pendente), Vermelho (cancelada)

### 🔧 Componentes Reutilizáveis
- **EmailInput** - Input de email com ícone Mail
- **PasswordInput** - Input de senha com toggle Eye/EyeOff
- **NameInput** - Input de nome com ícone UserRound
- **AuthFormFooter** - Footer de formulários de autenticação
- **SubmitButton** - Botão com ícone ArrowRight
- **AuthCard** - Card genérico para formulários auth
- **PasswordVisibilityToggle** - Toggle de visibilidade de senha
- **TaskCard** - Card individual de tarefa
- **TaskHeader** - Header da página de tarefas
- **TaskMain** - Conteúdo principal da página

## 📝 Notas de Desenvolvimento

- Componentes com props bem definidas
- Separação de concerns (UI, lógica, dados)
- Eventos customizados para comunicação entre componentes
- localStorage como fallback para API
- ESLint configurado para qualidade de código

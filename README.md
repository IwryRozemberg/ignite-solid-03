# App 
GymPass style app

## Requisitos funcionais
  [x] Deve ser possível se cadastrar;
  [x] Deve ser possível se autenticar;
  [x] Deve ser possível obter o perfil de um usuário logado;
  [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
  [ ] Deve ser possível o usuário obter seu histórico de check-ins;
  [ ] Deve ser possível o usuário buscar academias próximas;
  [ ] Deve ser possível o usuário buscar academias pelo nome;
  [ ] Deve ser possível o usuário realizar check-in em uma academia;
  [x] Deve ser possível validar o check-in de um usuário;
  [ ] Deve ser possível cadastrar uma academia;
  
## Regras de negócios

  [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
  [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
  [ ] O usuário não pode fazer check-in se não estiver a menos de 100m da academia;
  [ ] O check-in só pode ser validado no máximo até 20 minutos após criado;
  [ ] O check-in só pode ser validado por administradores;
  [ ] A academia só pode ser cadastrada por administradores; 

## Requisitos não funcionais
  [x] A senha do usuário precisa estar criptografada;
  [x] Os dados da aplicação precisam estar persistidos em um banco de dados PostgreSQL;
  [ ] Todas as listas de dados precisam estar paginas em 20 itens por página;
  [ ] O usuário deve ser identificado por um JWT;

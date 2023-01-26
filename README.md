# projeto13-mywallet-back
Backend, conectado ao front: https://github.com/Daivison-Morais/projeto13-mywallet-front

## Para rodar:

3-Será necessário intalar via terminal o mongoDB (no Ubunto):
    Rode esses comandos:
    
#### `wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -`

#### ` echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list `       

#### ` sudo apt-get update ` 

#### ` sudo apt-get install -y mongodb-org ` 

#### ` mkdir ~/.mongo ` 

se o primeiro falhar, rode:

#### ` sudo apt-get install gnupg wget  `

ja esta instalado! basta rodar e deixar-lo aberto:

#### ` mongod --dbpath ~/.mongo ` 

E agora podemos conectar ao servidor usando o próprio mongo:

#### ` mongo ` 

 Por fim, rode:
#### `node index.js ` 

        
        
        
        
        
        
    
    
      
        
     
    
        
        
    
    
        
        
   
        
    
    

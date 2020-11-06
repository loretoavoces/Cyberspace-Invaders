
const game = {
  name: 'Space Invaders',
  description: 'Canvas app for basic shapes drawing',
  version: '1.0.0',
  license: undefined,
  author: 'Loreto y Sara',
  canvasTag: undefined,
  ctx: undefined,
  framesCounter: 0,
  player: undefined,
  enemies: [[],[],[]],
  bulletsEnemies: [],
  score: 0,   
  enemiesLastPos: {
    x: undefined,
    y: undefined,
  },
  keys: {
    left: "ArrowLeft",
    right: "ArrowRight",
    space: ' '
  },
  canvasSize: {
    w: undefined,
    h: undefined
  },
      
  init(id) {
    this.canvasTag = document.getElementById(id)
    this.ctx = this.canvasTag.getContext('2d')
    this.setDimensions()
    this.createPlayer()
    this.createEnemies()    
    this.drawAll()
    this.setEventListeners()
  
  },

  setDimensions() {
    this.canvasSize.w = 700
    this.canvasSize.h = 900
    this.canvasTag.setAttribute('width', this.canvasSize.w)
    this.canvasTag.setAttribute('height', this.canvasSize.h)
  },

 /* --------> PLAYER <-------- */
       
  createPlayer() {
    this.player = new Player(this.ctx, 320, 700, 80, 180, 'images/player 2.png', this.canvasSize, this.playerSpeed) 
    
  },

/* --------> ENEMIES <-------- */

  createEnemies() {
    for (let i = 0; i < 3; i++) {
      for (let k = 0; k < 7; k++) {
        this.enemies[i][k] = new Enemies(this.ctx, k * 85 + 20, i * 85 + 20, 80, 60, this.enemiesImage, 8);             
      }
    }
  }, 
  
   drawEnemies() {
      for (let i = 0; i < this.enemies.length; i++) {
       for (let k = 0; k < this.enemies[i].length; k++) {
        this.enemies[i][k].drawEnemies();    
     }    
    }
  },
  
  moveEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      for (let k = 0; k < this.enemies[i].length; k++) {
        this.enemies[i][k].moveEnemies()             
      }
    }  
  },

  moveEnemiesLeft() {
     for (let i = 0; i < this.enemies.length; i++) {
      for (let k = 0; k < this.enemies[i].length; k++) {
        this.enemies[i][k].changeDirectionLeft()             
      }
    }     
  },

  moveEnemiesRight() {
      for (let i = 0; i < this.enemies.length; i++) {
       for (let k = 0; k < this.enemies[i].length; k++) {
         this.enemies[i][k].changeDirectionRight()             
      }
    } 
  },

  detectLimits() {        
   
    let [rightLimit] = this.enemies.map(enemyArr => {
      let [arrLimit] = enemyArr.sort((a, b) => b.enemiesPos.x - a.enemiesPos.x).slice(0, 1)
      return arrLimit
    }).sort((a, b) => b.enemiesPos.x - a.enemiesPos.x).slice(0, 1)

    let [leftLimit] = this.enemies.map(enemyArr => {
      let [arrLimit] = enemyArr.sort((a, b) => a.enemiesPos.x - b.enemiesPos.x).slice(0, 1)
      return arrLimit
    }).sort((a, b) => a.enemiesPos.x - b.enemiesPos.x).slice(0, 1)
    

    if (rightLimit.enemiesPos.x >= this.canvasSize.w - rightLimit.enemiesSize.w) {
      this.moveEnemiesLeft()
    }    
    
    if (leftLimit.enemiesPos.x <= 0) {      
      this.moveEnemiesRight()  
    }  
  }, 

 /* -------> COLLISION <------- */
    
  enemiesCollision() {   
    return this.enemies.some(enemyArr => { 
      return enemyArr.some(obs => {
        return (
        this.player.playerPos.y + this.player.playerSize.h > obs.enemiesPos.y &&
        this.player.playerPos.y < obs.enemiesPos.y + obs.enemiesSize.h
       );
     })  
    });
  }, 

  bulletsCollisionEnemies() {
    return this.player.bullets.some((bullet) => {
       this.enemies.forEach((enemyArr, arrIndex) => {
        return enemyArr.some((enemy, enemiesIndex) => {
          if (enemy.enemiesPos.y + enemy.enemiesSize.h > bullet.bulletsPosY &&
         enemy.enemiesPos.y < bullet.bulletsPosY + bullet.bulletsSize.h && 
         enemy.enemiesPos.x + enemy.enemiesSize.w > bullet.bulletsPosX  &&
         enemy.enemiesPos.x < bullet.bulletsPosX + bullet.bulletsSize.w) {
         //console.log(enemiesIndex)
         
         this.enemies[arrIndex].splice(enemiesIndex, 1) 
           this.player.bullets.shift()
           this.score += 5
           document.getElementById('score').innerHTML = this.score                  
        }      

        })              
      })
    })
  },  
  
  
  /* --------> OTHER <-------- */
  
  setEventListeners() {
    document.onkeydown = e => {
      e.key === this.keys.left ? this.player.movePlayer("ArrowLeft") : null
      e.key === this.keys.right ? this.player.movePlayer("ArrowRight") : null
      e.key === this.keys.space ? this.player.shoot(' ') : null      
    }
  },

  drawAll() {    
    this.interval = setInterval(() => { 
      this.clearScreen()  
      this.player.drawPlayer()    
      this.drawEnemies()
      this.moveEnemies()
      this.detectLimits()     
      this.enemiesCollision() ? this.gameOver() : null
      this.bulletsCollisionEnemies()  
      
  
    }, 70)     
  },

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
  },  

  gameOver() {    
    clearInterval(this.interval) 
    document.querySelector(".canvas-container").classList.add("hide")
    document.querySelector(".gameover").classList.remove("hide")
    document.querySelector(".score-container").classList.remove("hide")
    document.getElementById('background').pause()
  },  

 
}







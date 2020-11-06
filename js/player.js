class Player {
    constructor(ctx, posX, posY, playerWidth, playerHeight, playerImage, canvasSize, playerSpeed, bulletsPosY, bulletsHeight) {
        this.ctx = ctx        
        this.playerPos = {
            x: posX,
            y: posY
        }        
        this.playerSize = {
            w: playerWidth,
            h: playerHeight
        }
        this.imageName = playerImage
        this.playerInstance = undefined
        this.canvasSize = {
          w: canvasSize.w,
          h: canvasSize.h
        }         
        
        this.bullets = []          
        
        this.speed = playerSpeed

        this.init()
    }

    init() {
        this.playerInstance = new Image()
        this.playerInstance.src = 'images/player2.png'        
    }

    drawPlayer() {         
        this.ctx.drawImage(this.playerInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        this.clearBullets()
        this.bullets.forEach(bullets => bullets.drawBullets())
    }       

    movePlayer(dir) {
        dir === 'ArrowLeft' ? this.playerPos.x -= 20 : null
        dir === 'ArrowRight' ? this.playerPos.x += 20 : null
                
        if (this.playerPos.x < 0) {
          this.stopMovementLeft()
        } else if (this.playerPos.x >= this.canvasSize.w - this.playerSize.w) {
          this.stopMovementRight()
        } else {
          return null 
        }
    }    
   
    stopMovementLeft() {
        return this.playerPos.x = 0        
    }

    stopMovementRight() {
        return this.playerPos.x = this.canvasSize.w - this.playerSize.w
    }

    shoot() {
        const bullets = new Bullets(this.ctx, this.playerPos.x, this.playerPos.y, this.playerSize.h, 50, 30, 30,  './../images/bullet.png')
        // ctx, playerPosX, playerPosY, playerWidth, playerHeight, bulletsWidth, bulletsHeight, bulletImage      

        this.bullets.push(bullets)  
        document.getElementById('shoot').play()
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.bulletsPosX <= this.canvasSize.w);
    } 


} 
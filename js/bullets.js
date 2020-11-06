class Bullets {

  constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, bulletsWidth, bulletsHeight, bulletImage) {
    this.ctx = ctx
    this.bulletsPosX = playerPosX + 20
    this.bulletsPosY = playerPosY - 40
    
    this.playerHeight = playerHeight;

    this.bulletsSize = {
      w: bulletsWidth,
      h: bulletsHeight
    }    
    
    
    this.bulletsVelY = 5;

    this.bulletsGravity = 10;    
      
    this.imageName = bulletImage
    this.bulletInstance = undefined  
    this.init()  
  }
    
   init() {
    this.bulletInstance = new Image()
    this.bulletInstance.src = 'images/bullet.png'
  }  

  drawBullets() {
    this.moveBullets() 
    this.ctx.drawImage(this.bulletInstance, this.bulletsPosX, this.bulletsPosY, 30, 45)    
  }

  moveBullets() {

    this.bulletsPosY -= this.bulletsVelY
    

    // this.posX += this.velX;
    // this.posY += this.velY;

    // this.velY += this.gravity;

    // if (this.posY >= this.playerPosY0 + this.playerHeight) {
    //   this.velY *= -1;
  }  
}

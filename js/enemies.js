class Enemies {
    constructor(ctx, enemiesPosX, enemiesPosY, enemiesWidth, enemiesHeight, enemiesImage, enemiesVelX, enemiesVelY, canvasSize,) {
        this.ctx = ctx
        this.enemiesPos = {
            x: enemiesPosX,
            y: enemiesPosY
        }
        this.enemiesSize = {
            w: enemiesWidth,
            h: enemiesHeight
        }

        this.enemiesVelX = enemiesVelX
        this.enemiesVelY = enemiesVelY

        this.canvasSize = {
            w: canvasSize,
            h: canvasSize
        }
        
        this.enemiesImageName = enemiesImage
        this.enemiesInstance = undefined
        
        this.init()
    }
    
    init() {
        this.enemiesInstance = new Image(this.ctx, this.enemiesPos.x, this.enemiesPos.y, this.enemiesWidth, this.enemiesHeight, this.enemiesImage, this.canvasSize, this.enemiesSpeed)
        this.enemiesInstance.src = 'images/pig2.png'
    }
    
    drawEnemies() {       
        this.ctx.drawImage(this.enemiesInstance, this.enemiesPos.x, this.enemiesPos.y, this.enemiesSize.w, this.enemiesSize.h)
    }
    
    moveEnemies() { 
        this.enemiesPos.x += this.enemiesVelX               
    }
    
    changeDirectionLeft() {
        this.enemiesVelX *= -1
        this.enemiesPos.y += 40
    }

    changeDirectionRight() {
        this.enemiesVelX *= -1
        this.enemiesPos.y += 40
    }
}
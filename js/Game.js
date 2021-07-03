class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        if(gameState !== 2){
            form.hide();

            Player.getPlayerInfo();
            image(back_img, 0, 0, 1000, 800);
            var x =100;
            var y=200;
            var index =0;
            drawSprites();

            for(var plr in allPlayers){
            
                index = index+1;
                x = 500-allPlayers[plr].distance;
                y = 500;
                
                players[index -1].x = x;
                players[index - 1].y = y;

                // Differentiate the main player by printing
                // the name of the player on the basket. 
                if(index === player.index){
                    fill('black');
                    textSize(25);
                    text(allPlayers[plr].name,x-25,y+25);
                }

                // Give movements for the players using arrow keys

                // for right arrow
                if(keyIsDown(39)){
                    player.distance -= 10;
                    player.update();
                }
                
                // for left arrow
                else if(keyIsDown(37)){
                    player.distance += 10;
                    player.update();
                }

                // Create and spawn fruits randomly
                if(frameCount % 40 === 0){
                    fruits = createSprite(random(100,1000), 0, 100, 100);
                    fruits.velocityY = 6;
                    var rand = Math.round(random(1,5));
                    switch(rand){
                        case 1: fruits.addImage("apple2", fruit1_img);
                        break;
                        case 2: fruits.addImage("banana2", fruit2_img);
                        break;
                        case 3: fruits.addImage("melon2", fruit3_img);
                        break;
                        case 4: fruits.addImage("orange2", fruit4_img);
                        break;
                        case 5: fruits.addImage("pineapple2", fruit5_img);
                        break;
                        default: break;
                    }
                    fruitGroup.add(fruits);
                }

                if (player.index !== null) {
                    for(var i = 0; i < fruitGroup.length; i++){
                        if(fruitGroup.get(i).isTouching(players)){
                            fruitGroup.get(i).destroy();
                            player.score++
                            player.update();
                        }
                    }
                }

                
                textSize(25);
                noStroke();
                fill('white');
                text("Score of "+allPlayers.player1.name+":"+allPlayers.player1.score, 50, 50);
                text("Score of "+allPlayers.player2.name+":"+allPlayers.player2.score, 50, 100);
                
                if(allPlayers.player1.score >= 1 || allPlayers.player2.score >= 1){
                    this.end();
                    break;
                }

            }

        }

    }

    end(){
       game.update(2);
       clear();
       player.index = null;
       fill('blue');
       textSize(40);
       text("Game Over",350,200);
       textSize(25);
       noStroke();
       fill('black');
       text("Score of "+allPlayers.player1.name+":"+allPlayers.player1.score, 350, 300);
       text("Score of "+allPlayers.player2.name+":"+allPlayers.player2.score, 350, 350);
    }
}
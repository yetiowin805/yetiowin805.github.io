var screenX = 500, screenY = 500;
var start_game = {x:screenX/2 , y: screenY/4, w: 250, h: 50, name: "Start Game"};
var rules_button = {x:screenX/2 , y: screenY/4+60, w: 250, h: 50, name: "Rules"};
var begin_round = {x:screenX/2 , y: screenY/4, w: 300, h: 50, name: "Begin Round"};
var rethrow_button = {x:screenX/4 , y: screenY*3/4, w: 200, h: 50, name: "Rethrow"};
var freeze_button = {x:screenX*3/4 , y: screenY*3/4, w: 200, h: 50, name: "Freeze"};
var must_freeze = {x:screenX/2 , y: screenY*3/4, w: 200, h: 50, name: "Freeze"};
var continue_button = {x:screenX/2 , y: screenY*3/4, w: 200, h: 50, name: "Continue"};
var game_state = "Main Menu";
var player = {score: 0, round_score: 0, current: 0, rethrows: 5, set: 1};
current_dice = [];
frozen_dice = [];


function setup() {
  createCanvas(screenX, screenY);
    
}

function draw() {
    if (game_state=="Main Menu"){
        clear();
        draw_button(start_game);
        draw_button(rules_button);
    } else if (game_state=="Rules"){
        clear();
        mytext("Coming soon", screenX/2,50,20);
        mytext("Click anywhere to go back", screenX/2,100,20);
    } else if (game_state=="100m prep"){
        clear();
        draw_button(begin_round);
        mytext("100 Metres", screenX/2, screenY-50,40);
    } else if (game_state=="100m main"){
        clear();
        for (var i=0; i<current_dice.length; i++){
            draw_die_struct(current_dice[i]);
        }
        for (var i=0; i<frozen_dice.length; i++){
            draw_die_struct(frozen_dice[i]);
        }
        if (player.rethrows>0){
            draw_button(rethrow_button);
            draw_button(freeze_button);
            mytext("Value: "+player.current.toString(), screenX/2, screenY*5/8+17.5,20);
            mytext("Rethrows: "+player.rethrows.toString(),screenX/2,screenY/6-30,20);
            mytext("Frozen: "+player.round_score.toString(),screenX/2,screenY/6,20);
        } else {
            draw_button(must_freeze);
            mytext("Rethrows: "+player.rethrows.toString(),screenX/2,screenY/6-30,20);
            mytext("Frozen: "+player.round_score.toString(),screenX/2,screenY/6,20);
        }
        mytext("100 Metres", screenX/2, screenY-50,40);
    } else if (game_state=="100m completed"){
        clear();
        for (var i=0; i<frozen_dice.length; i++){
            draw_die_struct(frozen_dice[i]);
        }
        mytext("Total: "+player.round_score.toString(),screenX/2,screenY/6,20);
        draw_button(continue_button);
        mytext("100 Metres", screenX/2, screenY-50,40);
    } else if (game_state=="Game Over"){
        clear();
        mytext("Score: "+player.score.toString(),screenX/2,screenY/2,100);
    }
}

function mytext(s,x,y,size,align=CENTER){
    textAlign(align);
    textSize(size);
    fill('#000000');
    stroke('#FFFFFF');
    text(s, x, y);
    stroke('#000000');
}

function draw_button(button){
    fill('#FFFFFF');
    rect(button.x-button.w/2,button.y-button.h/2,button.w,button.h,min(button.w,button.h)/4);
    mytext(button.name, button.x, button.y+button.h*3/10,button.h*9/10);
}

function distance(x1,y1,x2,y2){
    return sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

function in_button(button){ 
    if (abs(mouseX-button.x)>button.w/2){
        return false;
    }
    if (abs(mouseY-button.y)>button.h/2){
        return false;
    }
    var r = min(button.w,button.h)/4;
    if (mouseX>button.x+button.w/2-r){
        if (mouseY>button.y+button.h/2-r){
            return (distance(mouseX,mouseY,button.x+button.w/2-r,button.y+button.h/2-r)<=r);
        }
        if (mouseY<button.y-button.h/2+r){
            return (distance(mouseX,mouseY,button.x+button.w/2-r,button.y-button.h/2+r)<=r);
        }
    }
    if (mouseX<button.x-button.w/2+r){
        if (mouseY>button.y+button.h/2-r){
            return (distance(mouseX,mouseY,button.x-button.w/2+r,button.y+button.h/2-r)<=r);
        }
        if (mouseY<button.y-button.h/2+r){
            return (distance(mouseX,mouseY,button.x-button.w/2+r,button.y-button.h/2+r)<=r);
        }
    }
    return true;
}

function draw_die(X,Y,n) {
    fill('#FFFFFF');
    rect(X-40, Y-40, 80, 80,20);
    fill('#000000');
    if (n%2==1){
        ellipse(X, Y, 10, 10);
    }
    if (n==2 || n==3){
        var x=floor(random(2));
        if (x==0){
            ellipse(X-20, Y-20, 10, 10);
            ellipse(X+20, Y+20, 10, 10);
        } else {
            ellipse(X-20, Y+20, 10, 10);
            ellipse(X+20, Y-20, 10, 10);
        }
    }
    if (n>=4){
        ellipse(X-20, Y-20, 10, 10);
        ellipse(X+20, Y+20, 10, 10);
        ellipse(X-20, Y+20, 10, 10);
        ellipse(X+20, Y-20, 10, 10);
    }
    if (n==6){
        ellipse(X-20, Y, 10, 10);
        ellipse(X+20, Y, 10, 10);
    }
}

function draw_die_struct(dice){
    fill('#FFFFFF');
    rect(dice.x-dice.size/2, dice.y-dice.size/2, dice.size, dice.size,dice.size/4);
    if (dice.n==-6){
        fill('#FF0000');
        stroke('#FF0000');
        ellipse(dice.x-dice.size/4, dice.y-dice.size/4, dice.size/8, dice.size/8);
        ellipse(dice.x+dice.size/4, dice.y+dice.size/4, dice.size/8, dice.size/8);
        ellipse(dice.x-dice.size/4, dice.y+dice.size/4, dice.size/8, dice.size/8);
        ellipse(dice.x+dice.size/4, dice.y-dice.size/4, dice.size/8, dice.size/8);
        if (dice.orientation==1){
            ellipse(dice.x-dice.size/4, dice.y, dice.size/8, dice.size/8);
            ellipse(dice.x+dice.size/4, dice.y, dice.size/8, dice.size/8);
        } else {
            ellipse(dice.x, dice.y-dice.size/4, dice.size/8, dice.size/8);
            ellipse(dice.x, dice.y+dice.size/4, dice.size/8, dice.size/8);
        }
        stroke('#000000');
        return;
    }
    fill('#000000');
    if (dice.n%2==1){
        ellipse(dice.x, dice.y, dice.size/8, dice.size/8);
    }
    if (dice.n==2 || dice.n==3){
        if (dice.orientation==1){
            ellipse(dice.x-dice.size/4, dice.y-dice.size/4, dice.size/8, dice.size/8);
            ellipse(dice.x+dice.size/4, dice.y+dice.size/4, dice.size/8, dice.size/8);
        } else {
            ellipse(dice.x-dice.size/4, dice.y+dice.size/4, dice.size/8, dice.size/8);
            ellipse(dice.x+dice.size/4, dice.y-dice.size/4, dice.size/8, dice.size/8);
        }
    }
    if (dice.n>=4){
        ellipse(dice.x-dice.size/4, dice.y-dice.size/4, dice.size/8, dice.size/8);
        ellipse(dice.x+dice.size/4, dice.y+dice.size/4, dice.size/8, dice.size/8);
        ellipse(dice.x-dice.size/4, dice.y+dice.size/4, dice.size/8, dice.size/8);
        ellipse(dice.x+dice.size/4, dice.y-dice.size/4, dice.size/8, dice.size/8);
    }
    if (dice.n==6){
        if (dice.orientation==1){
            ellipse(dice.x-dice.size/4, dice.y, dice.size/8, dice.size/8);
            ellipse(dice.x+dice.size/4, dice.y, dice.size/8, dice.size/8);
        } else {
            ellipse(dice.x, dice.y-dice.size/4, dice.size/8, dice.size/8);
            ellipse(dice.x, dice.y+dice.size/4, dice.size/8, dice.size/8);
        }
    }
}

function rollDice(n){
    var offset=0;
    if (n%2==1){
        draw_die(screenX/2,screenY/2,floor(random(1,7)));
        offset+=120;
    } else {
        offset+=60;
    }
    for (;n>1;n-=2){
        draw_die(screenX/2+offset,screenY/2,floor(random(1,7)));
        draw_die(screenX/2-offset,screenY/2,floor(random(1,7)));
        offset+=120;
    }
}

function mouseClicked(){
    if (game_state=="Main Menu"){
        if (in_button(start_game)){
            game_state="100m prep";
            return;
        }
        if (in_button(rules_button)){
            game_state="Rules";
            return;
        }
        return;
    }
    if (game_state=="Rules"){
        game_state="Main Menu";
        return;
    }
    if (game_state=="100m prep"){
        if (in_button(begin_round)){
            game_state="100m main";
            clear();
            current_dice = [];
            var offset=60;
            for (n=4;n>1;n-=2){
                var temp1 = {x: screenX/2+offset, y: screenY/2, size: 80, n: random([1,2,3,4,5,-6]),orientation: random([1,2])};
                player.current+=temp1.n;
                current_dice.push(temp1);
                var temp2 = {x: screenX/2-offset, y: screenY/2, size: 80, n: random([1,2,3,4,5,-6]),orientation: random([1,2])};
                current_dice.push(temp2);
                player.current+=temp2.n;
                offset+=120;
            }
        }
        return;
    }
    if (game_state=="100m main"){
        if (player.rethrows>0){
            if (in_button(rethrow_button)){
                player.current=0;
                current_dice = [];
                var offset=60;
                for (n=4;n>1;n-=2){
                    var temp1 = {x: screenX/2+offset, y: screenY/2, size: 80, n: random([1,2,3,4,5,-6]),orientation: random([1,2])};
                    player.current+=temp1.n;
                    current_dice.push(temp1);
                    var temp2 = {x: screenX/2-offset, y: screenY/2, size: 80, n: random([1,2,3,4,5,-6]),orientation: random([1,2])};
                    current_dice.push(temp2);
                    player.current+=temp2.n;
                    offset+=120;
                }
                player.rethrows--;
                return;
            }
            if (in_button(freeze_button)){
                if (player.set==1){
                    for (var i=0; i<current_dice.length; i++){
                        var temp = current_dice[i];
                        temp.y/=2;
                        temp.size/=2;
                        temp.x=(temp.x+screenX/2)/2;
                        frozen_dice.push(temp);
                        player.round_score+=player.current;
                        player.current=0;
                    }
                    current_dice=[];
                    var offset=60;
                    for (n=4;n>1;n-=2){
                        var temp1 = {x: screenX/2+offset, y: screenY/2, size: 80, n: random([1,2,3,4,5,-6]),orientation: random([1,2])};
                        player.current+=temp1.n;
                        current_dice.push(temp1);
                        var temp2 = {x: screenX/2-offset, y: screenY/2, size: 80, n: random([1,2,3,4,5,-6]),orientation: random([1,2])};
                        current_dice.push(temp2);
                        player.current+=temp2.n;
                        offset+=120;
                    }
                    player.set++;
                    return;
                }
                if (player.set==2){
                    for (var i=0; i<current_dice.length; i++){
                        var temp = current_dice[i];
                        temp.y/=2;
                        temp.y+=60;
                        temp.size/=2;
                        temp.x=(temp.x+screenX/2)/2;
                        frozen_dice.push(temp);
                        player.round_score+=player.current;
                        player.current=0;
                    }
                    game_state="100m completed";
                    return;
                }
            }
            return;
        }
        if (in_button(must_freeze)){
            if (player.set==1){
                for (var i=0; i<current_dice.length; i++){
                    var temp = current_dice[i];
                    temp.y/=2;
                    temp.size/=2;
                    temp.x=(temp.x+screenX/2)/2;
                    frozen_dice.push(temp);
                    player.round_score+=player.current;
                    player.current=0;
                }
                current_dice=[];
                var offset=60;
                for (n=4;n>1;n-=2){
                    var temp1 = {x: screenX/2+offset, y: screenY/2, size: 80, n:
                                 random([1,2,3,4,5,-6]),orientation: random([1,2])};
                    player.current+=temp1.n;
                    current_dice.push(temp1);
                    var temp2 = {x: screenX/2-offset, y: screenY/2, size: 80, n: random([1,2,3,4,5,-6]),orientation: random([1,2])};
                    current_dice.push(temp2);
                    player.current+=temp2.n;
                    offset+=120;
                }
            }
            for (var i=0; i<current_dice.length; i++){
                var temp = current_dice[i];
                temp.y/=2;
                temp.y+=60;
                temp.size/=2;
                temp.x=(temp.x+screenX/2)/2;
                frozen_dice.push(temp);
                player.round_score+=player.current;
                player.current=0;
            }
            game_state="100m completed";
            return;
        }
        return;
    }
    if (game_state=="100m completed"){
        player.score+=player.round_score;
        if (in_button(continue_button)){
            game_state="Game Over";
        }
        return;
    }
    if (game_state=="Game Over"){
        player.score=0;
        player.round_score=0;
        player.current=0;
        player.rethrows=5;
        player.set=1;
        current_dice = [];
        frozen_dice = [];
        game_state="Main Menu";
    }
    clear();
    rollDice(floor(random(1,5)));
}
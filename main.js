import Phaser from 'phaser'

let D;
let P;
let R;

class Splash extends Phaser.Scene
{
    constructor(){super("Splash");}

    init(){this.waitText = this.add.text(100, 220, "Please wait while the game loads...", {"fontFamily": "Arial", "fontSize": 48, "color": "#F0F0F0"}).setOrigin(0);}
    preload ()
    {
        this.load.json('data', 'data.json');
    }
    create ()
    {
        D = this.cache.json.get('data');
        this.start();
    }
    start(){this.scene.launch("Load");}
}

class Load extends Phaser.Scene
{
    constructor(){super("Load");}

    init()
    {
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0xF0F0F0);
        this.progressBox.fillRoundedRect(80, 320, 800, 60, 20);
        this.progressBar = this.add.graphics();
        
        this.percentText = this.add.text(435, 325, "0%", {"fontFamily": "Arial", "fontSize": 48, "color": "#000000"}).setOrigin(0);
        
        this.load.on('progress', function (value) {
            this.percentText.setText(parseInt(value * 100) + '%');
            this.progressBar.clear();
            this.progressBar.fillStyle(0x74DF6B);
            this.progressBar.fillRoundedRect(80, 320, 800 * value, 60, 20);
        }, this);
    }

    preload ()
    {
        if(D.atlas)
        {
            this.load.atlas(D.atlas, "/assets/images/atlas.png","/assets/images/atlas.json");
        }

        if(D.audio)
        {
            for(let audio of D.audio)
            {
                this.load.audio(audio, "/assets/audio/" + audio + ".mp3");
            }
        }

    }

    create ()
    {
        this.scene.get("Splash").waitText.destroy();
        this.progressBox.destroy();
        this.progressBar.destroy();
        this.percentText.destroy();
        this.input.on('pointerdown', this.start, this);
        this.clickText = this.add.text(261, 293, "Click or tap to begin.", {"fontFamily": "Arial", "fontSize": 48, "color": "#F0F0F0"}).setOrigin(0);
    }

    start()
    {
        this.clickText.destroy();
        this.scene.launch("Run");
    }

    update (){}
}

class Run extends Phaser.Scene
{
    constructor()
    {
        super("Run");
    }

    init()
    {
       R = this;
    }

    preload (){}

    create ()
    {
      // Start application here
    }

    update ()
    {
        // Update events here
    }
}

let config = 
{
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    backgroundColor: '#3C3C3C',
    scale: 
    {
        parent: 'gameDiv',
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Splash, Load, Run]
};

P = new Phaser.Game(config);

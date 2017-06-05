
window.onload = function()
{


var Bomber = {
  cost: 55
};

var Turret = {
  cost: 20
};

var Ice = {
  cost: 50
};



Creep = function (index, game, player, projectile, type)
{
  var x = 16.5 * 32;
  var y = -64;
  var lastDown = 0;
  var lastUp = 0;
  var last = 0;
  var tier = 0;

  this.game = game;
  this.player = player;
  this.projectile = projectile;
  this.alive = false;
  this.slowed = 0;

  if(type === 'sheep')
  {
    this.type = 0;
    this.lifeCost = 1;
    this.health = 7.5 * diff;
    this.maxHealth = 10 * diff;
    this.kill_reward = 5 + (diff/2);
    this.speed = 75 + diff;  //32
    this.creep = game.add.sprite(x, y, 'sheep');
  }

  if(type === 'bruiser')
  {
    this.type = 1;
    this.lifeCost = 3;
    this.health = 15 * diff;
    this.maxHealth = 20 * diff;
    this.kill_reward = 10 + (diff/2);
    this.speed = 60 + diff;
    this.creep = game.add.sprite(x, y, 'bruiser');
  }

  if(type === 'scout')
  {
    this.type = 2;
    this.lifeCost = 1;
    this.health = 5 * diff;
    this.maxHealth = 6 * diff;
    this.kill_reward = 10 + (diff/2);
    this.speed = 125 + diff;
    this.creep = game.add.sprite(x, y, 'scout');
  }

  this.creep.anchor.set(0.5);
  this.creep.name = index.toString();
  game.physics.enable(this.creep, Phaser.Physics.ARCADE);
  this.creep.body.immovable = false;

  this.barConfig =
{
    width: 18,
    height: 4,
    x: 0,
    y: 0,
    bg: {
      color: '#651828'
    },
    bar: {
      color: '#02ff63'
    },
    animationDuration: 100,
    flipped: false
  };
  this.healthBar = new HealthBar(this.game, this.barConfig);
};

Creep.prototype.damage = function()
{

  this.health -= 1;

  if (this.health <= 0)
  {
    this.alive = false;
    this.creep.kill();
    this.healthBar.kill();
    credits += this.kill_reward;
    return true;
  }

  return false;
}

/*
Creep.prototype.movedown = function()
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
};

Creep.prototype.moveright = function()
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
};

Creep.prototype.moveleft = function()
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = -1 * (this.speed);
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = -1 * (this.speed);
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = -1 * (this.speed);
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
};

Creep.prototype.moveup = function()
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = -1 * this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = -1 * this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = -1 * this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
};

*/




Creep.prototype.update = function(iceTowers)
{

// shortcut switch 0
	for (var i = 0; i < wallCount; i++)
	{
	  if( (wall[i].x == 560 && wall[i].y == 176) || (wall[i].x == 592 && wall[i].y == 176) || (wall[i].x == 624 && wall[i].y == 176) || (wall[i].x == 656 && wall[i].y == 176) || (wall[i].x == 688 && wall[i].y == 176) || (wall[i].x == 720 && wall[i].y == 176) || (wall[i].x == 752 && wall[i].y == 176) || (wall[i].x == 784 && wall[i].y == 176) || (wall[i].x == 816 && wall[i].y == 176) || (wall[i].x == 848 && wall[i].y == 176) || (wall[i].x == 848 && wall[i].y == 208) || (wall[i].x == 848 && wall[i].y == 240) || (wall[i].x == 848 && wall[i].y == 272) || (wall[i].x == 848 && wall[i].y == 304) || (wall[i].x == 848 && wall[i].y == 336) || (wall[i].x == 848 && wall[i].y == 368) || (wall[i].x == 848 && wall[i].y == 400) || (wall[i].x == 848 && wall[i].y == 432) || (wall[i].x == 848 && wall[i].y == 464) || (wall[i].x == 848 && wall[i].y == 496) || (wall[i].x == 848 && wall[i].y == 528) || (wall[i].x == 848 && wall[i].y == 560) || (wall[i].x == 848 && wall[i].y == 592) || (wall[i].x == 848 && wall[i].y == 624) || (wall[i].x == 848 && wall[i].y == 656) || (wall[i].x == 848 && wall[i].y == 688) || (wall[i].x == 848 && wall[i].y == 720) || (wall[i].x == 848 && wall[i].y == 752) || (wall[i].x == 848 && wall[i].y == 784))
		{
	     shortcut0 = 1;
	  }
	}

// shortcut switch 1
	for (var i = 0; i < wallCount; i++)
	{
	  if( (wall[i].x == 528 && wall[i].y == 208) || (wall[i].x == 528 && wall[i].y == 240) || (wall[i].x == 496 && wall[i].y == 240)  || (wall[i].x == 464 && wall[i].y == 240)  || (wall[i].x == 432 && wall[i].y == 240)  || (wall[i].x == 400 && wall[i].y == 240)  || (wall[i].x == 368 && wall[i].y == 240)  || (wall[i].x == 336 && wall[i].y == 240)  || (wall[i].x == 304 && wall[i].y == 240)  || (wall[i].x == 272 && wall[i].y == 240)  || (wall[i].x == 240 && wall[i].y == 240) || (wall[i].x == 240 && wall[i].y == 272) || (wall[i].x == 240 && wall[i].y == 304) || (wall[i].x == 272 && wall[i].y == 304) || (wall[i].x == 304 && wall[i].y == 304) || (wall[i].x == 336 && wall[i].y == 304) || (wall[i].x == 368 && wall[i].y == 304) || (wall[i].x == 400 && wall[i].y == 304) || (wall[i].x == 432 && wall[i].y == 304) || (wall[i].x == 464 && wall[i].y == 304) || (wall[i].x == 496 && wall[i].y == 304) || (wall[i].x == 528 && wall[i].y == 304) || (wall[i].x == 560 && wall[i].y == 304) || (wall[i].x == 592 && wall[i].y == 304) || (wall[i].x == 624 && wall[i].y == 304) || (wall[i].x == 656 && wall[i].y == 304)  )
		{
	     shortcut1 = 1;
	  }
	}

// shortcut switch 2
	for (var i = 0; i < wallCount; i++)
	{
	  if( (wall[i].x == 496 && wall[i].y == 176) || (wall[i].x == 464 && wall[i].y == 176) || (wall[i].x == 432 && wall[i].y == 176) || (wall[i].x == 400 && wall[i].y == 176) || (wall[i].x == 368 && wall[i].y == 176) || (wall[i].x == 336 && wall[i].y == 176) || (wall[i].x == 304 && wall[i].y == 176) || (wall[i].x == 272 && wall[i].y == 176) || (wall[i].x == 240 && wall[i].y == 176) || (wall[i].x == 208 && wall[i].y == 176) || (wall[i].x == 176 && wall[i].y == 176) || (wall[i].x == 176 && wall[i].y == 208) || (wall[i].x == 176 && wall[i].y == 240) || (wall[i].x == 176 && wall[i].y == 272) || (wall[i].x == 176 && wall[i].y == 304) || (wall[i].x == 176 && wall[i].y == 336) || (wall[i].x == 176 && wall[i].y == 368) || (wall[i].x == 176 && wall[i].y == 400) || (wall[i].x == 176 && wall[i].y == 432) || (wall[i].x == 176 && wall[i].y == 464) || (wall[i].x == 176 && wall[i].y == 496) || (wall[i].x == 176 && wall[i].y == 528) || (wall[i].x == 176 && wall[i].y == 560) || (wall[i].x == 176 && wall[i].y == 592) || (wall[i].x == 176 && wall[i].y == 624) || (wall[i].x == 176 && wall[i].y == 656) || (wall[i].x == 176 && wall[i].y == 688) || (wall[i].x == 176 && wall[i].y == 720) || (wall[i].x == 176 && wall[i].y == 752) || (wall[i].x == 176 && wall[i].y == 784) || (wall[i].x == 176 && wall[i].y == 816) || (wall[i].x == 208 && wall[i].y == 816) || (wall[i].x == 240 && wall[i].y == 816) || (wall[i].x == 272 && wall[i].y == 816) || (wall[i].x == 304 && wall[i].y == 816) || (wall[i].x == 336 && wall[i].y == 816) || (wall[i].x == 368 && wall[i].y == 816) || (wall[i].x == 400 && wall[i].y == 816) || (wall[i].x == 432 && wall[i].y == 816) || (wall[i].x == 464 && wall[i].y == 816) || (wall[i].x == 496 && wall[i].y == 816) || (wall[i].x == 528 && wall[i].y == 816) || (wall[i].x == 560 && wall[i].y == 816) || (wall[i].x == 592 && wall[i].y == 816) || (wall[i].x == 624 && wall[i].y == 816) || (wall[i].x == 656 && wall[i].y == 816) || (wall[i].x == 688 && wall[i].y == 816) || (wall[i].x == 720 && wall[i].y == 816) || (wall[i].x == 752 && wall[i].y == 816) || (wall[i].x == 784 && wall[i].y == 816) || (wall[i].x == 816 && wall[i].y == 816) || (wall[i].x == 848 && wall[i].y == 816))
		{
	     shortcut2 = 1;
	  }
	}

if(this.creep.x > 848 && wallCount > 0)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y < 236 && wallCount > 0 && shortcut0 == 1 && shortcut2 == 1 && shortcut1 == 0)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y < 176 && wallCount > 0 && shortcut0 == 1 && shortcut2 == 0 && shortcut1 == 0)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y < 176 && wallCount > 0 && shortcut1 == 1)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y < 176 && wallCount > 0 && shortcut0 == 0 && shortcut2 == 0 && shortcut1 == 0)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

//&& ( shortcut0 == 0 || (shortcut0 == 1 && shortcut2 == 1 && shortcut1 == 1))

if(this.creep.y > 176 && this.creep.x < 848 && wallCount > 0 && shortcut0 == 1 && shortcut2 == 1 && shortcut1 == 1)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y > 176 && this.creep.x < 848 && wallCount > 0 && shortcut0 == 1 && shortcut2 == 0 && shortcut1 == 1)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = -this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = -this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = -this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y > 176 && this.creep.x < 848 && wallCount > 0 && shortcut0 == 1 && shortcut2 == 0 && shortcut1 == 0)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = -this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = -this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = -this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y > 176 && this.creep.x < 176 && wallCount > 0 && shortcut0 == 1 && shortcut2 == 0 && shortcut1 == 1)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y > 176 && this.creep.x < 176 && wallCount > 0 && shortcut0 == 1 && shortcut2 == 0 && shortcut1 == 0)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = 0;
		this.creep.body.velocity.y = this.speed;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y > 176 && this.creep.x < 848 && wallCount > 0 && shortcut0 == 0)
{
	if(this.type == 0)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
		this.creep.body.velocity.x = this.speed;
		this.creep.body.velocity.y = 0;
		this.healthBar.setPercent(this.health/this.maxHealth*100);
		this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 236 && this.creep.x > 242  && this.creep.x > 176 && this.creep.x < 816 && wallCount > 0 && shortcut0 == 1)
{
	if(this.type == 0)
	{
	    //this.creep.y += 1;
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    //this.creep.y += 0.5;
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    //this.creep.y += 1.5;
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 236 && this.creep.x < 242 && wallCount > 0)
{
	if(this.type == 0)
	{
	    //this.creep.y += 1;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    //this.creep.y += 0.5;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    //this.creep.y += 1.5;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}

this.creep.lastUp = 0;
}

if(this.creep.y > 300 && this.creep.x < 656 && this.creep.x > 176 && wallCount > 0)
{

	if(this.type == 0)
	{
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
}


	if(this.type == 1)
	{
	    //this.creep.y += 0.5;
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    //this.creep.y += 1.5;
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 300 && this.creep.x > 656 && wallCount > 0)
{
	if(this.type == 0)
	{
	    //this.creep.y += 1;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    //this.creep.y += 0.5;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    //this.creep.y += 1.5;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}

this.creep.lastUp = 0;

}


if(this.creep.y > 428 && this.creep.x > 242 && this.creep.x > 176 && this.creep.x < 816 && wallCount > 0)
{

	if(this.type == 0)
	{
	    //this.creep.y += 1;
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    //this.creep.y += 0.5;
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    //this.creep.y += 1.5;
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 428 && this.creep.x < 242 && wallCount > 0)
{
	if(this.type == 0)
	{
	    //this.creep.y += 1;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    //this.creep.y += 0.5;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    //this.creep.y += 1.5;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}

this.creep.lastUp = 0;
}


if(this.creep.y > 492 && this.creep.x < 656 && this.creep.x > 176 && wallCount > 0)
{

	if(this.type == 0)
	{
	    //this.creep.y += 1;
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    //this.creep.y += 0.5;
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    //this.creep.y += 1.5;
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 492 && this.creep.x > 656 && wallCount > 0)
{
	if(this.type == 0)
	{
	    //this.creep.y += 1;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    //this.creep.y += 0.5;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    //this.creep.y += 1.5;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 620 && this.creep.x > 242 && this.creep.x > 176 && this.creep.x < 816 && wallCount > 0)
{

	if(this.type == 0)
	{
	    //this.creep.y += 1;
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    //this.creep.y += 0.5;
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    //this.creep.y += 1.5;
	    this.creep.body.velocity.x = -this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


if(this.creep.y > 620 && this.creep.x < 242 && wallCount > 0)
{
	if(this.type == 0)
	{
	    //this.creep.y += 1;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    //this.creep.y += 0.5;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    //this.creep.y += 1.5;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = this.speed;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}


}


if(this.creep.y > 684 && this.creep.x < 710 && this.creep.x > 176 && wallCount > 0)
{

	if(this.type == 0)
	{
	    //this.creep.y += 1;
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    //this.creep.y += 0.5;
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    //this.creep.y += 1.5;
	    this.creep.body.velocity.x = this.speed;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

/*

if(this.creep.y > 684 && this.creep.x > 656 && wallCount > 0 && first_shortcut == 0)
{
	if(this.type == 0)
	{
	    //this.creep.y += 1;
	    this.creep.body.velocity.x = 32;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    //this.creep.y += 0.5;
	    this.creep.body.velocity.x = 16;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    //this.creep.y += 1.5;
	    this.creep.body.velocity.x = 48;
	    this.creep.body.velocity.y = 0;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}

if(this.creep.y > 684 && this.creep.x > 720 && wallCount > 0 && first_shortcut == 0)
{
	if(this.type == 0)
	{
	    //this.creep.y += 1;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = 32;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 1)
	{
	    //this.creep.y += 0.5;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = 16;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
	if(this.type == 2)
	{
	    //this.creep.y += 1.5;
	    this.creep.body.velocity.x = 0;
	    this.creep.body.velocity.y = 48;
	    this.healthBar.setPercent(this.health/this.maxHealth*100);
	    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
	}
}


*/


if(this.creep.y > 684 && this.creep.x > 710 && this.creep.x < 816 && wallCount > 0 )
{


    	if(this.type == 0)
			{
			    //this.creep.y += 1;
			    this.creep.body.velocity.x = 0;
			    this.creep.body.velocity.y = this.speed;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 1)
			{
			    //this.creep.y += 0.5;
			    this.creep.body.velocity.x = 0;
			    this.creep.body.velocity.y = this.speed;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 2)
			{
			    //this.creep.y += 1.5;
			    this.creep.body.velocity.x = 0;
			    this.creep.body.velocity.y = this.speed;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
}

if(this.creep.y > 804 &&  this.creep.x < 840 && wallCount > 0 )
{


    	if(this.type == 0)
			{
			    //this.creep.y += 1;
			    this.creep.body.velocity.x = this.speed;
			    this.creep.body.velocity.y = 0;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 1)
			{
			    //this.creep.y += 0.5;
			    this.creep.body.velocity.x = this.speed;
			    this.creep.body.velocity.y = 0;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 2)
			{
			    //this.creep.y += 1.5;
			    this.creep.body.velocity.x = this.speed;
			    this.creep.body.velocity.y = 0;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
}


/*



if(this.creep.y > 812 && this.creep.x < 242 && wallCount > 0 && first_shortcut == 1)
{

    	if(this.type == 0)
			{
			    //this.creep.y += 1;
			    this.creep.body.velocity.x = 0;
			    this.creep.body.velocity.y = 32;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 1)
			{
			    //this.creep.y += 0.5;
			    this.creep.body.velocity.x = 0;
			    this.creep.body.velocity.y = 16;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 2)
			{
			    //this.creep.y += 1.5;
			    this.creep.body.velocity.x = 0;
			    this.creep.body.velocity.y = 48;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
}



if(this.creep.y > 876 && this.creep.x < 720 && wallCount > 0 && first_shortcut == 1)  //908
{


    	if(this.type == 0)
			{
			    //this.creep.y += 1;
			    this.creep.body.velocity.x = 32;
			    this.creep.body.velocity.y = 0;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 1)
			{
			    //this.creep.y += 0.5;
			    this.creep.body.velocity.x = 16;
			    this.creep.body.velocity.y = 0;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 2)
			{
			    //this.creep.y += 1.5;
			    this.creep.body.velocity.x = 48;
			    this.creep.body.velocity.y = 0;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
}



if(this.creep.y > 908 && this.creep.x > 720 && wallCount > 0)
{
    	if(this.type == 0)
			{
			    //this.creep.y += 1;
			    this.creep.body.velocity.x = 0;
			    this.creep.body.velocity.y = 32;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 1)
			{
			    //this.creep.y += 0.5;
			    this.creep.body.velocity.x = 0;
			    this.creep.body.velocity.y = 16;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 2)
			{
			    //this.creep.y += 1.5;
			    this.creep.body.velocity.x = 0;
			    this.creep.body.velocity.y = 48;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
}



if(this.creep.y > 1008 && this.creep.x > 496 && wallCount > 0 )
{
//  wallFlag = 1;
    	if(this.type == 0)
			{
			    //this.creep.y += 1;
			    this.creep.body.velocity.x = -32;
			    this.creep.body.velocity.y = 0;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 1)
			{
			    //this.creep.y += 0.5;
			    this.creep.body.velocity.x = -16;
			    this.creep.body.velocity.y = 0;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 2)
			{
			    //this.creep.y += 1.5;
			    this.creep.body.velocity.x = -48;
			    this.creep.body.velocity.y = 0;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
}


if(this.creep.y > 1008 && this.creep.x < 496 && wallCount > 0 )
{
    	if(this.type == 0)
			{
			    //this.creep.y += 1;
			    this.creep.body.velocity.x = 0;
			    this.creep.body.velocity.y = 32;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 1)
			{
			    //this.creep.y += 0.5;
			    this.creep.body.velocity.x = 0;
			    this.creep.body.velocity.y = 16;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
			if(this.type == 2)
			{
			    //this.creep.y += 1.5;
			    this.creep.body.velocity.x = 0;
			    this.creep.body.velocity.y = 48;
			    this.healthBar.setPercent(this.health/this.maxHealth*100);
			    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
			}
}


*/






if(this.creep.y >= 1072)
{
this.alive = false;
this.creep.kill();
this.healthBar.kill();
lives = lives - this.lifeCost;
this.lifeCost = 0;
}

this.slowed = 0;

for (var i = 0; i < iceTowers.length; i++)
{
    if (iceTowers[i].freezeAnimation.visible)
      {
      if(this.game.physics.arcade.distanceBetween(iceTowers[i], this.creep) < (iceTowers[i].range) )
      {
        this.slowed = 1;
      }
    }

}


if(this.slowed == 1)
{
    this.creep.body.velocity.x = this.creep.body.velocity.x * 0.5;
    this.creep.body.velocity.y = this.creep.body.velocity.y * 0.5;
    this.healthBar.setPercent(this.health/this.maxHealth*100);
    this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
}



/*


if(this.creep.body.velocity.x == 99)
{
//  walled = 0;
console.log(this.lastDown);



for (var i = 0; i < wallCount; i++)
{
	if( ( wall[i].y < this.creep.y + 2 || wall[i].y > this.creep.y - 2 ) && wall[i].x > this.creep.x)
	{
			if(wall[i].x < (this.creep.x + 32) && this.creep.tier == 1 && this.lastDown == 0)
			{
							this.creep.y += 32;
							this.healthBar.setPercent(this.health/this.maxHealth*100);
							this.healthBar.setPosition(this.creep.x, this.creep.y - 20);
              this.lastDown = 1;
			}
	}


}




}


*/




};




var game = new Phaser.Game(900, 900, Phaser.AUTO, 'lvl2', { preload: preload, create: create, update: update, render: render });

function preload ()
{
  game.load.image('icetower', 'game/three/iceTower_2.png');
  game.load.image('iceshot', 'game/three/iceshot.png')
  game.load.image('sheep', 'game/three/sheep.png');
  game.load.image('bruiser', 'game/three/bruiser2.png');
  game.load.image('scout', 'game/three/scout4.png');
  game.load.image('buyTurret', 'game/three/arrow3large.png')
  game.load.image('buyBomb', 'game/three/bomb_64p.png');
  game.load.image('bomb', 'game/three/bomb_bullet.png');
  game.load.image('bomb_launcher', 'game/three/bomb_launcher.png');
  game.load.image('logo', 'game/three/logo3.png');
  game.load.image('projectiles', 'game/three/fire.png');
  game.load.image('path', 'game/three/path.png');
  game.load.image('nonPath', 'game/three/nonPath.png');
  game.load.image('arrow', 'game/three/arrow3.png');
  game.load.spritesheet('boom', 'game/three/explosion.png', 64, 64, 23);  //64,64,9 for explosion2
  game.load.spritesheet('bomb_explode', 'game/three/explosion_transparent.png', 64, 64, 25);
  game.load.spritesheet('freeze', 'game/three/fx_4_ver2_strip40.png', 128, 128, 40);
  game.load.spritesheet('freeze_small', 'game/three/fx_4_ver2_strip40_small.png', 64, 64, 40);
  game.load.tilemap('lvlthree', 'game/three/levelThree.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('three', 'game/three/levelThree.png');
  game.load.image('buyIce', 'game/three/iceTower_buy.png');
}


var shortcut0 = 0;
var shortcut1 = 0;
var shortcut2 = 0;

var wallFlag = 0;
var first_shortcut = 0;
var diff = 1;
//var wall = ["13", "20", "45", "52", "77", "84", "109", "116", "141", "148", "173", "180"]
//var path = ["17", "49", "81", "113", "145", "177", "209", "241", "273", "305", "337", "369"]
var wall = [{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}]
//var wall = [{x: 0, y: 0}];
var wallCount = 0;

var nonPath = [{x: 848, y: 816},{x: 528, y: 176}]
var nonPathCount = 2;
//var nonPath = [{x: 240, y: 368},{x: 272, y: 368},{x: 304, y: 368},{x: 336, y: 368},{x: 368, y: 368},{x: 400, y: 368},{x: 432, y: 368},{x: 464, y: 368},{x: 496, y: 368},{x: 528, y: 368},{x: 560, y: 368},{x: 592, y: 368},{x: 624, y: 368},{x: 656, y: 368},{x: 688, y: 368},{x: 720, y: 368},{x: 240, y: 464},{x: 272, y: 464},{x: 304, y: 464},{x: 336, y: 464},{x: 368, y: 464},{x: 400, y: 464},{x: 432, y: 464},{x: 464, y: 464},{x: 496, y: 464},{x: 528, y: 464},{x: 560, y: 464},{x: 592, y: 464},{x: 624, y: 464},{x: 656, y: 464},{x: 688, y: 464},{x: 720, y: 464},{x: 240, y: 560},{x: 272, y: 560},{x: 304, y: 560},{x: 336, y: 560},{x: 368, y: 560},{x: 400, y: 560},{x: 432, y: 560},{x: 464, y: 560},{x: 496, y: 560},{x: 528, y: 560},{x: 560, y: 560},{x: 592, y: 560},{x: 624, y: 560},{x: 656, y: 560},{x: 688, y: 560},{x: 720, y: 560},{x: 240, y: 656},{x: 272, y: 656},{x: 304, y: 656},{x: 336, y: 656},{x: 368, y: 656},{x: 400, y: 656},{x: 432, y: 656},{x: 464, y: 656},{x: 496, y: 656},{x: 528, y: 656},{x: 560, y: 656},{x: 592, y: 656},{x: 624, y: 656},{x: 656, y: 656},{x: 688, y: 656},{x: 720, y: 656},{x: 240, y: 752},{x: 272, y: 752},{x: 304, y: 752},{x: 336, y: 752},{x: 368, y: 752},{x: 400, y: 752},{x: 432, y: 752},{x: 464, y: 752},{x: 496, y: 752},{x: 528, y: 752},{x: 560, y: 752},{x: 592, y: 752},{x: 624, y: 752},{x: 656, y: 752},{x: 688, y: 752},{x: 720, y: 752},{x: 240, y: 848},{x: 272, y: 848},{x: 304, y: 848},{x: 336, y: 848},{x: 368, y: 848},{x: 400, y: 848},{x: 432, y: 848},{x: 464, y: 848},{x: 496, y: 848},{x: 528, y: 848},{x: 560, y: 848},{x: 592, y: 848},{x: 624, y: 848},{x: 656, y: 848},{x: 688, y: 848},{x: 720, y: 848},{x: 688, y: 304},{x: 688, y: 336},{x: 688, y: 400},{x: 688, y: 432},{x: 688, y: 496},{x: 688, y: 528},{x: 688, y: 592},{x: 688, y: 624},{x: 688, y: 720},{x: 688, y: 784},{x: 688, y: 816}]
//var wall = [{x: 0, y: 0}];

var kill = 0;
var walled = 0;
//var start = [{x: 16, y: 0}, {x: 16, y: 0}];
var startX = 16;
var startY = 1;
//var targetX = 18;
//var targetY = 31;
var wallLeft = 12;
var wallRight = 19;
var towerSpace = [600];
var tileSize = 32;
var creepType = ['Sheep', 'Sick Sheep', 'Angry Sheep', 'Bruiser', 'Scout', 'Moar Buff Sheep', 'Roid Sheep', 'Sheepinator', 'Monster Sheep', 'Super Scout', 'Elite Bruiser', 'VICTORY!'];
var lives = 20;
var flag1 = 1;
var flag2 = 1;
var flag3 = 1;
var flag4 = 1;
var flag5 = 1;
var flag6 = 1;
var flag7 = 1;
var flag8 = 1;
var flag9 = 1;
var start = 1;
var totalWave = 10;
var currentWave = 0;
var credits = 100;
var path;
var nonPath;
var one;
var theCreeps;
var creep;
var creepProjectile;
var totalTowers = 1;
var totalCreeps = 0;
var aliveCreeps = 0;
var explosions;
var logo;
var cursors;
var creepSpacing = 0;
var map;
var pathLayer;
var atTile;
var TurretList = [];
var BomberList = [];
var IceList = [];
var type;
//var ice2 = iceTowers;
//var iceCount = 0;
//var ice = [{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}]

//var sheep;
//var bruiser;
var waves = ['sheep', 'sheep', 'bruiser', 'scout', 'sheep', 'sheep', 'sheep', 'sheep', 'scout', 'bruiser'];

function create ()
{
  game.time.desiredFps = 30;
  this.theCreeps = [];
  one = game.add.tileSprite(0, 0, 1100, 1100, 'three');

  map = game.add.tilemap('lvlthree');
  //pathLayer = tileMap.createLayer('traverse');
  //pathLayer.resizeWorld();

  totalCreeps = 10;
  aliveCreeps = 10;

  explosions = game.add.group();
  bombExplosions = game.add.group();

  //add sprites for purchasing bomb and arrow/turret
  buyBombSprite = game.add.sprite(32, game.height - 96, 'buyBomb');
  buyBombSprite.inputEnabled = true;
  buyBombSprite.alpha = 0.2; //set to 1 if enough credits to buy
  buyBombSprite.events.onInputDown.add(addBomber, this);
  buyBombText = game.add.text(32, game.height - 128, '', {font: '16px Arial', align: 'center'});
  buyBombText.text = 'Bomber: $55';

  buyTurretSprite = game.add.sprite(32, game.height - 224, 'buyTurret');
  buyTurretSprite.inputEnabled = true;
  buyTurretSprite.alpha = 0.2;
  buyTurretSprite.events.onInputDown.add(addTurret, this);
  buyTurretText = game.add.text(32, game.height - 256, '', {font: '16px Arial', align: 'center'});
  buyTurretText.text = 'Turret: $20';

  buyIceSprite = game.add.sprite(32, game.height - 352, 'buyIce');
  buyIceSprite.inputEnabled = true;
  buyIceSprite.alpha = 0.2;
  buyIceSprite.events.onInputDown.add(addIce, this);
  buyIceText = game.add.text(32, game.height - 384, '', {font: '16px Arial', align: 'center'});
  buyIceText.text = 'Icer: $50';

  for (var i = 0; i < 10; i++)
  {
    var explosionAnimation = explosions.create(0, 0, 'boom', 23, false);
    explosionAnimation.anchor.setTo(0.5, 0.5);
    explosionAnimation.animations.add('boom');
    var bombExplosionAnimation = bombExplosions.create(0,0,'bomb_explode', [0], false);
    bombExplosionAnimation.anchor.setTo(0.5);
    bombExplosionAnimation.animations.add('bomb_explode');
    bombExplosionAnimation.enableBody = true;
    bombExplosionAnimation.physicsBodyType = Phaser.Physics.ARCADE;
  }

  logo = game.add.sprite(155, 155, 'logo');
  logo.fixedToCamera = true;
  game.input.onDown.add(removeLogo, this);
  game.camera.focusOnXY(0, 0);
  cursors = game.input.keyboard.createCursorKeys();
}

function createBomber(bomber) {
//  console.log('Attempting to create bomber');
//  console.log(bomber);
  kill = 0;
     for (var i = 0; i < wallCount; i++)
     {
     if(bomber.x == wall[i].x && bomber.y == wall[i].y)
     {
       kill = 1;
     }
     }

     for (var i = 0; i < nonPathCount; i++)
     {
     if(bomber.x == nonPath[i].x && bomber.y == nonPath[i].y)
     {
       kill = 1;
     }
     }
//  wallFlag = 0;

  if ( bomber.x < 173 || bomber.x > 864 || bomber.y < 176 || bomber.y > 816 || kill == 1 )
{
    bomber.destroy();
  } else if (bomber.hasOwnProperty('fireRate')) {
    credits -= Bomber.cost;
    bomber.input.draggable = false;
    BomberList.push(bomber);
  } else {
    bomber.destroy();
  }
  wall[wallCount].x = bomber.x;
  wall[wallCount].y = bomber.y;

//console.log(wall[wallCount].x);
//console.log(wall[wallCount].y);
//console.log(wallCount);
  wallCount++;
}

function addBomber() {
  if (credits >= Bomber.cost) {
    var newBomber = new BomberClass(game, 'bomb_launcher', 'bomb', 0, 0);
    newBomber.events.onDragStop.add(createBomber, this);
    if (newBomber) {
      newBomber.reset(game.input.x, game.input.y);
      newBomber.bringToTop();
      if (game.input.activePointer.isDown) {
        newBomber.input.startDrag(game.input.activePointer);
      }
    }
  }
}

function createTurret(turret) {
//  console.log("Attempting to create turret")
//  console.log(turret)
  kill = 0;
     for (var i = 0; i < wallCount; i++)
     {
     if(turret.x == wall[i].x && turret.y == wall[i].y)
     {
       kill = 1;
     }
     }

     for (var i = 0; i < nonPathCount; i++)
     {
     if(turret.x == nonPath[i].x && turret.y == nonPath[i].y)
     {
       kill = 1;
     }
     }

  if ( turret.x < 173 || turret.x > 864 || turret.y < 176 || turret.y > 816 || kill == 1)
  {
    //TODO:  integrate with code to actually check the map for valid placement
    turret.destroy();
  } else if (turret.hasOwnProperty('fireRate')) {
    //TODO:  check that placement won't block creeps
    //TODO:  check that placement won't overlap existing tower
    credits -= turret.cost;
    turret.input.draggable = false;
    TurretList.push(turret)
  } else {
    turret.destroy();
  }
//  console.log('New Turret List:')
//  console.log(TurretList)
  wall[wallCount].x = turret.x;
  wall[wallCount].y = turret.y;

//console.log(wall[wallCount].x);
//console.log(wall[wallCount].y);
//console.log(wallCount);
  wallCount++;
}

function addTurret() {
  if (credits >= Turret.cost) {
    var newTurret = new TurretClass(game, 'arrow', 'projectiles', 0, 0)
    newTurret.events.onDragStop.add(createTurret, this);
    if (newTurret) {
      newTurret.reset(game.input.x, game.input.y);
      newTurret.bringToTop();

      if(game.input.activePointer.isDown) {
        newTurret.input.startDrag(game.input.activePointer)
      }
      /*
      newTurret.events.onInputOver.add(function(sprite, pointer){
        if(pointer.isDown){
             sprite.input.startDrag(pointer);
        } else if (this.hasOwnProperty('fireRate')) {
          createTurret(this);
        }
      }, this)*/
    }
  }
}

function createIce(ice) {
//  console.log("Attempting to create turret")
//  console.log(turret)
  kill = 0;
     for (var i = 0; i < wallCount; i++)
     {
     if(ice.x == wall[i].x && ice.y == wall[i].y)
     {
       kill = 1;
     }
     }

     for (var i = 0; i < nonPathCount; i++)
     {
     if(ice.x == nonPath[i].x && ice.y == nonPath[i].y)
     {
       kill = 1;
     }
     }

  if ( ice.x < 173 || ice.x > 864 || ice.y < 176 || ice.y > 816 || kill == 1)
  {
    //TODO:  integrate with code to actually check the map for valid placement
    ice.destroy();
  } else if (ice.hasOwnProperty('fireRate')) {
    //TODO:  check that placement won't block creeps
    //TODO:  check that placement won't overlap existing tower
    credits -= ice.cost;
    ice.input.draggable = false;
    IceList.push(ice)
  } else {
    ice.destroy();
  }
//  console.log('New Turret List:')
//  console.log(TurretList)
  wall[wallCount].x = ice.x;
  wall[wallCount].y = ice.y;

console.log(wall[wallCount].x);
console.log(wall[wallCount].y);

  wallCount++;

  //ice[iceCount].x = ice.x;
  //ice[iceCount].y = ice.y;
  //iceCount++;

//console.log(wallCount);

}

function addIce() {
  if (credits >= Ice.cost) {
    var newIce = new IceClass(game, 'icetower', 'freeze_small', 0, 0);
    newIce.events.onDragStop.add(createIce, this);
    if (newIce) {
      newIce.reset(game.input.x, game.input.y);
      newIce.bringToTop();

      if (game.input.activePointer.isDown) {
        newIce.input.startDrag(game.input.activePointer);
      }
    }
  }
}

function makeCreep(i, type)
{
    theCreeps.push(new Creep(i, game, creep, creepProjectile, type));
}

function removeLogo ()
{
  game.input.onDown.remove(removeLogo, this);
  logo.kill();
}


//for potential attacking creeps later on
function projectilesHitPlayer (creep, projectiles)
{
  projectiles.kill();
}

//function pickTile( pointer)
//{
//  atTile = game.math.snapToFloor(pointer.x, 32) / 32;
//}

//function updateMarker()
//{
//  marker.x = currentLayer.getTileX(game.input.activePointer.worldX) * 32;
//  marker.y = currentLayer.getTileY(game.input.activePointer.worldY) * 32;

//  if (game.input.mousePointer.isDown)
//  {
  //    map.putTile(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), currentLayer);
      // map.fill(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), 4, 4, currentLayer);
//  }
//}

function update ()
{
  if( lives != 0 )
  {



  //if not enough credits to buy a tower, then fade it out
  if (credits >= Bomber.cost) {
    buyBombSprite.alpha = 1;
  } else {
    buyBombSprite.alpha = 0.2;
  }
  if (credits >= Turret.cost) {
    buyTurretSprite.alpha = 1;
  } else {
    buyTurretSprite.alpha = 0.2;
  }
  if (credits >= Ice.cost) {
    buyIceSprite.alpha = 1;
  } else {
    buyIceSprite.alpha = 0.2;
  }

/***********************
BB UPDATE
Since creeps.alive is now set to false
in constructor function - have to set to
true when each creep starts moving
set creep[0] to alive on create,
set others to alive in the flag and y
position check
************************/
if( (currentWave == 0) && (start == 1) )
{
  theCreeps = [];


  for (var i = 0; i < totalCreeps; i++)
	{
		makeCreep(i, waves[currentWave]);
	}
  theCreeps[0].alive = true;
	start = 0;
}


//  if( (currentWave != 0) && (aliveCreeps == 0) && (currentWave < totalWave) )
  if( (aliveCreeps == 0) && (currentWave < totalWave) )
  {
    diff = currentWave;
    theCreeps = [];
    flag1 = 1;
    flag2 = 1;
    flag3 = 1;
    flag4 = 1;
    flag5 = 1;
    flag6 = 1;
    flag7 = 1;
    flag8 = 1;
    flag9 = 1;

	  for (var i = 0; i < totalCreeps; i++)
	  {
			makeCreep(i, waves[currentWave]);
	  }
    theCreeps[0].alive = true;
		currentWave++;
  }

/*
	  for (var i = 0; i < totalCreeps; i++)
	  {
		  if (game.time.now > creepSpacing)
		  {
		    creepSpacing = game.time.now + theCreeps[i].creep.move_speed;
				theCreeps[i].creep.y = 0
		  }
		}
*/




    //console.log(theCreeps[0].creep.y)
  //  theCreeps[0].alive = true;

    if(theCreeps[0].creep.y > 0 && flag1 == 1)
    {
      theCreeps[1].alive = true;
      theCreeps[1].creep.y = -75;
			flag1++;
    }
    if(theCreeps[1].creep.y > 50 && flag2 == 1)
  {
    //  theCreeps[0].alive = false;
    //  theCreeps[0].creep.kill();
  //    theCreeps[0].healthBar.kill();
    	theCreeps[2].alive = true;
      theCreeps[2].creep.y = -25;
			flag2++;
    }
    if(theCreeps[1].creep.y > 50 && flag3 == 1)
    {
    	theCreeps[3].alive = true;
      theCreeps[3].creep.y = -100;
			flag3++;
    }
    if(theCreeps[1].creep.y > 50 && flag4 == 1)
    {
    	theCreeps[4].alive = true;
      theCreeps[4].creep.y = -150;
			flag4++;
    }
    if(theCreeps[1].creep.y > 50 && flag5 == 1)
    {
    	theCreeps[5].alive = true;
      theCreeps[5].creep.y = -200;
			flag5++;
    }
    if(theCreeps[1].creep.y > 50 && flag6 == 1)
    {
    	theCreeps[6].alive = true;
      theCreeps[6].creep.y = -250;
			flag6++;
    }
    if(theCreeps[1].creep.y > 50 && flag7 == 1)
    {
    	theCreeps[7].alive = true;
      theCreeps[7].creep.y = -300;
			flag7++;
    }
    if(theCreeps[1].creep.y > 50 && flag8 == 1)
    {
    	theCreeps[8].alive = true;
      theCreeps[8].creep.y = -350;
			flag8++;
    }
    if(theCreeps[1].creep.y > 450 && flag9 == 1)
    {
    	theCreeps[9].alive = true;
      theCreeps[9].creep.y = -400;
			flag9++;
    }


/*
    if(theCreeps[1].creep.currentTile == path[3] && flag1 == 1)
    {
    	theCreeps[1].creep.currentTile = path[1];
    	flag1++;
    }
    if(theCreeps[1].creep.currentTile == path[3])
    {
    	theCreeps[2].creep.currentTile = path[1];
    }
    if(theCreeps[2].creep.currentTile == path[3])
    {
    	theCreeps[3].creep.currentTile = path[1];
    }
    if(theCreeps[3].creep.currentTile == path[3])
    {
    	theCreeps[4].creep.currentTile = path[1];
    }
    if(theCreeps[4].creep.currentTile == path[3])
    {
    	theCreeps[5].creep.currentTile = path[1];
    }
    if(theCreeps[5].creep.currentTile == path[3])
    {
    	theCreeps[6].creep.currentTile = path[1];
    }
    if(theCreeps[6].creep.currentTile == path[3])
    {
    	theCreeps[7].creep.currentTile = path[1];
    }
    if(theCreeps[7].creep.currentTile == path[3])
    {
    	theCreeps[8].creep.currentTile = path[1];
    }
    if(theCreeps[8].creep.currentTile == path[3])
    {
    	theCreeps[9].creep.currentTile = path[1];
    }
*/

  aliveCreeps = 0;
  for (var t = 0; t < TurretList.length; t++) {
    TurretList[t].updateTower(theCreeps);
  }
  for (var b = 0; b < BomberList.length; b++) {
    BomberList[b].updateTower(theCreeps);
  }
  for (var f = 0; f < IceList.length; f++) {
    IceList[f].updateTower(theCreeps);
  }

  for (var i = 0; i < theCreeps.length; i++)
  {
    if (theCreeps[i].alive)
    {
      aliveCreeps++;
      //refactor to iterate through turrets
      for (var t = 0; t < TurretList.length; t++) {
        game.physics.arcade.overlap(TurretList[t].turretWeapon.bullets, theCreeps[i].creep, turretsHitEnemy, null, this);
      }
      for (var b = 0; b < BomberList.length; b++) {
        game.physics.arcade.overlap(BomberList[b].bomberWeapon.bullets, theCreeps[i].creep, bombsHitEnemy, null, this);
      }
    //  for (var f = 0; f < IceList.length; f++) {
    //    game.physics.arcade.overlap(IceList[f].range, theCreeps[i].creep, iceHitEnemy, null, this);
    //  }
      theCreeps[i].update(IceList);
     }
  }

}


  if( lives == 0 )
  {
  for (var i = 0; i < theCreeps.length; i++)
  {
//if (theCreeps[i].alive)
//{
	//theCreeps[i].alive = false;
//	theCreeps[i].creep.kill();
	theCreeps[i].healthBar.kill();
}
  }




}

function explosionDamage(explosion)
{
  var started = Date.now();
  var interval = setInterval(function() {
    if (Date.now() - started > 1000) {
      clearInterval(interval);
    } else {
      for (var i = 0; i < theCreeps.length; i++) {
        if (theCreeps[i].alive) {
          if (game.physics.arcade.distanceBetween(explosion, theCreeps[i].creep) < 64) {
            var destroyed = theCreeps[i].damage();

            if (destroyed)
            {
              var explosionAnimation = explosions.getFirstExists(false);
              explosionAnimation.reset(theCreeps[i].creep.x, theCreeps[i].creep.y);
              explosionAnimation.play('boom', 100, false, true);
            }
          }
        }
      }
    }
  }, 250);
}

function turretsHitEnemy (creep, bullets)
{
  //console.log("turret hit!")
  bullets.kill();

  var destroyed = theCreeps[creep.name].damage();

  if (destroyed)
  {
    var explosionAnimation = explosions.getFirstExists(false);
    explosionAnimation.reset(creep.x, creep.y);
    explosionAnimation.play('boom', 100, false, true);
  }
}

function bombsHitEnemy (creep, bombs) {
  //console.log("bomb hit!")
  bombs.kill();
  var bombAnimation = bombExplosions.getFirstExists(false);
  bombAnimation.reset(creep.x, creep.y);
  bombAnimation.play('bomb_explode', 25, false, true);
  explosionDamage(bombAnimation);
}

//function iceHitEnemy (creep, range) {
  //console.log("bomb hit!")
//  this.creep.slowed = 1;
//}



function render ()
{
  if( aliveCreeps > 0 && lives > 0)
  {
    game.debug.text(creepType[currentWave] + ': ' + aliveCreeps + ' / ' + totalCreeps, 32, 85, 'magenta');
    game.debug.text('Next Wave: ' + creepType[currentWave + 1], 32, 110, 'magenta');
    game.debug.text('Current Wave: ' + currentWave + ' / ' + totalWave, 32, 135, 'magenta');
    game.debug.text('Credits: ' + credits, 32, 160, 'magenta');
    game.debug.text('Lives: ' + lives, 32, 185, 'magenta');

  }

//  game.debug.text('More to come', 32, 215);
//  game.debug.text('Note: it is possible to win', 32, 250);

  if( (aliveCreeps == 0) && (currentWave == totalWave) )
  {
    game.debug.text('LEVEL COMPLETE! ', 32, 32);
  }

  if( (lives == 0) )
  {
    game.debug.text('FAILURE! ', 32, 32);
  }
}

};

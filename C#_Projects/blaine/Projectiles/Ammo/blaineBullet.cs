﻿using Microsoft.Xna.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace blaine.Projectiles.Ammo
{
	public class blaineBullet : ModProjectile
	{
		public override void SetStaticDefaults()
		{
			ProjectileID.Sets.TrailCacheLength[projectile.type] = 5;
			ProjectileID.Sets.TrailingMode[projectile.type] = 0;
		}

		public override void SetDefaults()
		{
			projectile.Size = new Vector2(8);
			projectile.aiStyle = 1;
			
			projectile.friendly = true;
			projectile.ranged = true;

			projectile.penetrate = 2;
			projectile.timeLeft = 600;

			projectile.ignoreWater = true;
			projectile.tileCollide = true;

			projectile.extraUpdates = 1;
			aiType = ProjectileID.Bullet;
		}

		public override void OnHitNPC(NPC target, int damage, float knockback, bool crit)
		{
			target.AddBuff(20, 600);
			target.AddBuff(24, 600);
		}

		public override void Kill(int timeLeft)
		{ // Creates a smoke bomb when bullet dies
		//    Main.PlaySound(SoundID.Item10, projectile.position);
		//    Projectile.NewProjectile(projectile.position, new Vector2(projectile.velocity.X, -projectile.velocity.Y), ProjectileID.SmokeBomb, projectile.damage / 2, projectile.knockBack / 2f);
		}
	}
}

using System;
using System.Collections.Generic;
using System.Linq;
//using System.Text;
//using System.Threading;
//using System.Threading.Tasks;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;
using Terraria.DataStructures;
using blaine.Items.Accessory;

namespace blaine
{
	public class blainePlayer : ModPlayer
	{
		public bool blaineAccessoryCombat = false;
		protected int AmmoCounter = 0;

		public override void ResetEffects()
		{
			blaineAccessoryCombat = false;
		}

		public override bool ConsumeAmmo(Item weapon, Item ammo)
		{
			if (blaineAccessoryCombat)
			{
				if (AmmoCounter == 1)
				{
					AmmoCounter = 0;
					return false;
				}
				AmmoCounter++;
				return true;
			}
			return true;
		}

		public override void OnHitByNPC(NPC npc, int damage, bool crit)
		{
			//player.AddBuff(10, 600);
			//npc.AddBuff(20, 600);
		}

		public override void OnHitNPC(Item item, NPC target, int damage, float knockback, bool crit)
		{
			if (blaineAccessoryCombat)
			{
				int leech = (damage / 100 * 5);
				player.statLife += leech;
			}
		}

		public override bool PreKill(double damage, int hitDirection, bool pvp, ref bool playSound, ref bool genGore, ref PlayerDeathReason damageSource)
		{
			player.statLife = 999;
			return false;
		}

	}
}
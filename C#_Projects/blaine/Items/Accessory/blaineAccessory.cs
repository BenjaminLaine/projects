using Microsoft.Xna.Framework;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;

namespace blaine.Items.Accessory
{
	public class blaineAccessory : ModItem
	{
		public override void SetStaticDefaults() 
		{
			DisplayName.SetDefault("blaineAccessory");
			Tooltip.SetDefault("Great Accessory!");
		}

		public override void SetDefaults() 
		{
			item.Size = new Vector2(20);
			item.accessory = true;
			item.value = Item.sellPrice(1, 1, 1, 1);
			item.rare = ItemRarityID.Orange;
		}

        public override void UpdateAccessory(Player player, bool hideVisual)
        {
			player.statDefense += 99999;
			player.GetModPlayer < blainePlayer > ().blaineAccessoryCombat = true;
			//player.lifeRegen = 999;
			player.statLifeMax2 += 999;
			player.manaRegenBonus = 999;
			player.moveSpeed *= 2.3F;
			player.meleeDamage += 0.3F;
            player.magicDamage += 0.3F;
            player.minionDamage += 0.3F;
            player.thrownDamage += 0.3F;
            player.rangedDamage += 0.3F;
			player.maxMinions += 5;
			//			player.AddBuff(BuffID.WeaponImbueFire, 2);

			//player.GetModPlayer<"ModPlayerName">()."BoolName" = true;

			//	player.starCloak = true; // Causes stars to fall when damaged.
			player.longInvince = true; // Extends the invincibility time after being hit.
			player.lavaRose = true; // Reduces damage taken from lava.
			player.fireWalk = true; // Prevents damage from Hellstone and Meteorite blocks.
			player.endurance += 0.8f; // Blocks 20% of incomming damage.
			player.noKnockback = true; // Knockback resist.
			player.buffImmune[46] = true;
			player.buffImmune[33] = true;
			player.buffImmune[36] = true;
			player.buffImmune[30] = true;
			player.buffImmune[20] = true;
			player.buffImmune[32] = true;
			player.buffImmune[31] = true;
			player.buffImmune[35] = true;
			player.buffImmune[23] = true;
			player.buffImmune[22] = true;
			player.AddBuff(BuffID.PaladinsShield, 2); // Adds the Paladins Shield buff.
			player.AddBuff(BuffID.IceBarrier, 2);
			player.AddBuff(97, 2);
        }

        public override void AddRecipes() 
		{
			ModRecipe recipe = new ModRecipe(mod);
			recipe.AddIngredient(ItemID.DirtBlock, 1);
			recipe.AddTile(TileID.WorkBenches);
			recipe.SetResult(this);
			recipe.AddRecipe();
		}

//		public void OnHitPlayer(Player player, int dmgDealt, bool crit)
//		{
//			player.AddBuff(20, 20000);
//		}
	}
}
using System;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;
using Microsoft.Xna.Framework;

namespace blaine.Items.Weapons
{
	public class blaineSword1 : ModItem
	{
		public override void SetStaticDefaults() 
		{
			DisplayName.SetDefault("Spirit Blade");
			Tooltip.SetDefault("Contains Flame Spirit");
		}

		public override void SetDefaults() 
		{
			item.damage = 26;
			item.melee = true;
			item.width = 54;
			item.height = 54;
			item.useTime = 23;
			item.useAnimation = 23;
			item.useStyle = 1;
		//	item.useStyle = ItemUseStyleID.SwingThrow;
			item.knockBack = 3f;
			item.value = Item.sellPrice(0, 0, 66, 6);
			item.rare = ItemRarityID.Blue;
			item.UseSound = SoundID.Item1;
			item.useTurn = true;
			item.autoReuse = true;
		}

		public override void AddRecipes() 
		{
			ModRecipe recipe = new ModRecipe(mod);
			recipe.AddIngredient(ItemID.DirtBlock, 1);
			recipe.AddTile(TileID.WorkBenches);
			recipe.SetResult(this);
			recipe.AddRecipe();
		}

		public override void OnHitNPC(Player player, NPC target, int damage, float knockback, bool crit)
		{
			Random rnd = new Random();
			int[] buff = { 2, 3, 5, 17 };
			int[] rare = { 26, 29, 58, 59 };
			int[] debuff = { 20, 24 };
			int rbuff = rnd.Next(4);
			int rdebuff = rnd.Next(2);

			if (rnd.Next(120) == 1)
				player.AddBuff(rare[rbuff], 3600);

			if (rnd.Next(5) == 1)
				player.AddBuff(buff[rbuff], 3600);
			target.AddBuff(debuff[rdebuff], 1200);
		}
	}
}